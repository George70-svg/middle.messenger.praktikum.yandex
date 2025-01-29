import { EventBus } from '../framework/eventBus.ts'

export enum WSTransportEvents {
  Message = 'message',
  Error = 'error',
  Connected = 'connected',
  Close = 'close',
}

export type EventTypes<Message> = {
  [WSTransportEvents.Message]: [Message],
  [WSTransportEvents.Error]: [Event],
  [WSTransportEvents.Connected]: [],
  [WSTransportEvents.Close]: [],
}

export class WSTransport extends EventBus {
  private socket?: WebSocket

  private pingInterval?: ReturnType<typeof setInterval>

  private readonly pingIntervalTime = 3000

  private url: string

  constructor(url: string) {
    super()
    this.url = url
  }

  public send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Socket is not connected')
    }

    this.socket.send(JSON.stringify(data))
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('The socket is already connected')
    }

    this.socket = new WebSocket(this.url)
    this.subscribe(this.socket)
    this.setupPing()

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvents.Error, reject)
      this.on(WSTransportEvents.Connected, () => {
        this.off(WSTransportEvents.Error, reject)
        resolve()
      })
    })
  }

  public close() {
    this.socket?.close()
    clearInterval(this.pingInterval)
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, this.pingIntervalTime)

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval)
      this.pingInterval = undefined
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected)
    })

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close)
    })

    socket.addEventListener('error', () => {
      this.emit(WSTransportEvents.Error)
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)
        if (['pong', 'user connected'].includes(data?.type)) {
          return
        }

        this.emit(WSTransportEvents.Message, data)
      } catch (error) {
        console.error(error)
      }
    })
  }
}

export const messageSocketList: Record<number, WSTransport> = {}
