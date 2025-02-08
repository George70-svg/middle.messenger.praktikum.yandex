import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { HTTPTransport, METHOD } from './apiService.ts'

describe('HTTP Transport', () => {
  let http: HTTPTransport
  let request: unknown

  beforeEach(() => {
    http = new HTTPTransport('BaseUrl')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should the request with the passed parameters must be executed', () => {
    request = vi.spyOn(http, 'request')
    http.get('/test-endpoint', { data: { a: 1, b: 2 } })
    expect(request).toHaveBeenCalledWith('/test-endpoint', 'GET', expect.objectContaining({ data: { a: 1, b: 2 } }))
  })

  it('should data transform to string', () => {
    request = vi.spyOn(XMLHttpRequest.prototype, 'open')
    http.get('/test-endpoint', { data: { a: 1, b: 2 } })
    expect(request).toHaveBeenCalledWith(METHOD.GET, expect.stringContaining('/test-endpoint?a=1&b=2'))
  })
})
