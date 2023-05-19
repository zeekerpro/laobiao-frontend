import { userService } from "@apis";
import { redirect } from "@sveltejs/kit";
import log from "@utils/log";
import type { LayoutServerLoad } from "./$types";
import config from "../../config.json";

export const load = ( async ({route}) => {

  if(config.authWhiteList.includes(route.id || "")) { return }

  const ret = await userService.me()
  if(ret.isSuccess) {
    log.layout("signed success by token")
  }else{
    log.layout("unsigned")
    throw redirect(307, "/signin")
  }

  return {
    user: ret.data
  }

} ) satisfies LayoutServerLoad;

