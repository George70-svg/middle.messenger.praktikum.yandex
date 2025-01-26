export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHOD
  data?: Record<string, unknown>
  headers?: Record<string, string>
  withCredentials?: boolean,
  responseType?: 'json' | 'text'
}

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const queryStringArray = Object.entries(data).map((item) => `${item[0]}=${item[1]}`)
  return `?${queryStringArray.join('&')}`
}

export class HTTPTransport {
  baseURL: string = 'https://ya-praktikum.tech'

  constructor(path: string) {
    this.baseURL = `${this.baseURL}${path}`
  }

  get = (url: string, options?: Options) => this.request(url, METHOD.GET, { ...options })

  post = (url: string, options?: Options) => this.request(url, METHOD.POST, { ...options })

  put = (url: string, options?: Options) => this.request(url, METHOD.PUT, { ...options })

  delete = (url: string, options?: Options) => this.request(url, METHOD.DELETE, { ...options })

  request = (url: string, method: METHOD, options: Options, timeout = 50000): Promise<unknown> => {
    const { headers = {}, data, withCredentials = true, responseType = 'json' } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const isGet = method === METHOD.GET

      const xhr = new XMLHttpRequest()

      let requestUrl = this.baseURL + url
      if (isGet && data) {
        requestUrl += queryStringify(data)
      }

      xhr.open(method, requestUrl)

      Object.keys(headers || {}).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => {
        const status = xhr.status || 0
        if (status >= 200 && status < 300) {
          resolve(xhr.response)
        } else {
          const message = {
            0: 'abort',
            100: 'Information',
            200: 'Ok',
            300: 'Redirect failed',
            400: 'Access error',
            500: 'Internal server error'
          }[Math.floor((status / 100) * 100)]

          reject({
            status,
            reason: xhr.response.reason || message
          })
        }
      }

      xhr.withCredentials = withCredentials
      xhr.responseType = responseType

      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
