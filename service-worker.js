const CACHE_PREFIX = "fotocollage-cache";
const CACHE_VERSION = "v178";
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config/templates.config.js",
  "./config/export.config.js",
  "./config/i18n.config.js",
  "./config/tips.config.js",
  "./config/stencils.config.js",
  "./config/stencils/heart.svg",
  "./config/stencils/flower.svg",
  "./config/stencils/clover.svg",
  "./config/stencils/lightning.svg",
  "./config/stencils/rose.svg",
  "./config/stencils/sun.svg",
  "./config/stencils/kraken.svg",
  "./config/stencils/splash.svg",
  "./config/stencils/horse.svg",
  "./config/stencils/piglet.svg",
  "./config/stencils/stegosaurus.svg",
  "./config/stencils/balloons-50.svg",
  "./config/stencils/france-map.svg",
  "./config/stencils/germany-map.svg",
  "./config/stencils/birthday-cake.svg",
  "./config/stencils/rocket.svg",
  "./config/stencils/ball.svg",
  "./config/stencils/gift.svg",
  "./config/stencils/medals.svg",
  "./config/stencils/bicycle.svg",
  "./manifest.json",
  "./version.json",
  "./README.md",
  "./preset-builder.html",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(`${CACHE_PREFIX}-`) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.endsWith("/version.json") || requestUrl.pathname.endsWith("/README.md")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => {
            if (cached) return cached;
            if (requestUrl.pathname.endsWith("/README.md")) return caches.match("./README.md");
            return caches.match("./version.json");
          })
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
