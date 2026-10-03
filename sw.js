const CACHE_NAME = 'sweet-money-v6-input-fix';
const BASE = './';
self.addEventListener('install', event => { self.skipWaiting(); event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png']))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith(fetch(event.request).then(resp => { const copy=resp.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)); return resp; }).catch(() => caches.match(event.request).then(r=>r || caches.match('./index.html'))));
});
