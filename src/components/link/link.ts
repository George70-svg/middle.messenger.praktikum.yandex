import './link.scss'
import Block, { BlockProps } from '../../framework/block.ts'

export class Link extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render(): string {
    return `
      <a class='{{class}}' href='{{href}}' data-page='{{dataPage}}'>
        {{{content}}}
      </a>
    `
  }
}
