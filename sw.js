// sw.js - Versão Final
const cacheName = 'equipflix-v4'; 
const assets = [
  './', 
  './index.html', 
  './CSS/estilo.css', 
  './script.js',
  './favicon.png' 
];

// Instalação
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('PWA: Instalando versão final...');
      return cache.addAll(assets);
    })
  );
});

// Ativação e Limpeza
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('PWA: Faxina - Removendo cache antigo', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim(); 
});

// Estratégia Cache First (Offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

// --- SEU CÓDIGO DE PUSH NOTIFICATION (MANTENHA IGUAL) ---
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
  const targetUrl = './?setor=treinamento-mes';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
