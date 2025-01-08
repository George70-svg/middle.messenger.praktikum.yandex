// Использую any[], т.к. тип unknown[] будет подразумевать всё равно массив значений, а аргументы будут не обязательно
// массивом. Тип never не подходит логически по своему определению.
export type EventCallback = (...args: any[]) => void;

export class EventBus {
  listeners: Record<string, EventCallback[]>

  constructor() {
    this.listeners = {}
  }

  on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}`)
    }

    this.listeners[event].forEach((listener) => listener(...args))
  }
}

export const GlobalEventBus = new EventBus()
