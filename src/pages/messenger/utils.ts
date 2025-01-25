import { ChatResponseList } from '../../api/chats/types.ts'
import { ChatListItem } from '../../components/chatLstItem/chatListItem.ts'

export const createChatList = (chats: ChatResponseList) => {
  console.log('createChatList', chats)
  return chats.map((item) => new ChatListItem({
    props: {
      title: item.title,
      date: 0,
      last_message: item.last_message,
      unread_count: item.unread_count
    }
  }))
}
