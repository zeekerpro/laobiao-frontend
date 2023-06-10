import { PUBLIC_API_END_POINT, PUBLIC_REQUEST_TIMEOUT, PUBLIC_ACCESS_TOKEN_LABEL } from "$env/static/public";
import { AxiosHttpieClient, ContentTypes, type AxiosHttpieConfig } from "@laobiao/httpie";
import { browser } from "$app/environment";

const baseServiceConfig :AxiosHttpieConfig = {
  baseURL: PUBLIC_API_END_POINT,
  timeout: Number(PUBLIC_REQUEST_TIMEOUT),
  withCredentials:false,
  headers: {
    'Content-Type': ContentTypes.JSON,
    'Accept': ContentTypes.JSON
  }
}

async function createCsrConfig() {
  if(!browser){ throw "Can not create CSR http config in SSR environment" }

  const {appStorage} = await import("$utils/client/storage");

  const httpConfigForCsr :AxiosHttpieConfig = {...baseServiceConfig}

  httpConfigForCsr.requestInterceptor = (config) => {
    if(!browser){return config}
    const token = appStorage["access-token"];
    if (token) {
      config.headers[PUBLIC_ACCESS_TOKEN_LABEL] = token;
    }
    return config;
  },

  httpConfigForCsr.responseInterceptor = (response) => {
    if(!browser){return response}
    const newToken = response.headers[PUBLIC_ACCESS_TOKEN_LABEL];
    if (newToken) {
      appStorage["access-token"] = newToken;
    }
    return response;
  },

  httpConfigForCsr.responseErrorInterceptor = (error) => {
    switch (error.response?.status) {
      case 422:
        break
      case 401:
        if(!browser){break}
        appStorage.remove("access-token");
        break
      default:
        break
    }
    return error
  }

  return httpConfigForCsr;
}

function createSsrConfig() {
  if(browser){ throw "Can not create SSR http config in CSR environment" }

  const httpConfigForSsr :AxiosHttpieConfig = {...baseServiceConfig}

  httpConfigForSsr.requestInterceptor = (config) => {
    if(browser){return config}
    return config;
  },

  httpConfigForSsr.responseInterceptor = (response) => {
    if(browser){return response}
    return response;
  },

  httpConfigForSsr.responseErrorInterceptor = (error) => {
    switch (error.response?.status) {
      case 422:
        break
      case 401:
        if(!browser){break}
        break
      default:
        break
    }
    return error
  }

  return httpConfigForSsr;
}

const httpClient = browser ? new AxiosHttpieClient(createCsrConfig()) : new AxiosHttpieClient(createSsrConfig())

export default httpClient;
