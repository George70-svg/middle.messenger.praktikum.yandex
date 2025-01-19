import { GlobalEventBus } from './eventBus.ts'
import Block from './block.ts'
import { Router } from './router.ts'

export function changePage(event: Event, targetElement: string = 'a'): void {
  event.preventDefault()
  // Передаю ключевой элемент, который нужно обработать при клике, т.к. элемент может содержать в себе вложенные элементы
  const target = (event.target as HTMLElement).closest(targetElement)
  const page = target?.getAttribute('datapage')

  if (page) {
    GlobalEventBus.emit('changePage', page)
  }
}

export function goToPath(event: Event) {
  event.preventDefault()
  const { pathname } = (event.target as HTMLAnchorElement)
  const router = new Router('root')
  console.log(pathname)
  router.go(pathname)
}

export function render(query: string, block: Block) {
  console.log('render', block)
  const root = document.getElementById(query)

  if (root) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }

  return root
}
