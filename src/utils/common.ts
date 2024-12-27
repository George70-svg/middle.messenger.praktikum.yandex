import { GlobalEventBus } from '../framework/eventBus.ts'

export const shortenText = (text :string, length: number) => {
  if (text.length >= length) {
    return `${text.substring(0, length)}...`
  } else {
    return text
  }
}

export const changePage = (event: Event, targetElement: string = 'a') => {
  event.preventDefault()
  // Передаю ключевой элемент, который нужно обработать при клике, т.к. элемент может содержать в себе вложенные элементы
  const target = (event.target as HTMLElement).closest(targetElement)
  const page = target?.getAttribute('datapage')

  if (page) {
    GlobalEventBus.emit('changePage', page)
  }
}
