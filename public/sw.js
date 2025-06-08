const CACHE_NAME = "zentime-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/manifest-icon-192.maskable.png",
  "/icons/manifest-icon-512.maskable.png",
  "/icons/apple-icon-180.png",
  "/icons/apple-splash-2048-2732.png",
  "/icons/apple-splash-2732-2048.png",
  "/icons/apple-splash-1668-2388.png",
  "/icons/apple-splash-2388-1668.png",
  "/icons/apple-splash-1536-2048.png",
  "/icons/apple-splash-2048-1536.png",
  "/icons/apple-splash-1640-2360.png",
  "/icons/apple-splash-2360-1640.png",
  "/icons/apple-splash-1668-2224.png",
  "/icons/apple-splash-2224-1668.png",
  "/icons/apple-splash-1620-2160.png",
  "/icons/apple-splash-2160-1620.png",
  "/icons/apple-splash-1488-2266.png",
  "/icons/apple-splash-2266-1488.png",
  "/icons/apple-splash-1320-2868.png",
  "/icons/apple-splash-2868-1320.png",
  "/icons/apple-splash-1206-2622.png",
  "/icons/apple-splash-2622-1206.png",
  "/icons/apple-splash-1290-2796.png",
  "/icons/apple-splash-2796-1290.png",
  "/icons/apple-splash-1179-2556.png",
  "/icons/apple-splash-2556-1179.png",
  "/icons/apple-splash-1170-2532.png",
  "/icons/apple-splash-2532-1170.png",
  "/icons/apple-splash-1284-2778.png",
  "/icons/apple-splash-2778-1284.png",
  "/icons/apple-splash-1125-2436.png",
  "/icons/apple-splash-2436-1125.png",
  "/icons/apple-splash-1242-2688.png",
  "/icons/apple-splash-2688-1242.png",
  "/icons/apple-splash-828-1792.png",
  "/icons/apple-splash-1792-828.png",
  "/icons/apple-splash-1242-2208.png",
  "/icons/apple-splash-2208-1242.png",
  "/icons/apple-splash-750-1334.png",
  "/icons/apple-splash-1334-750.png",
  "/icons/apple-splash-640-1136.png",
  "/icons/apple-splash-1136-640.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  // Skip caching for data import/export
  if (event.request.url.includes("zentime-backup")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
