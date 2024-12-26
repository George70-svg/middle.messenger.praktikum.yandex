import './messageItem.css'
import Block, { BlockProps } from '../../framework/block.ts'

export class MessageItem extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render(): string {
    return `
      <article class='{{class}} message-item-container'>
        <p class='text'>{{text}}</p>
        <p class='time'>{{time}}</p>
      </article>
    `
  }
}
