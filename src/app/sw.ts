import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { CacheFirst, ExpirationPlugin, NetworkFirst, Serwist } from 'serwist'

// Declare Serwist injection point for TypeScript
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    // ── Restaurant Images (food, ambience, logos) ─────────────────────────
    // Cache-first: once you've seen a menu image, it works offline forever
    {
      matcher: ({ request, url }) =>
        request.destination === 'image' &&
        (url.pathname.startsWith('/images/') || url.pathname.startsWith('/favicon/')),
      handler: new CacheFirst({
        cacheName: 'hayat-images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 80,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    },

    // ── All other images (next/image optimized) ───────────────────────────
    {
      matcher: ({ request }) => request.destination === 'image',
      handler: new CacheFirst({
        cacheName: 'hayat-next-images',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
            purgeOnQuotaError: true,
          }),
        ],
      }),
    },

    // ── Google Fonts ──────────────────────────────────────────────────────
    {
      matcher: ({ url }) =>
        url.origin === 'https://fonts.googleapis.com' ||
        url.origin === 'https://fonts.gstatic.com',
      handler: new CacheFirst({
        cacheName: 'hayat-fonts',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          }),
        ],
      }),
    },

    // ── Page Navigation (HTML) ────────────────────────────────────────────
    // NetworkFirst: always try to get fresh restaurant info, fall back to cache
    {
      matcher: ({ request }) => request.mode === 'navigate',
      handler: new NetworkFirst({
        cacheName: 'hayat-pages',
        networkTimeoutSeconds: 3,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          }),
        ],
      }),
    },

    // ── Default: everything else (JS, CSS, API) ───────────────────────────
    ...defaultCache,
  ],

  // Offline fallback: show branded page when navigation fails
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document'
        },
      },
    ],
  },
})

serwist.addEventListeners()
