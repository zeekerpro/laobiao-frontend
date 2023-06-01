import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HttpieClient } from '../HttpieClient';
import type { HttpieResponse } from '../HttpieResponse';
import { AxiosHttpieResponse } from './AxiosHttpieResponse';
import { RequestTypes } from '../types';
import type { AxiosHttpieConfig } from './AxiosHttpieConfig';

export class AxiosHttpieClient implements HttpieClient {

  private axios?: AxiosInstance
  private configInstance?: AxiosHttpieConfig
  private config: AxiosHttpieConfig | Promise<AxiosHttpieConfig>

  constructor(config: AxiosHttpieConfig | Promise<AxiosHttpieConfig>) {
    this.config = config
  }

  async init(config: AxiosHttpieConfig | Promise<AxiosHttpieConfig> ){
    let configInstance: AxiosHttpieConfig = config instanceof Promise ? await config : config;
    this.configInstance = configInstance
    this.axios = axios.create(configInstance)
    this.axios.interceptors.request.use(configInstance.requestInterceptor)
    this.axios.interceptors.response.use(configInstance.responseInterceptor, configInstance.responseErrorInterceptor)
  }

  setWithCredentials(value: boolean): void {
    if(!this.configInstance){ return }
    this.configInstance.withCredentials = value
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

    if(!this.axios){ await this.init(this.config) }

    if(!this.axios){ throw new Error("axios is not initialized") }

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

