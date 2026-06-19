const CACHE_NAME = 'contact-app-v3'; // ←バージョン上げる！！
const ASSETS = [
  'index.html',
  'manifest.json'
];

// インストール
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ←即更新
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// フェッチ（超重要：ネット優先）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// アクティベート
self.addEventListener('activate', (event) => {
  self.clients.claim(); // ←即反映
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});