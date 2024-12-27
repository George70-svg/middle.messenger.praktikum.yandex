import { GlobalEventBus } from '../framework/eventBus.ts'

export const shortenText = (text :string, length: number) => {
  if (text.length >= length) {
    return `${text.substring(0, length)}...`
  } else {
    return text
  }
}

export const changePage = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLElement
  const page = target.getAttribute('datapage')

  if (page) {
    GlobalEventBus.emit('changePage', page)
  }
}
