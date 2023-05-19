import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HttpieClient } from '../HttpieClient';
import type { HttpieResponse } from '../HttpieResponse';
import { AxiosHttpieResponse } from './AxiosHttpieResponse';
import { RequestTypes } from '../types';
import type { AxiosHttpieConfig } from './AxiosHttpieConfig';

export class AxiosHttpieClient implements HttpieClient {

  private readonly axios: AxiosInstance
  private readonly config: AxiosHttpieConfig

  constructor(config: AxiosHttpieConfig) {
    this.config = config
    this.axios = axios.create(config)
    this.axios.interceptors.request.use(config.requestInterceptor)
    this.axios.interceptors.response.use(config.responseInterceptor, config.responseErrorInterceptor)
  }

  setWithCredentials(value: boolean): void {
    this.config.withCredentials = value
  }

  get(url: string, params?: any): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.GET,
      url,
      params
    })
  }

  delete(url: string): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.DELETE,
      url
    })
  }

  head(url: string): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.HEAD,
      url
    })
  }

  post(url: string, data?: any): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.POST,
      url,
      data
    })
  }

  put(url: string, data?: any): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.PUT,
      url,
      data
    })
  }

  patch(url: string, data?: any): Promise<HttpieResponse> {
    return this.request({
      method: RequestTypes.PATCH,
      url,
      data
    })
  }

  private async request(config: AxiosHttpieConfig): Promise<HttpieResponse> {
    const conf = Object.assign({}, this.config, config)

    console.log(`send request to: ${conf.url}`)

    try {
      const res = await this.axios.request(conf)
      return new AxiosHttpieResponse(res)
    } catch (error: any) {
      return Promise.reject(new AxiosHttpieResponse(error))
    }

    // return this.axios.request(conf).then((response: AxiosResponse) => {
    //   return new AxiosHttpieResponse(response)
    // }).catch((error: any) => {
    //   return Promise.reject(new AxiosHttpieResponse(error))
    // })
  }

}

