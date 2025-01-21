export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD
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
  get = (url: string, options: Options = { method: METHOD.GET }) => this.request(url, { ...options })

  post = (url: string, options: Options = { method: METHOD.POST }) => this.request(url, { ...options })

  put = (url: string, options: Options = { method: METHOD.PUT }) => this.request(url, { ...options })

  delete = (url: string, options: Options = { method: METHOD.DELETE }) => this.request(url, { ...options })

  request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, withCredentials = true, responseType = 'json' } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const isGet = method === METHOD.GET

      const xhr = new XMLHttpRequest()

      let requestUrl = url
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
