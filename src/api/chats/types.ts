export type ChatsGetRequestData = {
  offset?: number
  limit?: number
  title?: string
}

export type ChatsCreateRequestData = {
  title: string
}

export type ChatDeleteRequestData = {
  chatId: number
}

export type AddUserToChatRequestData = {
  users: number[],
  chatId: number
}

export type ChatTokenResponse = { token: string }

export type ChatResponse = {
  avatar: string
  created_by: number
  id: number
  last_message: string
  title: string
  unread_count: number
}

export type MessageResponse = {
  chat_id: number
  content: string
  file: File
  id: number
  is_read: boolean
  time: Date
  type: 'message'
  user_id: number
}

export type ChatResponseList = ChatResponse[]
