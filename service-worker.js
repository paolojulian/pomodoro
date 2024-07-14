const CACHE_NAME = 'pomodoro-app-v1';
const urlsToCache = [
  '/',
  '/index.html',

  '/css/button.css',
  '/css/modals.css',
  '/css/preflight.css',
  '/css/styles.css',
  '/css/typography.css',
  '/css/variables.css',

  '/js/app.js',
  '/js/Audio.js',
  '/js/ControlButtons.js',
  '/js/DoneModal.js',
  '/js/Images.js',
  '/js/Pomodoro.js',
  '/js/Timer.js',
  '/js/TimerWorker.js',

  '/audio/pomodoro-alert.mp3',

  '/fonts/AvantGardeGothic/Regular.otf',
  '/fonts/AvantGardeGothic/Medium.otf',
  '/fonts/AvantGardeGothic/Bold.otf',

  '/images/app-icons/focus-mode.png',
  '/images/app-icons/reset-logged-time.svg',
  '/images/app-icons/taking-a-break.png',
  '/images/android-chrome-192x192.png',
  '/images/android-chrome-512x512.png',
  '/images/apple-touch-icon.png',
  '/images/favicon.ico',
  '/images/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
