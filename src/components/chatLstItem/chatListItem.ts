import './chatListItem.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { chatsController } from '../../api/chats/chatsController.ts'
import { ChatResponse } from '../../api/chats/types.ts'
import { withSelectedChats } from '../../store/utils.ts'

class ChatListItem extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: {
        ...blockProps.props,
        events: {
          click: () => this.selectChat()
        }
      }
    })
  }

  selectChat() {
    const data: ChatResponse = {
      avatar: this.props?.avatar as string ?? null,
      created_by: this.props?.created_by as number ?? null,
      id: this.props?.id as number ?? null,
      last_message: this.props?.last_message as string ?? null,
      title: this.props?.title as string ?? null,
      unread_count: this.props?.unread_count as number ?? null
    }

    chatsController.selectChat(data)
  }

  override render(): string {
    const isActive = this.props?.id === (this.props?.selectedChat as ChatResponse).id
    const hasUnreadCount = !!this.props?.unread_count

    return `
      <article class='chat-item ${isActive ? 'active' : ''}'>
        <div class='avatar-container'>
          <div class='avatar'></div>
        </div>
      
        <div class='chat-container'>
          <div class='chat-info'>
            <div class='title'>{{title}}</div>
            <div class='date'>{{date}}</div>
          </div>
      
          <div class='chat-text'>
            <div class='chat-message' id='chat-message'>{{last_message}}</div>
            ${hasUnreadCount ? `<div class='unread-message'>{{unread_count}}</div>` : ''}
          </div>
        </div>
      </article>
    `
  }
}

export default withSelectedChats(ChatListItem)
