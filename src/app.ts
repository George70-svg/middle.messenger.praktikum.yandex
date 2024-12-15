import Handlebars from 'handlebars'
import Pages from './pages/index.ts'
import { isPageType, PageType } from './pages/types.ts'
import { button } from './components/button/button.ts'
import { input } from './components/input/input.ts'
import { link } from './components/link/link.ts'
import { pageNavigation } from './components/pageNavigation/pageNavigation.ts'
import { chatListItem } from './components/chatLstItem/chatListItem.ts'
import { messageItem } from './components/messageItem/messageItem.ts'
import { ChatListItem, chatListMock } from './mock/chatList.ts'
import { MessageListItem, messageListMock } from './mock/messageList.ts'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('link', link)
Handlebars.registerPartial('pageNavigation', pageNavigation)
Handlebars.registerPartial('chatListItem', chatListItem)
Handlebars.registerPartial('messageItem', messageItem)

export default class App {
  private appElement: HTMLElement | null

  private state: {
    currentPage: PageType,
    chatList: ChatListItem[]
    messageList: MessageListItem[]
  }

  constructor() {
    this.state = {
      currentPage: 'loginPage',
      chatList: chatListMock,
      messageList: messageListMock,
    }
    this.appElement = document.getElementById('root')
  }

  render() {
    if (this.state.currentPage && this.appElement) {
      const { currentPage } = this.state
      const template = Handlebars.compile(Pages[currentPage])
      this.appElement.innerHTML = template({
        chatList: this.state.chatList,
        messageList: this.state.messageList,
      })
    }

    this.attachEventListeners()
  }

  attachEventListeners() {
    const footerLinks = document.querySelectorAll('.pageNavigation-link')
    footerLinks.forEach((linkElement) => {
      linkElement.addEventListener('click', (event) => {
        event.preventDefault()
        const { target } = event

        if (target instanceof HTMLElement && isPageType(target.dataset.page)) {
          this.changePage(target.dataset.page)
        }
      })
    })

    // Сокращаю длинные сообщения до определённого количества символов
    if (this.state.currentPage === 'messengerPage') {
      const MESSAGE_LENGTH = 50
      const chatLastText = document.querySelectorAll('#chat-message')
      chatLastText.forEach((message) => {
        if (message.innerHTML.length >= 50) {
          message.textContent = `${message.textContent?.substring(0, MESSAGE_LENGTH)}...`
        }
      })
    }
  }

  changePage(page: PageType | undefined) {
    this.state.currentPage = page ?? 'page404'
    this.render()
  }
}
