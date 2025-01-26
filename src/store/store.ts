import { EventBus } from '../framework/eventBus.ts'
import { set } from '../utils/common.ts'
import { Indexed } from './types/types.ts'

export enum StoreEvents {
  Update = 'update'
}

class Store extends EventBus {
  private state: Indexed<unknown> = {
    user: {
      avatar: null,
      display_name: null,
      email: null,
      first_name: null,
      id: null,
      login: null,
      phone: null,
      second_name: null
    },
    selectedChat: {},
    chats: [],
    messages: [{ id: 1 }, { id: 2 }]
  }

  getState() {
    return this.state
  }

  set(path: string, value: unknown) {
    this.state = set(this.state, path, value) as Indexed<unknown>
    this.emit(StoreEvents.Update)
    console.log('state', this.state)
  }
}

export default new Store()
