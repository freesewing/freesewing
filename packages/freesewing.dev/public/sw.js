/*
 * This is here to force-remove the cache of the old Gatsby site
 * See: https://github.com/gatsbyjs/gatsby/issues/15623
 */
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
