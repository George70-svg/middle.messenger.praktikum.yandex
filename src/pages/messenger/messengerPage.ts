import './messengerPage.css'
import Block from '../../framework/block.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'
import { Input } from '../../components/input/input.ts'
import { chatListMock } from '../../mock/chatList.ts'
import { ChatListItem } from '../../components/chatLstItem/chatListItem.ts'
import { messageListMock } from '../../mock/messageList.ts'
import { MessageItem } from '../../components/messageItem/messageItem.ts'
import { shortenText } from '../../utils/common.ts'

export class MessengerPage extends Block {
  constructor() {
    super({
      children: {
        InputSearch: new Input({
          props: {
            labelText: 'Поиск',
            type: 'text',
            id: 'search-chat',
            class: 'search-chat',
            name: 'search-chat',
            placeholder: 'Поиск',
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
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        PageNavigation: new PageNavigation()
      },
      lists: {
        ChatList: chatListMock.map((item) => new ChatListItem({
          props: {
            name: item.name,
            date: item.date,
            lastMessage: shortenText(item.lastMessage, 50),
            unreadMessageNumber: item.unreadMessageNumber
          }
        })),
        MessageList: messageListMock.map((item) => new MessageItem({
          props: {
            class: item.class,
            text: item.text,
            time: item.time
          }
        }))
      }
    })
  }

  override render(): string {
    return `
      <main class='messenger-page'>
        <section class='chat-list-container'>
          <header class='chat-list-header'>
            <div class='go-to-profile'>
              <p>Профиль</p>
              <img src='svg/simpleArrow.svg' alt='simple arrow'>
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
            <div class='menu'>
              <img src='svg/doteMenu.svg' alt='menu'>
            </div>
          </header>
      
          <div class='chat-body'>
            {{{ MessageList }}}
          </div>
      
          <footer class='chat-footer'>
            <img class='file' src='svg/file.svg' alt='file'>
            {{{ InputMessage }}}
            <div class='round-button back-button'>
              <img src='svg/arrow.svg' alt='arrow image'>
            </div>
          </footer>
        </section>
      
        {{{ PageNavigation }}}
      </main>
    `
  }
}
