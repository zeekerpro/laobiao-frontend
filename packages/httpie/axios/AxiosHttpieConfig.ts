import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface AxiosHttpieConfig extends InternalAxiosRequestConfig{

  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig| Promise<InternalAxiosRequestConfig>;

  responseInterceptor?: (response: AxiosResponse<any>) => AxiosResponse<any>;

  responseErrorInterceptor?: (error: AxiosError) => AxiosError;

}

