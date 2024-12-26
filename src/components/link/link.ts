import './link.css'
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
        {{text}}
      </a>
    `
  }
}
