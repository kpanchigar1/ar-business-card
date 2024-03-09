// service-worker.js

// Install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('ar-business-card-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                // Add other assets your app needs to work offline
            ]);
        })
    );
});

// Fetch resources from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate service worker
self.addEventListener('activate', event => {
    // Delete old caches
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== 'ar-business-card-cache').map(key => {
                    return caches.delete(key);
                })
            );
        })
    );
});
