import type { BeforeNavigate } from "@sveltejs/kit";
import { isLoggedIn } from "$stores/session";
import { goto } from "$app/navigation"

export function guard(navigation: BeforeNavigate, authWhiteList: string[] = []) {

  if(authWhiteList.includes(navigation.to?.route.id || "")) { return }

  if(navigation.from?.route.id === navigation.to?.route.id) { navigation.cancel() }

  if(!isLoggedIn){ goto("/signin") }

}


