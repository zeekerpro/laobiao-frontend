import type User from "$models/User";
import { writable, derived } from "svelte/store";

type SessionType = {
  user: User | null
}

export const session = writable<SessionType>({
  user: null,
})

export const isLoggedIn = derived(session, $userSession => {
  return !!$userSession.user;
})
