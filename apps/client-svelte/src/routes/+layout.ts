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
  if(browser && !isLoggedIn) {
    const ret = await userService.me()
    if(ret.isSuccess) {
      log.layout("signed success by token")
      session.update(n => ({...n, user: ret.data}))
    }else{
      log.layout("unsigned")
      throw redirect(307, "/signin")
    }
  }

}) satisfies LayoutLoad;

