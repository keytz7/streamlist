/* global self */

const CACHE_NAME = 'eztechmovie-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    '/styles.css', // Assuming styles.css is copied to public or served from root
    'public/manifest.json',
    '/robots.txt',
    '/service-worker.js',
    '/mainpage.png',
    '/moviespage.png',
    '/cartpage.png',
    // Add your bundled JS files here. These paths depend on your build output.
    // Example paths (adjust if yours are different):
    'build/static/js/bundle.js',
    'build/static/js/0.chunk.js',
    'build/static/js/main.chunk.js',
    // Add any other critical assets your app needs to run offline
];

// Install event: Cache essential assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Install event');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(urlsToCache).catch(error => {
                console.error('Service Worker: Caching failed for:', error);
                // Log which URL failed if possible
                if (error instanceof TypeError) {
                    console.error('Service Worker: Likely a network issue preventing caching.');
                }
            });
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activate event');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            );
        })
    );
});

// Fetch event: Network-first with cache fallback and offline page for navigation
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // If network fetch succeeds, cache the response (if valid) and return it
                // Check if the response is valid before caching
                // (e.g., status 200, not a range request, etc.)
                // Opaque responses (cross-origin, no-cors) can't be inspected,
                // but can be cached.
                 if (networkResponse && networkResponse.status === 200) {
                     const responseToCache = networkResponse.clone();
                     caches.open(CACHE_NAME).then((cache) => {
                         cache.put(event.request, responseToCache);
                     });
                 }
                 return networkResponse; // Always return the network response if successful
            })
            .catch(() => {
                // Network failed, try to get the response from the cache
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('Service Worker: Serving from cache', event.request.url);
                        return cachedResponse; // Return cached response if found
                    }

                    // If no cache match, and it's a navigation request,
                    // fall back to the cached index.html
                    if (event.request.mode === 'navigate') {
                         console.log('Service Worker: Network and cache failed, falling back to index.html for navigation');
                        return caches.match('/index.html');
                    }

                    // For other requests that failed network and cache,
                    // return a generic offline response or let it fail
                    console.log('Service Worker: Network and cache failed for non-navigation request', event.request.url);
                    // Returning a simple Response object prevents the TypeError
                    return new Response(null, { status: 404, statusText: 'Not Found' }); // Or a custom offline response
                });
            })
    );
});