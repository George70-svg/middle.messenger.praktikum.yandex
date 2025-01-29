import {
  AddUserToChatRequestData,
  ChatDeleteRequestData,
  ChatResponse,
  ChatsCreateRequestData,
  ChatsGetRequestData, ChatTokenResponse, MessageResponse
} from './types.ts'
import { chats } from './chats.ts'
import store from '../../store/store.ts'

class ChatsController {
  getChats(data: ChatsGetRequestData) {
    return chats.getChats(data)
      .then((chats) => {
        store.set('chats', chats)
      })
      .catch((error) => {
        console.error('Ошибка загрузки списка чатов', error)
        throw error
      })
  }

  createChat(data: ChatsCreateRequestData) {
    return chats.createChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.error('Ошибка создания чата', error)
        throw error
      })
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chats.deleteChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.error('Ошибка удаления чата', error)
        throw error
      })
  }

  selectChat(data: ChatResponse) {
    store.set('selectedChat', data)
  }

  addUserToChat(data: AddUserToChatRequestData) {
    return chats.addUserToChat(data)
      .catch((error) => {
        console.error('Ошибка добавления пользователя в чат', error)
        throw error
      })
  }

  deleteUserFromChat(data: AddUserToChatRequestData) {
    return chats.deleteUserFromChat(data)
      .catch((error) => {
        console.error('Ошибка удаления пользователя из чата', error)
        throw error
      })
  }

  getChatToken(chatId: number) {
    return chats.getChatToken(chatId)
      .then((token) => token as ChatTokenResponse)
      .catch((error) => {
        console.error('Ошибка удаления пользователя из чата', error)
        throw error
      })
  }

  addChatMessages(messages: MessageResponse[]) {
    store.set('selectedChatMessages', messages)
  }

  getChatMessages() {
    return store.getState().selectedChatMessages as MessageResponse[]
  }
}

export const chatsController = new ChatsController()
