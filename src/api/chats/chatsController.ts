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
      })
  }

  createChat(data: ChatsCreateRequestData) {
    return chats.createChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.error('Ошибка создания чата', error)
      })
  }

  deleteChat(data: ChatDeleteRequestData) {
    return chats.deleteChat(data)
      .then(() => {
        this.getChats({})
      })
      .catch((error) => {
        console.error('Ошибка удаления чата', error)
      })
  }

  selectChat(data: ChatResponse) {
    store.set('selectedChat', data)
  }

  addUserToChat(data: AddUserToChatRequestData) {
    if (data.chatId && data?.users) {
      return chats.addUserToChat(data)
        .catch((error) => {
          console.error('Ошибка добавления пользователя в чат', error)
        })
    } else {
      throw new Error('Invalid chatId or user data')
    }
  }

  deleteUserFromChat(data: AddUserToChatRequestData) {
    return chats.deleteUserFromChat(data)
      .catch((error) => {
        console.error('Ошибка удаления пользователя из чата', error)
      })
  }

  getChatToken(chatId: number | null) {
    if (chatId) {
      return chats.getChatToken(chatId)
        .then((token) => token as ChatTokenResponse)
        .catch((error) => {
          console.error('Ошибка удаления пользователя из чата', error)
        })
    } else {
      throw new Error('Invalid chat id')
    }
  }

  addChatMessages(messages: MessageResponse[]) {
    store.set('selectedChatMessages', messages)
  }

  getChatMessages() {
    return store.getState().selectedChatMessages as MessageResponse[]
  }
}

export const chatsController = new ChatsController()
