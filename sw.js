const CACHE_NAME = 'equipflix-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './CSS/estilo.css',
  './script.js',
  './favicon.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/sw.js')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            
            return networkResponse;
          })
          .catch(() => {
            if (event.request.destination === 'document' || 
                event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            return new Response('Offline', {
              status: 503,
              statusText: 'Offline',
              headers: new Headers({ 'Content-Type': 'text/plain' })
            });
          });
      })
  );
});

self.addEventListener('push', event => {
  // ... (seu código de parsing de data continua igual)
  
  // 1. Use URLs absolutas ou garanta que a base está correta
  const baseUrl = new URL('/Treinamento/?setor=treinamento-mes', self.location.origin).href;

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [200, 100, 200],
    data: { url: baseUrl } // Guardamos a URL completa e absoluta
  };
  
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  // Recupera a URL absoluta salva no push
  const urlToOpen = event.notification.data?.url;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // 2. Tenta focar em uma aba que já contenha a base da URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // 3. Se não achar, abre a URL absoluta
        if (clients.openWindow && urlToOpen) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});


