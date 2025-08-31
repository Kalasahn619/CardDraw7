const CACHE_NAME = "carddraw7-cache-v1";
const urlsToCache = [
  "/CardDraw7/",
  "/CardDraw7/index.html",
  "/CardDraw7/manifest.json",
  "/CardDraw7/icon-192.png",
  "/CardDraw7/icon-512.png",
  "/CardDraw7/style.css",      // Add your CSS file if applicable
  "/CardDraw7/main.js"         // Add your main JS file if applicable
];

// Install event: cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch event: serve cached files if available, fall back to network
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
