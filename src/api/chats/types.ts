export type ChatsGetRequestData = {
  offset?: number
  limit?: number
  title?: string
}

export type ChatsCreateRequestData = {
  title: string
}

export type ChatDeleteRequestData = {
  chatId: number | null
}

export type AddUserToChatRequestData = {
  users: number[] | null,
  chatId: number | null
}

export type ChatTokenResponse = { token: string }

export type ChatResponse = {
  avatar: string | null
  created_by: number | null
  id: number | null
  last_message: string | null
  title: string | null
  unread_count: number | null
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
