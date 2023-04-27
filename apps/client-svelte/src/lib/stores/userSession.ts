import { writable, derived } from "svelte/store";

export const userSession = writable({
  token: null,
  user: null,
})

export const isLoggedIn = derived(userSession, $userSession => {
  return !!$userSession.token;
})
