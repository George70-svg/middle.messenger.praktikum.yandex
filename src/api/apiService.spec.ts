import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { HTTPTransport, METHOD } from './apiService.ts'

describe('HTTP Transport', () => {
  let http: HTTPTransport

  beforeEach(() => {
    http = new HTTPTransport('BaseUrl')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should the request with the passed parameters must be executed', async () => {
    const requestSpy = vi.spyOn(http, 'request').mockImplementation(() => Promise.resolve())
    await http.get('/test-endpoint', { data: { a: 1, b: 2 } })
    expect(requestSpy).toHaveBeenCalledWith('/test-endpoint', 'GET', expect.objectContaining({ data: { a: 1, b: 2 } }))
  })

  it('should data transform to string', async () => {
    const openSpy = vi.spyOn(XMLHttpRequest.prototype, 'open').mockImplementation(() => {})

    // Мокаю событие send, чтобы не отправить реальный запрос
    vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(function (this: XMLHttpRequest) {
      // Переопределяю readonly свойства
      Object.defineProperty(this, 'status', { value: 200, configurable: true })
      Object.defineProperty(this, 'response', { value: { ok: true }, configurable: true })
      this.onload?.(new ProgressEvent('load'))
    })

    await http.get('/test-endpoint', { data: { a: 1, b: 2 } })
    expect(openSpy).toHaveBeenCalledWith(METHOD.GET, expect.stringContaining('/test-endpoint?a=1&b=2'))
  })
})
