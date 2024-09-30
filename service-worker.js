// service-worker.js

const CACHE_NAME = 'menswear-portfolio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/scripts/main.js',
    '/images/collections/ss23-blood-sweat-tears.jpg',
    '/images/collections/fw23-silver-linings.jpg',
    '/images/collections/ss24-tales-tropes.jpg',
    '/images/collections/fw24-trampled-flowers.jpg',
    '/images/projects/project1.jpg',
    '/images/backgrounds/background.jpg',
    '/images/about/profile.jpg',
    '/images/icons/favicon.ico',
    '/images/og-image.jpg',
    '/x.html', /* Ensure x.html is cached */
    '/service-worker.js',
    '/manifest.json',
    // Add other assets as needed
];

// Install Event - Caches the specified assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Event - Serves cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Activate Event - Cleans up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
