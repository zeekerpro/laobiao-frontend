import type { Handle } from "@sveltejs/kit";
import log from '@utils/log';


export const handle = (async ({ event, resolve }) => {
  log.bold(`📣 NEW REQUEST IS BEING MADE FROM ${event.url.pathname}`)
	log.hooks('hooks.server.ts')

  const response = await resolve(event);

  log.bold(`🔥 THE PAGE IS READY, I'M SENDING THE RESPONSE`)
  return response;
}) satisfies Handle;
