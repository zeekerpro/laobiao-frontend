import type { AfterNavigate, BeforeNavigate } from "@sveltejs/kit";
import { isLoggedIn } from "$stores/session";
import { get } from "svelte/store";
import { goto } from "$app/navigation"
import { log } from "$utils/log";
import { authWhiteList } from "$configs";
import { viewStack } from "$stores/layouts";

export function guard(navigation: BeforeNavigate) {
  log.endpoint(`route guard: ${navigation.from.route.id} -> ${navigation.to?.route.id}`)

  if(!(navigation.to) || authWhiteList.includes(navigation.to?.route.id)) { return }

  if(navigation.from?.route.id === navigation.to?.route.id) {
    navigation.cancel();
    viewStack.update((stack) => {
      stack.push(navigation.to?.url?.pathname)
      return stack
    })
    return;
  }

  if(get(isLoggedIn) === false){
    let redirectTo = navigation.to?.url.pathname || "/"
    goto(`/signin?redirect=${redirectTo}`)
    return
  }
}

export function follow(navigation :AfterNavigate){
  if(navigation.from?.url?.pathname === navigation.to?.url?.pathname) return
  if(navigation.from?.url?.pathname === "/") return
  viewStack.update((stack) => {
    stack.push(navigation.to?.url?.pathname)
    return stack
  })
}

export function back(){
  const stack = get(viewStack)
  stack.pop()
  if(stack.length > 0){ goto(stack.pop()) }
  viewStack.update((views) => stack)
}
