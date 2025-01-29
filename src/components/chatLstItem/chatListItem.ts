import './chatListItem.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { chatsController } from '../../api/chats/chatsController.ts'
import { ChatResponse, MessageResponse } from '../../api/chats/types.ts'
import { withChatsAndUser } from '../../store/utils.ts'
import { messageSocketList, WSTransport, WSTransportEvents } from '../../api/wsService.ts'
import { LastMessage, UserResponse } from '../../api/auth/type.ts'
import { isArray } from '../../utils/common.ts'
import { formatTime, sortMessagesByTime } from '../../pages/messenger/utils.ts'

class ChatListItem extends Block {
  constructor(blockProps: BlockProps) {
    const lastMessageTime = (blockProps.props?.last_message as LastMessage)?.time
    const formattedTime = lastMessageTime ? formatTime(lastMessageTime) : ''

    super({
      props: {
        ...blockProps.props,
        formattedTime,
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
    chatsController.getChatToken(data.id)
      .then((data) => {
        if (data) {
          const userId = (this.props?.user as UserResponse).id ?? null
          const chatId = this.props?.id as number ?? null
          const token = data.token ?? null
          if (userId && chatId && token) {
            const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
            // Если сокет успешно создался, то закрываю другие сокеты
            if (socket) {
              Object.values(messageSocketList).forEach((socket) => {
                socket.close()
              })
            }

            // Добавляю сокет в список сокетов для чатов
            messageSocketList[chatId] = socket

            socket.on(WSTransportEvents.Message, (messages: MessageResponse[]) => this.setMessage(messages))
            socket.connect()
              .then(() => {
                socket.send({
                  type: 'get old',
                  content: '0'
                })
              })
          }
        }
      })
  }

  setMessage(messages: MessageResponse | MessageResponse[]) {
    if (isArray(messages)) {
      chatsController.addChatMessages(sortMessagesByTime(messages))
    } else {
      const oldMessages = chatsController.getChatMessages()
      chatsController.addChatMessages(sortMessagesByTime([messages, ...oldMessages]))
    }
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
            <div class='date'>{{formattedTime}}</div>
          </div>
      
          <div class='chat-text'>
            <div class='chat-message' id='chat-message'>{{last_message.content}}</div>
            ${hasUnreadCount ? '<div class=\'unread-message\'>{{unread_count}}</div>' : ''}
          </div>
        </div>
      </article>
    `
  }
}

export default withChatsAndUser(ChatListItem)
