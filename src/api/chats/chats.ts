import { HTTPTransport } from '../apiService.ts'
import { ChatsCreateRequestData, ChatsGetRequestData } from './types.ts'

const chatsAPIInstance = new HTTPTransport('/api/v2/chats')

class Chats {
  getChats(data: ChatsGetRequestData) {
    return chatsAPIInstance.get('', { data })
      .catch((error) => {
        throw error
      })
  }

  createChat(data: ChatsCreateRequestData) {
    return chatsAPIInstance.post('', { data })
      .catch((error) => {
        throw error
      })
  }
}

export const chats = new Chats()
