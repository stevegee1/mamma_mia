# Editorial Portfolio & CV Web Application

A lightweight, high-fashion editorial portfolio and CV web application for a personal brand spanning **Fashion**, **Modeling**, **Red Carpet Hosting**, and **Acting** (UK RP / Estuary & Indian accents).

Deployed on **Railway** with static file serving via Node/Express and media assets delivered directly from **Cloudflare R2** via CDN.

---

## Technical Stack & Architecture

- **Frontend**: Plain HTML5, Vanilla CSS3, Vanilla ES6 JavaScript (No frameworks, build steps, or external dependencies).
- **Backend Server**: Minimal Node.js + Express server (`server.js`) serving static files and exposing dynamic runtime environment variables.
- **Media Delivery**: Cloudflare R2 custom domain (e.g. `https://media.domain.com`), fetching images and video directly from CDN without server proxying.
- **Data Source**: Hardcoded JavaScript data file (`data/content.js`) — no database required.

---

## File Structure

```text
.
├── package.json          # Node dependencies & startup script
├── server.js             # Express static server & /config.js endpoint
├── index.html            # Profile / Home page (bio, discipline intro, highlights)
├── catalog.html          # Discipline category selection grid
├── category.html         # Category detail & event grid (?id={category_id})
├── event.html            # Event gallery grid & editorial Lightbox modal (?id={event_id})
├── css/
│   └── style.css         # Single editorial design system stylesheet
├── js/
│   └── app.js            # Dynamic DOM renderer & lightbox manager
├── data/
│   └── content.js        # Single source of truth dataset
└── README.md             # Deployment & Cloudflare R2 configuration guide
```

---

## Cloudflare R2 Media Setup & Bucket Layout

### 1. R2 Bucket Structure
Organize your Cloudflare R2 bucket as follows:

```text
r2-bucket/
└── events/
    └── {event-slug}/
        ├── thumb.webp                  # Compressed grid thumbnail (WebP)
        ├── poster.webp                 # Video poster placeholder (WebP)
        ├── photos/
        │   ├── 1.webp                  # Full-res photo for lightbox (WebP)
        │   └── 2.webp
        └── videos/
            └── clip.mp4                 # H.264 MP4 with faststart flag
```

### 2. Image Requirements
- **Format**: WebP format for optimal compression and broad browser support.
- **Sizes**:
  - `thumb.webp`: Compressed thumbnail for grid views (e.g. 800px width, ~60-120 KB).
  - `photos/*.webp`: Full-resolution image for the lightbox modal (e.g. 2000px+ width, ~300-600 KB).

### 3. Video Encoding & Faststart Flag (`ffmpeg`)
To enable immediate streaming playback in browser `<video>` tags without waiting for full download, encode MP4 files with the H.264 video codec and AAC audio codec, placing the `moov` atom at the beginning of the file using the `-movflags +faststart` flag:

```bash
ffmpeg -i input_raw.mov \
  -c:v libx264 -preset slow -crf 22 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  clip.mp4
```

### 4. Cloudflare R2 CORS Configuration
To allow browsers on your Railway domain to fetch media assets directly from your R2 custom subdomain, add the following CORS policy in Cloudflare R2 bucket settings:

```json
[
  {
    "AllowedOrigins": [
      "https://*.up.railway.app",
      "https://yourcustomdomain.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "Content-Range",
      "Content-Length",
      "Accept-Ranges"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

> **Note on Range Requests**: Cloudflare R2 natively supports HTTP `Range` header requests for seeking within video files. Do **not** proxy video requests through Express; let the browser interact with R2 directly.

---

## Railway Deployment Instructions

1. **Connect Repository**: Link your GitHub repository to Railway.
2. **Environment Variables**: Set `R2_PUBLIC_URL` in Railway service settings:
   - Name: `R2_PUBLIC_URL`
   - Value: `https://media.yourdomain.com` (Your Cloudflare R2 custom domain)
3. **Build & Start**: Railway automatically detects `package.json` and runs `npm start` (`node server.js`). `process.env.PORT` is injected by Railway automatically.

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

To test with a custom R2 domain locally, run:
```bash
R2_PUBLIC_URL="https://media.yourdomain.com" npm start
```
