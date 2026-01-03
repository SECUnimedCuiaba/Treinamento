const cacheName = 'equipflix-v2'; 
const assets = [
  './', 
  './index.html', 
  './css/estilo.css', 
  './script.js',
  './favicon.png' 
];

// Instalação e ativação imediata
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Limpeza de caches antigos (Essencial para não ocupar espaço e evitar bugs)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
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
    badge: 'favicon.png' 
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Define a URL de destino com o filtro
  const targetUrl = './?setor=treinamento-mes';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Se o app já estiver aberto, navega para a URL filtrada e foca
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if ('navigate' in client) {
          return client.navigate(targetUrl).then(client => client.focus());
        }
      }
      // Se estiver fechado, abre uma nova janela
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

