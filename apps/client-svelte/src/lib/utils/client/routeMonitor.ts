import type { AfterNavigate, BeforeNavigate } from "@sveltejs/kit";
import { isLoggedIn } from "$stores/session";
import { get } from "svelte/store";
import { goto } from "$app/navigation"
import { log } from "$utils/log";
import { authWhiteList, isAuthRoute } from "$configs";
import { viewStack, currentView } from "$stores/viewStack";

export function guard(navigation: BeforeNavigate) {
  log.endpoint(`route guard: ${navigation.from.url.pathname} -> ${navigation.to?.url.pathname}`)

  if(!(navigation.to) || authWhiteList.includes(navigation.to?.route.id)) { return }

  if(navigation.from?.url.pathname === navigation.to?.url.pathname) {
    viewStack.push(navigation.to)
    navigation.cancel();
    return;
  }

  if(get(isLoggedIn) === false){
    let redirectTo =  "/"
    if(navigation.to?.route.id !== "/(auth)/signin"){ redirectTo = navigation.to?.url.pathname }
    goto(`/signin?redirect=${redirectTo}`)
    return
  }
}

// do something after navigation
export function follow(navigation :AfterNavigate){
  // first time open app, not add to stack
  if(!navigation.from && navigation.to.route.id === '/'){ return }
  // if signed in just now, not add to stack
  if(!!navigation.from && isAuthRoute(navigation.from)) { return }
  // same page, not add to stack
  if(navigation.from?.url?.pathname === navigation.to?.url?.pathname) return
  viewStack.push(navigation.to)
  console.log(`follow: ${get(viewStack)}`)
}

export function back(){
  viewStack.pop()
  const backTo = get(currentView)
  // if viewStack is not empty, go to last page
  if(backTo){
    // pop current view here to avoid follow() push it again
    viewStack.pop()
    goto(backTo.url)
    console.log(`back to: ${backTo}`)
  }
  console.log(`viewstacks: ${get(viewStack).length}`)
}
