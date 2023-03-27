import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
export const CACHE = `cache-${version}`;

export const ASSETS = [
  ...build, // the app itself
  ...files  // everything in `static`
];

export const MAX_ITEMS = 100;
