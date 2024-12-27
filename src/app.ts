import { LoginPage } from './pages/login/loginPage.ts'
import { RegistrationPage } from './pages/registration/registrationPage.ts'
import { ProfilePage } from './pages/profile/ProfilePage.ts'
import { MessengerPage } from './pages/messenger/messengerPage.ts'
import { Page404 } from './pages/404/page404.ts'
import { Page500 } from './pages/500/page500.ts'
import { PageType } from './pages/types.ts'
import { GlobalEventBus } from './framework/eventBus.ts'
import Block from './framework/block.ts'

const pageConstructor: Record<PageType, () => Block> = {
  loginPage: () => new LoginPage(),
  registrationPage: () => new RegistrationPage(),
  profileViewPage: () => new ProfilePage({ props: { mode: 'view' } }),
  profileEditPage: () => new ProfilePage({ props: { mode: 'edit' } }),
  profileEditPasswordPage: () => new ProfilePage({ props: { mode: 'password' } }),
  messengerPage: () => new MessengerPage(),
  page404: () => new Page404(),
  page500: () => new Page500()
}

export default class App {
  private appElement: HTMLElement | null

  private state: {
    currentPage: PageType,
  }

  constructor() {
    this.state = {
      currentPage: 'loginPage'
    }

    this.appElement = document.getElementById('root')
    GlobalEventBus.on('changePage', this.changePage.bind(this))
  }

  render() {
    if (this.state.currentPage && this.appElement) {
      const { currentPage } = this.state

      if (currentPage) {
        const newPage = pageConstructor[currentPage]()

        if (this.appElement) {
          this.appElement.innerHTML = ''
          this.appElement.appendChild(newPage.getContent())
        }
      }
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
