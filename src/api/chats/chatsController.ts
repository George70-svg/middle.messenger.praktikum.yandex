import { ChatsCreateRequestData, ChatsGetRequestData } from './types.ts'
import { chats } from './chats.ts'
import store from '../../store/store.ts'

class ChatsController {
  getChats(data: ChatsGetRequestData) {
    return chats.getChats(data)
      .then((chats) => {
        store.set('chats', chats)
      })
      .catch((error) => {
        console.log('error', error)
        throw error
      })
  }

  createChat(data: ChatsCreateRequestData) {
    return chats.createChat(data)
      .then((chat) => {
        console.error('creatChats', chat)
      })
      .catch((error) => {
        console.error('error', error)
        throw error
      })
  }
  /* signUp(data: SignUpRequest) {
    return cha.signUp(data)
      .then((user) => {
        console.log('registration', user)
      })
      .catch((error) => {
        console.log('error', error)
        throw error
      })
  } */
}

export const chatsController = new ChatsController()
