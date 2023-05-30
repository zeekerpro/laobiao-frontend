import type { HttpieResponse } from "@laobiao/httpie";
import httpClient from "./httpClient";

export default class BaseService {

  protected httpClient = httpClient;

  async get(url: string, params?: any) : Promise<HttpieResponse> {
    return this.httpClient.get(url, params);
  }

  async post(url: string, data?: any) : Promise<HttpieResponse> {
    return this.httpClient.post(url, data);
  }

  async put(url: string, data?: any) : Promise<HttpieResponse> {
    return this.httpClient.put(url, data);
  }

  async patch(url: string, data?: any) : Promise<HttpieResponse> {
    return this.httpClient.patch(url, data);
  }

  async delete(url: string) : Promise<HttpieResponse> {
    return this.httpClient.delete(url);
  }

  async head(url: string) : Promise<HttpieResponse> {
    return this.httpClient.head(url);
  }


  // todo
  // define upload and download methods

}
