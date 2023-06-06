import { redirect, type Navigation } from "@sveltejs/kit";
import { isLoggedIn } from "@stores/session";

export async function guard(navigation: Navigation, authWhiteList: string[] = []) {
  if(authWhiteList.includes(navigation.to?.route.id || "")) { return }
  if(navigation.from?.route.id === navigation.to?.route.id) { return }

  if(!isLoggedIn){ throw redirect(307, "/signin") }
}


