import { writable, derived } from "svelte/store";

export const session = writable({
  token: null,
  user: null,
})

export const isLoggedIn = derived(session, $userSession => {
  return !!$userSession.token;
})
