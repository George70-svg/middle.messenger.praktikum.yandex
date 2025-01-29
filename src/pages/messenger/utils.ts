import { ChatResponseList, MessageResponse } from '../../api/chats/types.ts'
import ChatListItem from '../../components/chatLstItem/chatListItem.ts'
import MessageItem from '../../components/messageItem/messageItem.ts'

export const createChatList = (chats: ChatResponseList) => chats.map((chat) => new ChatListItem({
  props: {
    avatar: chat.avatar,
    created_by: chat.created_by,
    title: chat.title,
    id: chat.id,
    last_message: chat.last_message,
    unread_count: chat.unread_count
  }
}))

export const createMessageList = (messages: MessageResponse[]) => messages.map((message) => new MessageItem({
  props: {
    text: message.content,
    time: message.time,
    file: message.file,
    user_id: message.user_id
  }
}))

export const sortMessagesByTime = (messages: MessageResponse[]) => messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

export function formatTime(timeStr: string): string {
  if (!timeStr) return ''

  const date = new Date(timeStr)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  // Формат "hh:mm dd:mm:yyyy"
  return `${day}.${month}.${year} ${hours}:${minutes}`
}
