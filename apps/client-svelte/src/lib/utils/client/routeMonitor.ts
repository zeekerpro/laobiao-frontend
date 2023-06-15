import type { AfterNavigate, BeforeNavigate } from "@sveltejs/kit";
import { isLoggedIn, session } from "$stores/session";
import { get } from "svelte/store";
import { goto } from "$app/navigation"
import { log } from "$utils/log";
import { authWhiteList } from "$configs";
import { viewStack, currentView } from "$stores/viewStack";

export function guard(navigation: BeforeNavigate) {
  log.endpoint(`route guard: ${navigation.from.route.id} -> ${navigation.to?.route.id}`)

  if(!(navigation.to) || authWhiteList.includes(navigation.to?.route.id)) { return }

  if(navigation.from?.route.id === navigation.to?.route.id) {
    viewStack.push(navigation.to?.url?.pathname)
    navigation.cancel();
    return;
  }

  if(get(isLoggedIn) === false){
    let redirectTo = navigation.to?.url.pathname || "/"
    goto(`/signin?redirect=${redirectTo}`)
    return
  }
}

export function follow(navigation :AfterNavigate){
  // first time open app, not add to stack
  if(!navigation.from && navigation.to.route.id === '/'){ return }
  // same page, not add to stack
  if(navigation.from?.url?.pathname === navigation.to?.url?.pathname) return
  viewStack.push(navigation.to?.url?.pathname)
  console.log(`follow: ${get(viewStack)}`)
}

export function back(){
  viewStack.pop()
  const backTo = get(currentView)
  // if viewStack is not empty, go to last page
  if(backTo){
    // pop current view here to avoid follow() push it again
    viewStack.pop()
    goto(backTo)
  }
  console.log(`back to: ${backTo}`)
}
