import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HttpieClient } from '../HttpieClient';
import { HttpieResponse } from '../HttpieResponse';
import { AxiosHttpieResponse } from './AxiosHttpieResponse';
import { RequestTypes } from '../types';
import { AxiosHttpieConfig } from './AxiosHttpieConfig';

export class AxiosHttpieClient implements HttpieClient {

  private readonly axios: AxiosInstance
  private readonly config: AxiosHttpieConfig
  private withCredentials: boolean = false

  constructor(config: AxiosHttpieConfig) {
    this.config = config
    this.axios = axios.create(config)
    this.axios.interceptors.request.use(config.requestInterceptor)
    this.axios.interceptors.response.use(config.responseInterceptor, config.responseErrorInterceptor)
  }

  setHeader(name: string, value: string): void {
    this.config.headers[name] = value
  }

  setWithCredentials(value: boolean): void {
    this.withCredentials = value
  }

  get(url: string, params?: any): Promise<HttpieResponse> {
    return this.request(RequestTypes.GET , url, params)
  }

  delete(url: string): Promise<HttpieResponse> {
    return this.request(RequestTypes.DELETE, url)
  }

  head(url: string): Promise<HttpieResponse> {
    return this.request(RequestTypes.HEAD, url)
  }

  post(url: string, data?: any): Promise<HttpieResponse> {
    return this.request(RequestTypes.POST, url, data)
  }

  put(url: string, data?: any): Promise<HttpieResponse> {
    return this.request(RequestTypes.PUT, url, data)
  }

  patch(url: string, data?: any): Promise<HttpieResponse> {
    return this.request(RequestTypes.PATCH, url, data)
  }

  private async request(method: RequestTypes, url: string, data?: any): Promise<HttpieResponse> {
    return this.axios.request({
      method: method,
      url: url,
      headers: this.config.headers,
      withCredentials: this.withCredentials,
      data: data
    }).then((response: AxiosResponse) => {
      return new AxiosHttpieResponse(response)
    }).catch((error: any) => {
      return new AxiosHttpieResponse(error)
    })
  }

}

