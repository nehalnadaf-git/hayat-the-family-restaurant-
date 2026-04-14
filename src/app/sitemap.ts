import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hayatfamilyrestaurant.in'
  return [
    { url: `${base}/`,                             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/menu`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/menu/soups`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/menu/veg-starters`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/menu/veg-mains`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/menu/veg-biryani-rice`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/menu/beef-starters`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/menu/chicken-starters`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/menu/mutton-starters`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/menu/tandoori-kababs`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/menu/beef-mains`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/menu/bulk-orders`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/reviews`,                      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/faq`,                          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
