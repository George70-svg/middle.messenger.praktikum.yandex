import Block, { BlockProps } from './block.ts'
import { Router } from './router.ts'

export function goToPath(pathname: string, props?: BlockProps) {
  const router = new Router('root')
  router.go(pathname, props)
}

export function render(query: string, block: Block) {
  const root = document.getElementById(query)

  if (root) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }

  return root
}
