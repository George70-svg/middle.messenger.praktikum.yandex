import {
  AddUserToChatRequestData,
  ChatDeleteRequestData,
  ChatResponse,
  ChatsCreateRequestData,
  ChatsGetRequestData
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
        console.log('Ошибка загрузки списка чатов', error)
        throw error
      })
  }

  createChat(data: ChatsCreateRequestData) {
    return chats.createChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.log('Ошибка создания чата', error)
        throw error
      })
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chats.deleteChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.log('Ошибка удаления чата', error)
        throw error
      })
  }

  selectChat(data: ChatResponse) {
    store.set('selectedChat', data)
  }

  addUserToChat(data: AddUserToChatRequestData) {
    return chats.addUserToChat(data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Ошибка добавления пользователя в чат', error)
        throw error
      })
  }

  deleteUserFromChat(data: AddUserToChatRequestData) {
    return chats.deleteUserFromChat(data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log('Ошибка удаления пользователя из чата', error)
        throw error
      })
  }
}

export const chatsController = new ChatsController()
