import { writable, derived } from "svelte/store";

export const session = writable({
  user: null,
})

export const isLoggedIn = derived(session, $userSession => {
  return !!$userSession.user;
})
