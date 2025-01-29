import './messengerPage.scss'
import Block, { BlockProps, PropsProps } from '../../framework/block.ts'
import { Input } from '../../components/input/input.ts'
import { goToPath } from '../../framework/common.ts'
import { Link } from '../../components/link/link.ts'
import UserMenu from './components/userMenu/userMenu.ts'
import { FileMenu } from './components/fileMenu/fileMenu.ts'
import { Button } from '../../components/button/button.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { chatsController } from '../../api/chats/chatsController.ts'
import { withChatsAndUser } from '../../store/utils.ts'
import { createChatList, createMessageList } from './utils.ts'
import { isEqual } from '../../utils/common.ts'
import { ChatResponse, ChatResponseList, MessageResponse } from '../../api/chats/types.ts'
import { messageSocketList } from '../../api/wsService.ts'

class MessengerPage extends Block {
  constructor(blockProps: BlockProps) {
    super({
      children: {
        LinkToProfile: new Link({
          props: {
            content: '<p data-tooltip="Взяли текст из data-tooltip">Профиль</p><img src=\'svg/simpleArrow.svg\' alt=\'simple arrow\'>',
            events: {
              click: (event) => goToPath('/settings', event, { props: { mode: 'view' } })
            },
            attr: {
              class: 'pageNavigation-link go-to-profile',
              href: '/settings',
              dataPage: 'profileViewPage'
            }
          }
        }),
        AddChatButton: new Button({
          props: {
            text: 'Создать чат',
            events: { click: () => this.handleAddChat() },
            class: 'add-chat-button'
          }
        }),
        SendMessageButton: new Button({
          props: {
            text: '<div class=\'round-button back-button\'><img src=\'svg/arrow.svg\' alt=\'arrow image\'></div>',
            events: { click: () => this.handleSendMessage() },
            class: 'send-message-button'
          }
        }),
        InputSearch: new Input({
          props: {
            labelText: 'Поиск',
            type: 'text',
            id: 'search-chat',
            class: 'search-chat',
            name: 'search-chat',
            placeholder: 'Поиск',
            hideHint: true,
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputMessage: new Input({
          props: {
            labelText: 'Сообщение',
            type: 'text',
            id: 'message',
            class: 'message',
            name: 'message',
            placeholder: 'Сообщение',
            hideHint: true,
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        UserMenu: new UserMenu({}),
        FileMenu: new FileMenu()
      },
      lists: {
        ChatList: createChatList(blockProps.props?.chats as ChatResponseList ?? []),
        MessageList: createMessageList(blockProps.props?.selectedChatMessages as MessageResponse[] ?? [])
      }
    })

    // Получаю список всех чатов
    chatsController.getChats({})
  }

  _componentDidUpdate(oldProps?: PropsProps, newProps?: PropsProps): void {
    if (!isEqual(oldProps?.chats, newProps?.chats)) {
      this.setLists({
        ChatList: createChatList(newProps?.chats as ChatResponseList ?? [])
      })
    }

    if (!isEqual(oldProps?.selectedChatMessages, newProps?.selectedChatMessages)) {
      this.setLists({
        MessageList: createMessageList(newProps?.selectedChatMessages as MessageResponse[] ?? [])
      })
    }

    super._componentDidUpdate?.(oldProps ?? {}, newProps ?? {})
  }

  handleAddChat() {
    GlobalEventBus.emit('openAddChatModal')
  }

  handleSendMessage() {
    const chatId = (this.props?.selectedChat as ChatResponse)?.id
    const socket = messageSocketList[chatId]
    const text = (this.children?.InputMessage as Input).getValue()

    if (text) {
      const message = { content: text, type: 'message' }
      socket.send(message)
    }
  }

  override render(): string {
    const selectedChat = this.props?.selectedChat as ChatResponse

    return `
      <main class='messenger-page'>
        <section class='chat-list-container'>
          <header class='chat-list-header'>
            <div class="actions-container">
              {{{ AddChatButton }}}
              {{{ LinkToProfile }}}
            </div>
            {{{ InputSearch }}}
          </header>
      
          <section class='chat-list'>
            {{{ ChatList }}}
          </section>
        </section>
      
        <section class='messages-container'>
          <header class='chat-header'>
            ${selectedChat?.title ? `<div class='avatar'></div>
            <p class='name'>${selectedChat?.title}</p>
            {{{ UserMenu }}}` : ''}
          </header>
      
          <div class='chat-body'>
            {{{ MessageList }}}
          </div>
      
          <footer class='chat-footer'>
          ${selectedChat?.title ? `
             {{{ FileMenu }}}
            {{{ InputMessage }}}
            {{{ SendMessageButton }}}` : ''}
          </footer>
        </section>
      </main>
    `
  }
}

export default withChatsAndUser(MessengerPage)
