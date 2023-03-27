// precache all assets files
// @param {String} cacheName - the cache name
// @param {Array} files - the files to cache
// @return {Promise} - the cache promise
export const precache = async (cacheName: string, files: string[]) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(files);
}

// remove previous cached data from disk
// @param {String} currentCacheName - the current cache name
// @return {Promise} - the cache promise
export const deleteDeprecatedCaches = async (currentCacheName: string) => {
  const keys = await caches.keys();
  return Promise.all(keys.filter(key => key !== currentCacheName).map(key => {
    caches.delete(key);
  }))
}

// delete the oldest cache item when the count of spacified cache storage is greater than the maxItems
//  @param {String} cacheName - the cache name
//  @param {Number} maxItems - the max number of cache to keep
//  @return {Array} - the new cache list
export const limitCacheCount = async (cacheName, maxItems) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    return limitCacheCount(cacheName, maxItems);
  }
  return keys;
}
