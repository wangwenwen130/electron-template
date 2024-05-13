type RequestParams = {
  url?: string
}

type RequestRes<T> = {
  code: number
  data: T
  msg: string
}
