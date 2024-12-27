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
    const { headers = {}, method, data } = options

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

      xhr.onload = () => resolve(xhr)
      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (isGet) {
        xhr.send()
      } else if (data) {
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send()
      }
    })
  }
}
