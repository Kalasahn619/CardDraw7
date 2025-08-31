const CACHE_NAME = "carddraw7-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
  // Add more assets (CSS, JS, images) if needed
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
  // Only cache GET requests
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});