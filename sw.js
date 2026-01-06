const cacheName = 'equipflix-v2'; 
const assets = [
  './', 
  './index.html', 
  './CSS/estilo.css', 
  './script.js',
  './favicon.png' 
];

// Instalação e ativação imediata
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('PWA: Fazendo cache dos arquivos novos');
      return cache.addAll(assets);
    })
  );
});

// Limpeza de caches antigos (Essencial para não ocupar espaço e evitar bugs)
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keyList =>
        Promise.all(
          keyList.map(key => {
            if (key !== cacheName) {
              return caches.delete(key);
            }
          })
        )
      ),
      self.clients.claim()
    ])
  );
});

// Estratégia de busca: Tenta o cache, se não tiver, vai na rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

// Ouvir o evento de Push
self.addEventListener('push', function(event) {
  let data = { title: 'EquipFlix', body: 'Novidade no sistema!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'EquipFlix', body: event.data.text() };
    }
  }
  const options = {
    body: data.body,
    icon: 'favicon.png', 
    badge: 'favicon.png', 
    data: {
    type: data.type || 'geral',
    url: data.url || '/'
  }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {

      for (const client of clientList) {
        if ('navigate' in client) {
          return client.navigate(targetUrl)
            .then(() => client.focus());
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
