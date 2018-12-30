const STATIC_CACHE = 'cache-r-v1';

// First check the cached files, if they don't exist, fetch them through the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});

// Cache specifically these files
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        return cache.addAll(
          [
            '/',
            './index.html',
            './restaurant.html',
            './css/styles.css',
            './js/main.js',
            './js/restaurant_info.js',
            './js/dbhelper.js',
            './data/restaurants.json',
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './img/logo-512.png',
            './img/logo-192.png',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
            'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
            'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
            'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
            './restaurant.html?id=1',
            './restaurant.html?id=2',
            './restaurant.html?id=3',
            './restaurant.html?id=4',
            './restaurant.html?id=5',
            './restaurant.html?id=6',
            './restaurant.html?id=7',
            './restaurant.html?id=8',
            './restaurant.html?id=9',
            './restaurant.html?id=10',
            './manifest.json'
          ]
        );
      })
  );
});

// Delete the old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith("cache-") && cacheName !== STATIC_CACHE;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
})