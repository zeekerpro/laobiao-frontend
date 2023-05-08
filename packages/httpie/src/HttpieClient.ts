import { HttpieResponse } from "./HttpieResponse";

export interface HttpieClient  {

  setWithCredentials(value: boolean) :void

  get(url: string, params?: any) :Promise<HttpieResponse>

  delete(url: string) :Promise<HttpieResponse>

  head(url: string) :Promise<HttpieResponse>

  post(url: string, data?: any): Promise<HttpieResponse>

  put(url: string, data?: any) :Promise<HttpieResponse>

  patch(url: string, data?: any): Promise<HttpieResponse>

}
