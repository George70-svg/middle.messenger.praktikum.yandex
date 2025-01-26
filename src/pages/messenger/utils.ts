import { ChatResponseList } from '../../api/chats/types.ts'
import ChatListItem from '../../components/chatLstItem/chatListItem.ts'

export const createChatList = (chats: ChatResponseList) => chats.map((item) => new ChatListItem({
  props: {
    avatar: item.avatar,
    created_by: item.created_by,
    title: item.title,
    id: item.id,
    last_message: item.last_message,
    unread_count: item.unread_count
  }
}))
