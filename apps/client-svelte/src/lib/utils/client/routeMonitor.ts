import type { BeforeNavigate } from "@sveltejs/kit";
import { isLoggedIn } from "$stores/session";
import { get } from "svelte/store";
import { goto } from "$app/navigation"
import { log } from "$utils/log";
import { authWhiteList } from "$configs";

export function guard(navigation: BeforeNavigate) {

  log.endpoint(`route from: ${navigation.from.route.id}`)
  log.endpoint(`route to: ${navigation.to?.route.id}`)

  if(authWhiteList.includes(navigation.to?.route.id)) { return }

  if(navigation.from?.route.id === navigation.to?.route.id) { navigation.cancel(); return; }

  if(get(isLoggedIn) === false){
    let redirectTo = navigation.to?.url.pathname || "/"
    goto(`/signin?redirect=${redirectTo}`)
  }

}


