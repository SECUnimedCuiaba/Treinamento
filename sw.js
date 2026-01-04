const CACHE_NAME = 'equipflix-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './CSS/estilo.css',
  './script.js',
  './favicon.png',
  './manifest.json'
];

// ============ INSTALAÇÃO ============
self.addEventListener('install', event => {
  console.log('🚀 Service Worker: Instalando v4...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cacheando recursos essenciais');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Recursos cacheados com sucesso');
        return self.skipWaiting();
      })
  );
});

// ============ ATIVAÇÃO ============
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker: Ativando v4...');
  
  event.waitUntil(
    Promise.all([
      // Limpar caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log(`🗑️ Removendo cache antigo: ${cacheName}`);
              return caches.delete(cacheName);
            }
            return Promise.resolve(); // Retorna uma promise resolvida para caches que não serão deletados
          })
        );
      }),
      
      // Tomar controle imediato de todas as abas
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker ativo e pronto');
    })
  );
});

// ============ FETCH (STRATEGY: Cache First) ============
self.addEventListener('fetch', event => {
  // Ignorar requisições não-GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requisições do próprio service worker
  if (event.request.url.includes('/sw.js')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // 1. Se tem no cache, retorna do cache
        if (cachedResponse) {
          console.log(`✅ Cache hit: ${event.request.url}`);
          return cachedResponse;
        }
        
        // 2. Se não tem, busca na rede
        console.log(`🌐 Fetching from network: ${event.request.url}`);
        return fetch(event.request)
          .then(networkResponse => {
            // Verifica se a resposta é válida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clona a resposta para cache
            const responseToCache = networkResponse.clone();
            
            // Adiciona ao cache para uso futuro
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log(`💾 Adicionado ao cache: ${event.request.url}`);
              });
            
            return networkResponse;
          })
          .catch(error => {
            console.log(`❌ Fetch failed: ${error.message}`);
            
            // Fallback para página principal se for uma página
            if (event.request.destination === 'document' || 
                event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            // Ou retorna uma resposta de erro genérica
            return new Response('Você está offline. Tente novamente quando tiver conexão.', {
              status: 503,
              statusText: 'Offline',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// ============ PUSH NOTIFICATIONS ============
self.addEventListener('push', event => {
  console.log('🔔 Push notification recebida');
  
  let data = {
    title: 'EquipFlix',
    body: 'Você tem novos treinamentos disponíveis!',
    icon: './favicon.png',
    badge: './favicon.png'
  };
  
  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text() || data.body;
    }
  }
  
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [200, 100, 200],
    data: {
      url: './?setor=treinamento-mes',
      timestamp: new Date().toISOString()
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ============ NOTIFICATION CLICK ============
self.addEventListener('notificationclick', event => {
  console.log('👆 Notificação clicada:', event.notification.tag);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || './';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // Verifica se já tem uma janela aberta
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          console.log('🔍 Janela existente encontrada, focando...');
          return client.focus();
        }
      }
      
      // Se não encontrou, abre nova janela
      if (clients.openWindow) {
        console.log('📱 Abrindo nova janela...');
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ============ NOTIFICATION CLOSE ============
self.addEventListener('notificationclose', event => {
  console.log('❌ Notificação fechada:', event.notification.tag);
});
