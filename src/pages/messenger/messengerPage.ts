import './messengerPage.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { Input } from '../../components/input/input.ts'
import { messageListMock } from '../../mock/messageList.ts'
import { MessageItem } from '../../components/messageItem/messageItem.ts'
import { goToPath } from '../../framework/common.ts'
import { Link } from '../../components/link/link.ts'
import { UserMenu } from './components/userMenu/userMenu.ts'
import { FileMenu } from './components/fileMenu/fileMenu.ts'
import { Button } from '../../components/button/button.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { chatsController } from '../../api/chats/chatsController.ts'
import { withChats } from '../../store/utils.ts'
import { createChatList } from './utils.ts'

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
        UserMenu: new UserMenu(),
        FileMenu: new FileMenu()
      },
      lists: {
        ChatList: createChatList(blockProps.props?.chats ?? []),
        MessageList: messageListMock.map((item) => new MessageItem({
          props: {
            class: item.class,
            text: item.text,
            time: item.time
          }
        }))
      }
    })

    // Получаю список всех чатов
    chatsController.getChats({})

    /* store.on(StoreEvents.Update, () => {
      // Получаем актуальные чаты
      const newChats = store.getState().chats ?? []

      // Пересоздаём массив компонентов для списка и передаём в Block
      this.setLists({
        ChatList: createChatList(newChats)
      })
    }) */
    console.log('RERENDER MessengerPage')
  }

  handleAddChat() {
    GlobalEventBus.emit('openAddChatModal')
  }

  override render(): string {
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
            <div class='avatar'></div>
            <p class='name'>Вадим</p>
            {{{ UserMenu }}}
          </header>
      
          <div class='chat-body'>
            {{{ MessageList }}}
          </div>
      
          <footer class='chat-footer'>
            {{{ FileMenu }}}
            {{{ InputMessage }}}
            <div class='round-button back-button'>
              <img src='svg/arrow.svg' alt='arrow image'>
            </div>
          </footer>
        </section>
      </main>
    `
  }
}

export default withChats(MessengerPage)
