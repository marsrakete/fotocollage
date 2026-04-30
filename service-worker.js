const CACHE_PREFIX = "fotocollage-cache";
const CACHE_VERSION = "v221";
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const APP_SHELL_PATTERNS = [
  /\/$/,
  /\/index\.html$/i,
  /\/app\.js$/i,
  /\/styles\.css$/i,
  /\/manifest\.json$/i,
  /\/config\/.+\.js$/i,
];
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
  "./config/stencils/thumbs-up.svg",
  "./config/stencils/balloons-4.svg",
  "./config/stencils/muffin.svg",
  "./config/stencils/many-hearts.svg",
  "./config/stencils/camper-van.svg",
  "./config/stencils/christmas-tree.svg",
  "./config/stencils/uk-map.svg",
  "./config/stencils/balloon.svg",
  "./config/stencils/tent.svg",
  "./config/stencils/ship.svg",
  "./config/stencils/house.svg",
  "./config/stencils/fist-bump.svg",
  "./config/stencils/two-apples.svg",
  "./config/stencils/rain-cloud.svg",
  "./config/stencils/watering-can.svg",
  "./config/stencils/stay-cool.svg",
  "./config/stencils/coffee-mug.svg",
  "./config/stencils/monitor.svg",
  "./config/stencils/robot.svg",
  "./config/stencils/lightbulb.svg",
  "./manifest.json",
  "./version.json",
  "./README.md",
  "./README.de.md",
  "./README.en.md",
  "./preset-builder.html",
  "./assets/kofi-button.svg",
  "./assets/previews/mode-photo-collage.png",
  "./assets/previews/mode-form-collage.png",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = ASSETS.map((asset) => new Request(asset, { cache: "no-cache" }));
    await Promise.allSettled(
      requests.map(async (request) => {
        try {
          const response = await fetch(request);
          if (!response || !response.ok) {
            throw new Error(`Failed to fetch ${request.url} (${response?.status || "no-status"})`);
          }
          await cache.put(request, response);
        } catch (error) {
          console.warn("[service-worker] cache install skipped", request.url, error);
        }
      })
    );
  })());
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

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isNavigationRequest = event.request.mode === "navigate";
  const isAppShellRequest = APP_SHELL_PATTERNS.some((pattern) => pattern.test(requestUrl.pathname));
  if (
    requestUrl.pathname.endsWith("/version.json")
    || /\/README(\.de|\.en)?\.md$/i.test(requestUrl.pathname)
  ) {
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
            if (/\/README(\.de|\.en)?\.md$/i.test(requestUrl.pathname)) {
              return (
                caches.match(event.request)
                || caches.match("./README.en.md")
                || caches.match("./README.de.md")
                || caches.match("./README.md")
              );
            }
            return caches.match("./version.json");
          })
        )
    );
    return;
  }

  if (isAppShellRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => {
            if (cached) {
              return cached;
            }
            if (isNavigationRequest || /\/$|\/index\.html$/i.test(requestUrl.pathname)) {
              return caches.match("./index.html");
            }
            return Response.error();
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
        .catch(() => {
          if (isNavigationRequest) {
            return caches.match("./index.html");
          }
          return Response.error();
        });
    })
  );
});
