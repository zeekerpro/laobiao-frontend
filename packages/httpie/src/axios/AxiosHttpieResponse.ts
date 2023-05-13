import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { HttpieResponse } from '../HttpieResponse'

export class AxiosHttpieResponse implements HttpieResponse {

  public readonly isSuccess: boolean = false
  public readonly underlying: AxiosResponse | AxiosError | undefined
  public data?: any
  public readonly message?: string
  public readonly status?: number

  constructor(response: AxiosResponse | AxiosError) {
    this.underlying = response

    if (isAxiosError(response)) {
      this.isSuccess = false
      this.status = response.response?.status
      this.data = response.response?.data
      this.message = response.response?.statusText || response.message
    }else{
      this.isSuccess = true
      this.status = response.status
      this.data = response.data
      this.message = this.data?.error || this.data?.warning || this.data?.message || this.data?.msg || response.statusText
    }

  }

}
