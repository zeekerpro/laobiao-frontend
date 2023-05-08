import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { HttpieResponse } from '../HttpieResponse'

export class AxiosHttpieResponse implements HttpieResponse {

  public readonly isSuccess: boolean = false
  public readonly underlying: AxiosResponse | undefined
  public data?: any
  public readonly message?: string
  public readonly status?: number

  constructor(response: AxiosResponse | AxiosError) {
    if (isAxiosError(response)) {
      this.isSuccess = false
      this.underlying = response.response
    }else{
      this.isSuccess = true
      this.underlying = response
    }
    this.status = response.status
    this.data = this.underlying?.data
    this.message = this.data?.error || this.data?.warning || this.data?.message || this.data?.msg || this.underlying?.statusText
  }

}
