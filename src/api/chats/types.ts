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

export type ChatResponse = {
  avatar: string
  created_by: number
  id: number
  last_message: string
  title: string
  unread_count: number
}

export type ChatResponseList = ChatResponse[]
