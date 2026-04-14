export type GalleryItem = {
  id: number
  src: string
  alt: string
  caption: string
  category: 'interior' | 'ambience' | 'entrance'
  rotation: number
}

export const galleryItems: GalleryItem[] = [
  { id: 1,  src: '/images/restaurant/dining-hall.jpg',    alt: 'Hayat Family Restaurant Dining Hall Interior',   caption: 'Dining Hall',      category: 'interior',  rotation: -2   },
  { id: 2,  src: '/images/restaurant/ac-section.jpg',     alt: 'Hayat Restaurant AC Dining Section',             caption: 'AC Section',       category: 'interior',  rotation: 1.5  },
  { id: 3,  src: '/images/restaurant/entrance.png',       alt: 'Hayat Family Restaurant Front Entrance',         caption: 'Entrance',         category: 'entrance',  rotation: -1   },
  { id: 6,  src: '/images/restaurant/family-section.jpg', alt: 'Family Dining at Hayat Restaurant',              caption: 'Family Dining',    category: 'ambience',  rotation: 1    },
  { id: 7,  src: '/images/restaurant/ambience.jpg',       alt: 'Hayat Restaurant Warm Ambience',                 caption: 'Ambience',         category: 'ambience',  rotation: -2.5 },
  { id: 8,  src: '/images/restaurant/outside-front.png',  alt: 'Hayat Restaurant Outside Front View',            caption: 'Our Front',        category: 'entrance',  rotation: 2    },
  { id: 10, src: '/images/restaurant/waiting-area.jpg',   alt: 'Hayat Restaurant Waiting Area',                  caption: 'Waiting Area',     category: 'interior',  rotation: 1.5  },
  { id: 11, src: '/images/restaurant/inside-empty.jpg',   alt: 'Hayat Restaurant Interior — Spacious Setup',     caption: 'Interior',         category: 'interior',  rotation: -1.5 },
  { id: 13, src: '/images/restaurant/waiting-area2.jpg',  alt: 'Waiting Area — Hayat Restaurant',                caption: 'Lounge Area',      category: 'interior',  rotation: 2    },
  { id: 15, src: '/images/restaurant/inside-empty2.png',  alt: 'Hayat Restaurant — Wide Dining Hall',            caption: 'Main Hall',        category: 'interior',  rotation: 0.5  },
]


export const galleryCategories = ['All', 'Interior', 'Ambience', 'Entrance'] as const
export type GalleryCategory = typeof galleryCategories[number]
