const CACHE_NAME = 'skyy-history-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/pages/Main.html',
  '/pages/404.html',
  '/pages/museo.html',
  '/pages/timeline.html',
  '/pages/mappe.html',
  '/pages/ricerca.html',
  '/pages/fonti.html',
  '/pages/dossier.html',
  '/pages/studio.html',
  '/pages/admin.html',
  '/pages/holodomor.html',
  '/pages/babyn-yar.html',
  '/pages/chernobyl.html',
  '/pages/indipendenza.html',
  '/pages/euromaidan.html',
  '/pages/crimea-donbas.html',
  '/pages/invasione-2022.html',
  '/pages/bucha.html',
  '/pages/mariupol.html',
  '/pages/battaglie.html',
  '/pages/atrocita.html',
  '/pages/difesa.html',
  '/pages/lingua-cultura.html',
  '/pages/cucina.html',
  '/pages/costumi.html',
  '/pages/sport.html',
  '/pages/film.html',
  '/pages/rifugiati.html',
  '/pages/ricostruzione.html',
  '/styles/style.css',
  '/styles/films.css',
  '/styles/site-order.css',
  '/styles/tools.css',
  '/scripts/script.js',
  '/scripts/museo.js',
  '/scripts/search.js',
  '/scripts/theme.js',
  '/scripts/encyclopedia.js',
  '/scripts/encyclopedia-data.js',
  '/scripts/site-tools.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Cache opened');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(function(error) {
      console.log('Cache install error:', error);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        if (event.request.destination === 'document') {
          return caches.match('/pages/404.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});