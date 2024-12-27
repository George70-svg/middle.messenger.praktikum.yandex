import './chatListItem.scss'
import Block, { BlockProps } from '../../framework/block.ts'

export class ChatListItem extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render(): string {
    return `
      <article class='chat-item'>
        <div class='avatar-container'>
          <div class='avatar'></div>
        </div>
      
        <div class='chat-container'>
          <div class='chat-info'>
            <div class='name'>{{name}}</div>
            <div class='date'>{{date}}</div>
          </div>
      
          <div class='chat-text'>
            <div class='chat-message' id='chat-message'>{{lastMessage}}</div>
            <div class='unread-message'>{{unreadMessageNumber}}</div>
          </div>
        </div>
      </article>
    `
  }
}
