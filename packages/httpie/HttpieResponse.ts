export interface HttpieResponse {
   readonly isSuccess :boolean
   readonly underlying :any
   data? :any
   readonly message? :string
   readonly status? :number
}
