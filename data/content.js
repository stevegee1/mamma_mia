/**
 * SINGLE SOURCE OF TRUTH CONTENT DATA
 * All media URLs use `<R2_URL>` placeholder which is dynamically replaced
 * at runtime by app.js using window.ENV.R2_PUBLIC_URL.
 */
const CONTENT = {
  profile: {
    name: "Mamma Mia",
    title: "Red Carpet Host • Model • Fashion & Art",
    tagline: "Expect nothing but iconic vibes — Akure, Ondo State to all over the world 🌍✈️",
    profileImage: "<R2_URL>/mamma_mia_profile.jpg",
    bio: "Mamma Mia is a 6ft tall Red Carpet Host, Model, and Fashion & Art multi-hyphenate. Expect nothing but iconic vibes — originating from Akure, Ondo State and bringing high energy, presence, and elegance to stages, runways, and screens all over the world. 🌍✈️",
    stats: [
      { label: "Height", value: "6'0\" / 183 cm" },
      { label: "Bust / Waist / Hips", value: "37\" - 30\" - 41\"" },
      { label: "Bust Point / Nipple to Nipple", value: "11\" / 8\"" },
      { label: "Underbust Height / Waist Length", value: "16\" / 18\"" },
      { label: "Shoulder / Back", value: "19\"" },
      { label: "Sleeve Length", value: "Short: 9\" / Long: 22\"" },
      { label: "Gown Lengths", value: "3/4 Gown: 47\" / Long Gown: 65\"" },
      { label: "Bases", value: "Akure, Ondo State & Worldwide 🌍✈️" },
      { label: "Native Accent", value: "English (UK Accent)" },
      { label: "Accent Capability", value: "Indian Accent Work (English dialogue performance)" },
      { label: "Languages", value: "English (Native), Yoruba (Conversational)" }
    ],
    contacts: {
      email: "ifesolapefadero@gmail.com",
      whatsapp: "https://wa.me/2348103365489",
      whatsappPhone: "+234 810 336 5489",
      instagram: "https://instagram.com/wba_05_amelia",
      instagramHandle: "@wba_05_amelia",
      tiktok: "https://www.tiktok.com/@mama__mia___",
      tiktokHandle: "@mama__mia___"
    }
  },
  categories: [
    {
      id: "fashion",
      label: "Fashion",
      tagline: "Haute Couture & Runway",
      description: "Couture collection presentations, luxury atelier showcases, and avant-garde editorial styling across London, Paris, and Mumbai.",
      coverImage: "<R2_URL>/events/paris-fashion-week-ss26/thumb.webp",
      events: [
        {
          id: "paris-fashion-week-ss26",
          name: "Paris Fashion Week SS26",
          date: "2026-03-02",
          venue: "Grand Palais, Paris",
          description: "Runway showcase for spring/summer haute couture, featuring structured monochrome tailored silhouettes.",
          thumb: "<R2_URL>/events/paris-fashion-week-ss26/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/paris-fashion-week-ss26/photos/1.webp", caption: "Look 01: Sculpted Ivory Silk Gown" },
            { type: "photo", src: "<R2_URL>/events/paris-fashion-week-ss26/photos/2.webp", caption: "Runway Finale Walk" },
            { type: "photo", src: "<R2_URL>/events/paris-fashion-week-ss26/photos/3.webp", caption: "Backstage Atelier Details" },
            { type: "video", src: "<R2_URL>/events/paris-fashion-week-ss26/videos/runway.mp4", poster: "<R2_URL>/events/paris-fashion-week-ss26/poster.webp", caption: "Catwalk Highlights & Opening Look" }
          ]
        },
        {
          id: "mumbai-couture-week-2025",
          name: "Mumbai Couture Week 2025",
          date: "2025-11-18",
          venue: "Taj Lands End, Mumbai",
          description: "Bridal and contemporary fusion couture show opening for leading South Asian ateliers.",
          thumb: "<R2_URL>/events/mumbai-couture-week-2025/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/mumbai-couture-week-2025/photos/1.webp", caption: "Hand-embroidered Velvet Cape" },
            { type: "photo", src: "<R2_URL>/events/mumbai-couture-week-2025/photos/2.webp", caption: "Metallic Zardozi Lehenga" },
            { type: "video", src: "<R2_URL>/events/mumbai-couture-week-2025/videos/walk.mp4", poster: "<R2_URL>/events/mumbai-couture-week-2025/poster.webp", caption: "Showstopper Walk & Designer Bow" }
          ]
        },
        {
          id: "vogue-editorial-lunar",
          name: "Vogue UK: Lunar Minimalist",
          date: "2025-08-10",
          venue: "Studio 4, Shoreditch, London",
          description: "Print and digital spread exploring architectural minimalism, monochrome lighting, and high drama.",
          thumb: "<R2_URL>/events/vogue-editorial-lunar/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/vogue-editorial-lunar/photos/1.webp", caption: "Architectural Trench Coat Portrait" },
            { type: "photo", src: "<R2_URL>/events/vogue-editorial-lunar/photos/2.webp", caption: "Shadow & Light Profile Study" }
          ]
        }
      ]
    },
    {
      id: "modeling",
      label: "Modeling",
      tagline: "Campaigns & Covers",
      description: "Global commercial campaigns, luxury beauty editorials, and international magazine cover shoots.",
      coverImage: "<R2_URL>/events/harpers-bazaar-cover/thumb.webp",
      events: [
        {
          id: "harpers-bazaar-cover",
          name: "Harper's Bazaar Cover Shoot",
          date: "2026-01-14",
          venue: "Villa D'Este, Lake Como",
          description: "Winter cover story featuring fine jewelry and tailored eveningwear.",
          thumb: "<R2_URL>/events/harpers-bazaar-cover/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/harpers-bazaar-cover/photos/1.webp", caption: "Harper's Bazaar Main Cover Story" },
            { type: "photo", src: "<R2_URL>/events/harpers-bazaar-cover/photos/2.webp", caption: "Lakefront Sunset Portrait" },
            { type: "video", src: "<R2_URL>/events/harpers-bazaar-cover/videos/behind-scenes.mp4", poster: "<R2_URL>/events/harpers-bazaar-cover/poster.webp", caption: "Behind the Scenes Motion Feature" }
          ]
        },
        {
          id: "cartier-jewellery-campaign",
          name: "Cartier High Jewellery Campaign",
          date: "2025-10-05",
          venue: "Geneva & Paris",
          description: "Global print and digital campaign showcasing emerald and diamond high jewellery collections.",
          thumb: "<R2_URL>/events/cartier-jewellery-campaign/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/cartier-jewellery-campaign/photos/1.webp", caption: "Emerald Necklace Close-up Detail" },
            { type: "photo", src: "<R2_URL>/events/cartier-jewellery-campaign/photos/2.webp", caption: "Diamond Cuff Campaign Still" }
          ]
        }
      ]
    },
    {
      id: "red-carpet",
      label: "Red Carpet",
      tagline: "Live Presenting & Host",
      description: "Broadcasting and interviewing Hollywood and South Asian cinema icons live at premiere galas and film festivals.",
      coverImage: "<R2_URL>/events/met-gala-2026/thumb.webp",
      events: [
        {
          id: "frammahomes-show-2026",
          name: "FrammaHomes Reality Show",
          date: "Coming Soon 2026",
          venue: "Akure, Ondo State & Global Broadcast 🌍✈️",
          description: "Exclusive red carpet host presentation, luxury architectural art exhibition, and live reality show showcase.",
          thumb: "<R2_URL>/Framma_home%20reality%20show%20/1727a7ac-b00f-475b-b2a3-803658ea8ddc.jpg",
          media: [
            {
              type: "photo",
              src: "<R2_URL>/Framma_home%20reality%20show%20/1727a7ac-b00f-475b-b2a3-803658ea8ddc.jpg",
              caption: "FrammaHomes Reality Show Official Promo Stills"
            },
            {
              type: "video",
              src: "<R2_URL>/Framma_home%20reality%20show%20/442da742093b4fe78b3d8f26e60ddf71.mp4",
              poster: "<R2_URL>/Framma_home%20reality%20show%20/1727a7ac-b00f-475b-b2a3-803658ea8ddc.jpg",
              caption: "FrammaHomes Reality Show Teaser 01"
            },
            {
              type: "video",
              src: "<R2_URL>/Framma_home%20reality%20show%20/d54622dd-f872-47be-95ce-7e4672b26d52.mp4",
              poster: "<R2_URL>/Framma_home%20reality%20show%20/1727a7ac-b00f-475b-b2a3-803658ea8ddc.jpg",
              caption: "FrammaHomes Reality Show Official Trailer Reel"
            },
            {
              type: "video",
              src: "<R2_URL>/Framma_home%20reality%20show%20/7db01beb856441c69917e9fb09e6459a.mov",
              poster: "<R2_URL>/Framma_home%20reality%20show%20/1727a7ac-b00f-475b-b2a3-803658ea8ddc.jpg",
              caption: "FrammaHomes Behind The Scenes Feature"
            }
          ],
          partners: [
            { id: 1, name: "Headline Sponsor", logo: "", status: "Slot Open" },
            { id: 2, name: "Luxury Brand Partner", logo: "", status: "Slot Open" },
            { id: 3, name: "Media & Broadcast Partner", logo: "", status: "Slot Open" },
            { id: 4, name: "Official Fashion Partner", logo: "", status: "Slot Open" }
          ]
        },
        {
          id: "met-gala-2026",
          name: "Met Gala 2026 Live Red Carpet",
          date: "2026-05-04",
          venue: "The Metropolitan Museum of Art, NYC",
          description: "Lead digital red carpet host interviewing celebrity guests and designers live on the Met steps.",
          thumb: "<R2_URL>/events/met-gala-2026/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/met-gala-2026/photos/1.webp", caption: "Arrival at Met Steps in Bespoke Atelier Gown" },
            { type: "photo", src: "<R2_URL>/events/met-gala-2026/photos/2.webp", caption: "Live Host Position & Broadcast Rig" },
            { type: "video", src: "<R2_URL>/events/met-gala-2026/videos/clip.mp4", poster: "<R2_URL>/events/met-gala-2026/poster.webp", caption: "Live Broadcast Interview Reel (Met Gala 2026)" }
          ]
        },
        {
          id: "cannes-film-festival-2025",
          name: "Cannes Film Festival 2025",
          date: "2025-05-19",
          venue: "Palais des Festivals, Cannes",
          description: "Official red carpet correspondent for international premiere screenings on the Promenade de la Croisette.",
          thumb: "<R2_URL>/events/cannes-film-festival-2025/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/cannes-film-festival-2025/photos/1.webp", caption: "Red Carpet Steps Interview Spot" },
            { type: "video", src: "<R2_URL>/events/cannes-film-festival-2025/videos/interviews.mp4", poster: "<R2_URL>/events/cannes-film-festival-2025/poster.webp", caption: "Palais Carpet Interview Reel" }
          ]
        },
        {
          id: "bafta-awards-2025",
          name: "BAFTA Film Awards 2025",
          date: "2025-02-16",
          venue: "Royal Festival Hall, London",
          description: "Red carpet arrivals coverage and nominee interviews for British academy film awards.",
          thumb: "<R2_URL>/events/bafta-awards-2025/thumb.webp",
          media: [
            { type: "photo", src: "<R2_URL>/events/bafta-awards-2025/photos/1.webp", caption: "BAFTA Red Carpet Black Tie Presentation" },
            { type: "video", src: "<R2_URL>/events/bafta-awards-2025/videos/highlights.mp4", poster: "<R2_URL>/events/bafta-awards-2025/poster.webp", caption: "Nominee Red Carpet Highlights" }
          ]
        }
      ]
    },
    {
      id: "acting",
      label: "Acting",
      tagline: "Film, TV & Voice (UK / Indian Accents)",
      description: "Screen acting, stage performances, and vocal accent work specializing in British Received Pronunciation (RP), Estuary London, and authentic Indian dialects.",
      coverImage: "<R2_URL>/events/accent-showreel-uk-indian/thumb.webp",
      events: [
        {
          id: "accent-showreel-uk-indian",
          name: "Voice & Accent Reel: UK RP & Indian English",
          date: "2026-02-10",
          venue: "London & Mumbai Voice Studios",
          description: "Comprehensive voice reel showcasing seamless switching between British RP (Received Pronunciation), Contemporary London Estuary, and Urban / Regional Indian English accents.",
          thumb: "<R2_URL>/events/accent-showreel-uk-indian/thumb.webp",
          media: [
            { type: "video", src: "<R2_URL>/events/accent-showreel-uk-indian/videos/reel.mp4", poster: "<R2_URL>/events/accent-showreel-uk-indian/poster.webp", caption: "Accent Reel: British RP vs. Urban Indian Accents" },
            { type: "photo", src: "<R2_URL>/events/accent-showreel-uk-indian/photos/1.webp", caption: "Voice Recording Session - Abbey Road Studios" }
          ]
        },
        {
          id: "dramatic-screen-reel",
          name: "Dramatic Screen Acting Reel",
          date: "2025-11-01",
          venue: "Shepperton Studios, UK",
          description: "Selection of emotional screen performances in period dramas, contemporary thrillers, and international indie films.",
          thumb: "<R2_URL>/events/dramatic-screen-reel/thumb.webp",
          media: [
            { type: "video", src: "<R2_URL>/events/dramatic-screen-reel/videos/showreel.mp4", poster: "<R2_URL>/events/dramatic-screen-reel/poster.webp", caption: "2025 Dramatic Acting Showreel" },
            { type: "photo", src: "<R2_URL>/events/dramatic-screen-reel/photos/1.webp", caption: "Headshot: Dramatic Monologue Stills" }
          ]
        }
      ]
    }
  ]
};
