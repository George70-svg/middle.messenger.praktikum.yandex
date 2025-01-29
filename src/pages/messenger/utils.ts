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
