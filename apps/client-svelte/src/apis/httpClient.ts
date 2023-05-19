import { PUBLIC_API_END_POINT, PUBLIC_REQUEST_TIMEOUT, PUBLIC_ACCESS_TOKEN_LABEL } from "$env/static/public";
import { AxiosHttpieClient, ContentTypes, type AxiosHttpieConfig } from "@laobiao/httpie";
import log from "@utils/log";

const defaultServiceConfig :AxiosHttpieConfig = {

  baseURL: PUBLIC_API_END_POINT,

  timeout: Number(PUBLIC_REQUEST_TIMEOUT),

  withCredentials:false,

  headers: {
    'Content-Type': ContentTypes.JSON,
    'Accept': ContentTypes.JSON
  },

  requestInterceptor: (config) => {
    // const token = localStorage.getItem(PUBLIC_ACCESS_TOKEN_LABEL);
    // if (token) {
    //   config.headers[PUBLIC_ACCESS_TOKEN_LABEL] = token;
    // }
    return config;
  },

  responseInterceptor: (response) => {
    const newToken = response.headers[PUBLIC_ACCESS_TOKEN_LABEL];
    if (newToken) {
      // localStorage.setItem(PUBLIC_ACCESS_TOKEN_LABEL, newToken);
    }
    return response;
  },

  responseErrorInterceptor: (error) => {
    switch (error.response?.status) {
      case 422:
        break
      case 401:
        debugger
        // localStorage.removeItem(PUBLIC_ACCESS_TOKEN_LABEL);
        break
      default:
        break
    }
    return error
  }

}

export default new AxiosHttpieClient(defaultServiceConfig)
