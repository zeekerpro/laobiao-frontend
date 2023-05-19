import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface AxiosHttpieConfig extends AxiosRequestConfig{

  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

  responseInterceptor?: (response: AxiosResponse<any>) => AxiosResponse<any>;

  responseErrorInterceptor?: (error: AxiosError) => AxiosError;

}

