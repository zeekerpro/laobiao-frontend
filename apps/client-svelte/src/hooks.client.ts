import type { HandleClientError } from "@sveltejs/kit";
import { log } from '$utils/log';

export const handleError = (async ({ error, event }) => {
	log.hooks('hooks.client.ts: handleError')
  debugger
}) satisfies HandleClientError;
