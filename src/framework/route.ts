import Block, { PropsProps } from './block.ts'
import { render } from './common.ts'
import { isEqual } from '../utils/common.ts'

export class Route {
  _pathname: string | null = null

  _blockClass: Block

  _block: Block | null = null

  _props: PropsProps & { rootQuery: string }

  constructor(pathname: string, view: Block, props: PropsProps & { rootQuery: string }) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      console.log(this._blockClass)
      this._block = this._blockClass

      if (this._block) {
        render(this._props.rootQuery, this._block)
      }

      return
    }

    this._block.show()
    render(this._props.rootQuery, this._block)
  }
}
