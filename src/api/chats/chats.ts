import { HTTPTransport } from '../apiService.ts'
import {
  AddUserToChatRequestData,
  ChatDeleteRequestData,
  ChatsCreateRequestData,
  ChatsGetRequestData
} from './types.ts'

const chatsAPIInstance = new HTTPTransport('/api/v2/chats')

class Chats {
  getChats(data: ChatsGetRequestData) {
    return chatsAPIInstance.get('', { data })
  }

  createChat(data: ChatsCreateRequestData) {
    return chatsAPIInstance.post('', { data })
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chatsAPIInstance.delete('', { data })
  }

  addUserToChat(data: AddUserToChatRequestData) {
    return chatsAPIInstance.put('/users', { data })
  }

  deleteUserFromChat(data: AddUserToChatRequestData) {
    return chatsAPIInstance.delete('/users', { data })
  }

  getChatToken(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`)
  }
}

export const chats = new Chats()
