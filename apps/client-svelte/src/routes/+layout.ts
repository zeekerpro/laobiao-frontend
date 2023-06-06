import { userService } from "@apis";
import { redirect } from "@sveltejs/kit";
import { log } from "@utils/log";
import type { LayoutLoad } from "./$types";
import { browser } from "$app/environment";
import config from "./config.json";
import { session, isLoggedIn } from "@stores/session";

export const load = ( async ({route, url}) => {

  // check signed status at first open page
  if(config.authWhiteList.includes(route.id || "")) { return }
  let logged = true;
  const unsubscribe = isLoggedIn.subscribe(value => logged = !!value)
  if(browser && !logged) {
    const ret = await userService.me()
    if(ret.isSuccess) {
      log.layout("signed success by token")
      session.update(n => ({...n, user: ret.data}))
      unsubscribe()
    }else{
      log.layout("unsigned")
      unsubscribe()
      throw redirect(307, "/signin")
    }
  }

}) satisfies LayoutLoad;

