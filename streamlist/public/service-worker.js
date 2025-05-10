const CACHE_NAME = 'eztechmovie-cache-v1';
const urlsToCache = [
  Service-worker.js file:
/* eslint-env serviceworker */
/* global self */

const CACHE_NAME = 'eztechmovie-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png',
    '/styles.css',
    'public/manifest.json',
    '/robots.txt',
    '/mainpage.png',
    '/moviespage.png',
    '/cartpage.png',
    // Add bundled JS files here. These paths depend on your build output.
    'build/static/js/bundle.js',
    'build/static/js/0.chunk.js',
    'build/static/js/main.chunk.js',

];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
