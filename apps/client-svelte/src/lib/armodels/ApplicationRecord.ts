import { SpraypaintBase, MiddlewareStack, Model } from "spraypaint";
import { ContentTypes } from "@laobiao/httpie";
import { PUBLIC_API_END_POINT, PUBLIC_REQUEST_TIMEOUT, PUBLIC_ACCESS_TOKEN_LABEL } from "$env/static/public";
import {appStorage} from "$utils/client/storage";
import { log } from "$utils/log";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { get } from "svelte/store"

@Model()
class ApplicationRecord extends SpraypaintBase {

  static baseUrl = PUBLIC_API_END_POINT;

  static apiNamespace = "";

  createdAt: Date;

  updatedAt: Date;

}

const middlewareStack = new MiddlewareStack();

middlewareStack.beforeFilters.push((url, options) => {
  options.credentials = 'omit'
  options.mode = 'cors'

  // const headers = options.headers as Headers
  // headers.set('Content-Type', ContentTypes.JSON)
  // headers.set('Accept', ContentTypes.JSON)

  // const token = appStorage["token"];
  // if (token) {
  //   headers.set(PUBLIC_ACCESS_TOKEN_LABEL, token)
  // }
  // prefer to use etag to check if the resource is updated, always request the resource from server
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/etag
  // another way is to add a query param like ?_t=timestamp
  // headers.delete("If-None-Match")
})

middlewareStack.afterFilters.push((response, json) => {

  // fresh token
  // const newToken = response.headers[PUBLIC_ACCESS_TOKEN_LABEL];
  // if (newToken) { appStorage["token"] = newToken; }

  // error handling
  switch (response?.status) {
    case 422:
      break
    case 401:
      appStorage.remove("token");
      const recirectTo = get(page).url.pathname
      goto(`/signin?redirect=${recirectTo}`)
      break
    default:
      break
  }

})

ApplicationRecord.middlewareStack = middlewareStack;
ApplicationRecord.jwt = appStorage["token"]

export { ApplicationRecord }
