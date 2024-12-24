//import Handlebars from 'handlebars'
import { Page404 } from './pages/404/page404.ts'
import { Page500 } from './pages/500/page500.ts'
import { LoginPage } from './pages/login/loginPage.ts'
import { RegistrationPage } from './pages/registration/registrationPage.ts'
import { isPageType, PageType } from './pages/types.ts'
import { ChatListItem, chatListMock } from './mock/chatList.ts'
import { MessageListItem, messageListMock } from './mock/messageList.ts'
import { GlobalEventBus } from './framework/eventBus.ts'
import { ProfilePage } from './pages/profile/ProfilePage.ts'

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
      messageList: messageListMock
    }

    this.appElement = document.getElementById('root')
    GlobalEventBus.on('changePage', this.changePage.bind(this))
  }

  render() {
    if (this.state.currentPage && this.appElement) {
      const { currentPage } = this.state

      if (currentPage === 'page404') {
        const newPage = new Page404()
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'page500') {
        const newPage = new Page500()
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'loginPage') {
        const newPage = new LoginPage()
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'registrationPage') {
        const newPage = new RegistrationPage()
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'profileViewPage') {
        const newPage = new ProfilePage({ props: { mode: 'view' } })
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'profileEditPage') {
        const newPage = new ProfilePage({ props: { mode: 'edit' } })
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      } else if (currentPage === 'profileEditPasswordPage') {
        const newPage = new ProfilePage({ props: { mode: 'password' } })
        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      }
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

  changePage(page: PageType): void {
    if (page) {
      this.state.currentPage = page
    } else {
      this.state.currentPage = 'page404'
    }

    this.render()
  }
}
