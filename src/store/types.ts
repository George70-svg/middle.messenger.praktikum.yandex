import { UserResponse } from '../api/auth/type.ts'
import { ChatResponse, MessageResponse } from '../api/chats/types.ts'

export type Indexed<T> = {
  [key: string]: T
}

export type State = {
  user: UserResponse
  selectedChat: ChatResponse
  chats: ChatResponse[],
  selectedChatMessages: MessageResponse[],
}
