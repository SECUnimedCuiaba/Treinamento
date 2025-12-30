const cacheName = 'equipflix-v1';
const assets = ['./', './index.html', './css/estilo.css', './script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
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

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});