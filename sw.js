// CADA VEZ QUE CAMBIES EL INDEX.HTML EN EL FUTURO, CAMBIA ESTE NÚMERO (ej. v2, v3, v4...)
const CACHE_NAME = 'ciudadela-v7';

// 1. Instalación de la aplicación en el móvil
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Obliga a instalar la actualización inmediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Aquí le decimos qué archivos debe descargar el móvil para crear la app
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);
    })
  );
});

// 2. Activación y limpieza de versiones antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si el nombre de la caché no coincide, borramos lo viejo
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando versión antigua de la app:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Toma el control de la pantalla al instante
});

// 3. Interceptar peticiones (hace que la app cargue rapidísimo)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});