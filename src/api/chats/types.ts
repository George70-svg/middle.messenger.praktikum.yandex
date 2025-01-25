export type ChatsGetRequestData = {
  offset?: number
  limit?: number
  title?: string
}

export type ChatsCreateRequestData = {
  title: string
}

export type ChatResponseList = {
  avatar: string
  created_by: number
  id: number
  last_message: string
  title: string
  unread_count: number
}[]
