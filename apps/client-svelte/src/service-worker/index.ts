/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { CACHE, ASSETS, MAX_ITEMS } from './constants';
import { precache, deleteDeprecatedCaches, limitCacheCount } from "./utils";

self.addEventListener('install', (event) => {
  console.log("service-worker has been installed..")
  // @ts-ignore
 event.waitUntil( Promise.all([
    precache(CACHE, ASSETS),
    // @ts-ignore
    self.skipWaiting() // automatic activate after service-worker installed
  ]));
});

self.addEventListener('activate', (event) => {
  console.log("service-worker has been activated..")
  const tasks = Promise.all([
    deleteDeprecatedCaches(CACHE),
    limitCacheCount(CACHE, MAX_ITEMS),
    // @ts-ignore
    self.clients.claim()
  ])
  // @ts-ignore
  event.waitUntil(tasks);
});

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  // @ts-ignore
  if(event.request.method !== 'GET') return;

  // ignore chrome-extension requests etc
  // @ts-ignore
  if(event.request.url.startsWith('chrome-extension')) return;

  async function respond() {
    // @ts-ignore
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    // `build`/`files` can always be served from the cache
    if (ASSETS.includes(url.pathname)) {
      // @ts-ignore
      console.log("result from cache ..")
      return cache.match(event.request);
    }

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      // @ts-ignore
      const response = await fetch(event.request);

      console.log("fetching from network..")

      // @ts-ignore
      if (response.status === 200) {
        // @ts-ignore
        cache.put(event.request, response.clone());

        limitCacheCount(CACHE, MAX_ITEMS);
      }

      return response;
    } catch {
      // @ts-ignore
      return cache.match(event.request);
    }
  }

  // @ts-ignore
  event.respondWith(respond());
});
