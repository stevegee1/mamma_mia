/**
 * PORTFOLIO APPLICATION ENGINE (VANILLA JS)
 * Handles R2 media resolution, DOM rendering across pages, and Lightbox Gallery logic.
 */

(function () {
  'use strict';

  // State & Config
  let currentGalleryMedia = [];
  let currentLightboxIndex = -1;

  /**
   * Resolve R2 media base URL dynamically from runtime window.ENV
   */
  function resolveMediaUrl(path) {
    if (!path) return '';
    const r2Base = (window.ENV && window.ENV.R2_PUBLIC_URL) 
      ? window.ENV.R2_PUBLIC_URL.replace(/\/+$/, '') 
      : 'https://media.example.com';
    return path.replace('<R2_URL>', r2Base);
  }

  /**
   * Helper: Get Query Parameter by Name
   */
  function getQueryParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  }

  /**
   * Page Dispatcher
   */
  document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();

    const path = window.location.pathname;
    
    if (path.endsWith('catalog.html')) {
      renderCatalogPage();
    } else if (path.endsWith('category.html')) {
      renderCategoryPage();
    } else if (path.endsWith('event.html')) {
      renderEventPage();
    } else {
      renderHomePage();
    }

    setupLightboxControls();
  });

  /**
   * Navigation Active Class
   */
  function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  /**
   * RENDER: Home / Profile Page (index.html)
   */
  function renderHomePage() {
    const heroImageContainer = document.getElementById('hero-image');
    const profileStatsContainer = document.getElementById('profile-stats');
    const featuredGrid = document.getElementById('featured-events-grid');

    if (heroImageContainer && CONTENT.categories[0] && CONTENT.categories[0].events[0]) {
      const sampleCover = resolveMediaUrl(CONTENT.categories[0].events[0].thumb);
      heroImageContainer.innerHTML = `<img src="${sampleCover}" alt="${CONTENT.profile.name}" loading="eager">`;
    }

    if (profileStatsContainer && CONTENT.profile.stats) {
      profileStatsContainer.innerHTML = CONTENT.profile.stats.map(stat => `
        <div class="stat-item">
          <span class="stat-label">${stat.label}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
      `).join('');
    }

    if (featuredGrid) {
      // Pick 1 flagship event from each category
      const featuredEvents = [];
      CONTENT.categories.forEach(cat => {
        if (cat.events && cat.events.length > 0) {
          featuredEvents.push({ ...cat.events[0], categoryLabel: cat.label, categoryId: cat.id });
        }
      });

      featuredGrid.innerHTML = featuredEvents.map(event => `
        <a href="event.html?id=${event.id}" class="event-card">
          <div class="event-card-thumb">
            <img src="${resolveMediaUrl(event.thumb)}" alt="${event.name}" loading="lazy">
          </div>
          <div class="event-card-content">
            <div class="event-meta">
              <span>${event.categoryLabel}</span>
              <span>${event.date.split('-')[0]}</span>
            </div>
            <h3 class="font-serif heading-md">${event.name}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${event.venue}</p>
          </div>
        </a>
      `).join('');
    }
  }

  /**
   * RENDER: Catalog Page (catalog.html)
   */
  function renderCatalogPage() {
    const catalogContainer = document.getElementById('catalog-grid-container');
    if (!catalogContainer) return;

    catalogContainer.innerHTML = CONTENT.categories.map(category => {
      const coverUrl = resolveMediaUrl(category.coverImage || (category.events[0] && category.events[0].thumb));
      const eventCount = category.events ? category.events.length : 0;

      return `
        <a href="category.html?id=${category.id}" class="catalog-card">
          <div class="catalog-card-image">
            <img src="${coverUrl}" alt="${category.label}" loading="lazy">
          </div>
          <div class="catalog-card-body">
            <span class="subheading">${category.tagline}</span>
            <h2 class="heading-lg">${category.label}</h2>
            <p>${category.description}</p>
            <div class="event-count">${eventCount} ${eventCount === 1 ? 'Feature' : 'Features / Events'}</div>
          </div>
        </a>
      `;
    }).join('');
  }

  /**
   * RENDER: Category Detail Page (category.html?id={category_id})
   */
  function renderCategoryPage() {
    const categoryId = getQueryParam('id') || 'fashion';
    const category = CONTENT.categories.find(c => c.id === categoryId) || CONTENT.categories[0];

    const titleEl = document.getElementById('category-title');
    const descEl = document.getElementById('category-description');
    const eventsGrid = document.getElementById('category-events-grid');

    if (titleEl) titleEl.textContent = category.label;
    if (descEl) descEl.textContent = category.description;

    if (eventsGrid && category.events) {
      eventsGrid.innerHTML = category.events.map(event => {
        const photoCount = event.media.filter(m => m.type === 'photo').length;
        const videoCount = event.media.filter(m => m.type === 'video').length;

        return `
          <a href="event.html?id=${event.id}" class="event-card">
            <div class="event-card-thumb">
              <img src="${resolveMediaUrl(event.thumb)}" alt="${event.name}" loading="lazy">
            </div>
            <div class="event-card-content">
              <div class="event-meta">
                <span>${event.date}</span>
                <span>${photoCount} Photos ${videoCount ? '• ' + videoCount + ' Videos' : ''}</span>
              </div>
              <h3 class="font-serif heading-md">${event.name}</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${event.venue}</p>
            </div>
          </a>
        `;
      }).join('');
    }
  }

  /**
   * RENDER: Event Detail Page & Gallery (event.html?id={event_id})
   */
  function renderEventPage() {
    const eventId = getQueryParam('id');
    let targetEvent = null;
    let targetCategory = null;

    // Search for event in all categories
    for (const cat of CONTENT.categories) {
      const found = cat.events.find(e => e.id === eventId);
      if (found) {
        targetEvent = found;
        targetCategory = cat;
        break;
      }
    }

    if (!targetEvent) {
      // Default to first event if not found
      targetCategory = CONTENT.categories[0];
      targetEvent = targetCategory.events[0];
    }

    // Set Gallery State for Lightbox
    currentGalleryMedia = targetEvent.media || [];

    // Header Details
    const categoryLink = document.getElementById('event-category-link');
    const titleEl = document.getElementById('event-title');
    const venueEl = document.getElementById('event-venue');
    const dateEl = document.getElementById('event-date');
    const descEl = document.getElementById('event-description');
    const galleryGrid = document.getElementById('event-gallery-grid');

    if (categoryLink) {
      categoryLink.href = `category.html?id=${targetCategory.id}`;
      categoryLink.textContent = targetCategory.label;
    }
    if (titleEl) titleEl.textContent = targetEvent.name;
    if (venueEl) venueEl.textContent = targetEvent.venue;
    if (dateEl) dateEl.textContent = targetEvent.date;
    if (descEl) descEl.textContent = targetEvent.description || '';

    // Render Media Gallery Grid
    if (galleryGrid) {
      galleryGrid.innerHTML = currentGalleryMedia.map((media, index) => {
        const isVideo = media.type === 'video';
        const thumbSrc = resolveMediaUrl(isVideo ? (media.poster || targetEvent.thumb) : media.src);

        return `
          <div class="gallery-item" data-index="${index}">
            <img src="${thumbSrc}" alt="${media.caption || targetEvent.name}" loading="lazy">
            <div class="media-badge">${isVideo ? '▶ Video' : 'Photo'}</div>
          </div>
        `;
      }).join('');

      // Add Click Listeners to Gallery Items
      const items = galleryGrid.querySelectorAll('.gallery-item');
      items.forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.getAttribute('data-index'), 10);
          openLightbox(idx);
        });
      });
    }
  }

  /**
   * LIGHTBOX MODAL HANDLERS
   */
  function openLightbox(index) {
    if (index < 0 || index >= currentGalleryMedia.length) return;
    currentLightboxIndex = index;

    const lightbox = document.getElementById('lightbox');
    const wrapper = document.getElementById('lightbox-media-wrapper');
    const captionEl = document.getElementById('lightbox-caption');

    if (!lightbox || !wrapper) return;

    const media = currentGalleryMedia[index];
    wrapper.innerHTML = ''; // Clear previous media

    if (media.type === 'photo') {
      const img = document.createElement('img');
      img.src = resolveMediaUrl(media.src);
      img.alt = media.caption || '';
      wrapper.appendChild(img);
    } else if (media.type === 'video') {
      // Construct video element with preload metadata and poster
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      video.playsInline = true;
      if (media.poster) {
        video.poster = resolveMediaUrl(media.poster);
      }

      const source = document.createElement('source');
      source.src = resolveMediaUrl(media.src);
      source.type = 'video/mp4';

      video.appendChild(source);
      wrapper.appendChild(video);
    }

    if (captionEl) {
      captionEl.textContent = media.caption || '';
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const wrapper = document.getElementById('lightbox-media-wrapper');

    if (lightbox) {
      lightbox.classList.remove('active');
    }
    
    // Stop any playing video by removing source DOM nodes
    if (wrapper) {
      const video = wrapper.querySelector('video');
      if (video) {
        video.pause();
      }
      wrapper.innerHTML = '';
    }

    document.body.style.overflow = '';
    currentLightboxIndex = -1;
  }

  function navigateLightbox(direction) {
    if (currentLightboxIndex === -1 || currentGalleryMedia.length === 0) return;

    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) {
      newIndex = currentGalleryMedia.length - 1;
    } else if (newIndex >= currentGalleryMedia.length) {
      newIndex = 0;
    }

    openLightbox(newIndex);
  }

  function setupLightboxControls() {
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const lightbox = document.getElementById('lightbox');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
          closeLightbox();
        }
      });
    }

    // Keyboard Shortcuts (Esc to close, Arrows to navigate)
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox || !lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    });

    // Mobile Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    if (lightbox) {
      lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const minSwipeDistance = 40;

      // Check horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX < 0) {
          navigateLightbox(1); // Swipe Left -> Next
        } else {
          navigateLightbox(-1); // Swipe Right -> Prev
        }
      }
      // Check vertical swipe down to close
      else if (diffY > minSwipeDistance * 1.5 && Math.abs(diffY) > Math.abs(diffX)) {
        closeLightbox();
      }
    }
  }

})();
