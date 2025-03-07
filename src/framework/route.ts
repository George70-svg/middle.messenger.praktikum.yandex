import Block, { BlockProps } from './block.ts'
import { render } from './common.ts'
import { isEqual } from '../utils/common.ts'
import { BlockClass } from './types/types.ts'

export class Route {
  _pathname: string | null = null

  _blockClass: BlockClass

  _block: Block | null = null

  _props: BlockProps & { rootQuery: string }

  constructor(pathname: string, view: BlockClass, props: BlockProps & { rootQuery: string }) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname)
  }

  render(props?: BlockProps) {
    if (!this._block) {
      this._block = new this._blockClass(props ?? {})
      if (this._block) {
        render(this._props.rootQuery, this._block)
      }

      return
    }

    render(this._props.rootQuery, new this._blockClass(props ?? {}))
  }
}
