import './link.css'
import Block, { BlockProps } from '../../framework/block.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'

export class Link extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: {
        ...blockProps.props,
        events: {
          click: (): void => {
            this.changePage()
          }
        }
      }
    })
  }

  changePage() {
    const page = this.props?.attr?.dataPage

    if (page) {
      GlobalEventBus.emit('changePage', page)
    }
  }

  override render(): string {
    return `
      <a class='{{class}}' href='{{href}}' data-page='{{dataPage}}'>
        {{text}}
      </a>
    `
  }
}
