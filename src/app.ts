import './styles.scss'
import LoginPage from './pages/login/loginPage.ts'
import ProfilePage from './pages/profile/ProfilePage.ts'
import MessengerPage from './pages/messenger/messengerPage.ts'
import { RegistrationPage } from './pages/registration/registrationPage.ts'
import { Page404 } from './pages/404/page404.ts'
import { Page500 } from './pages/500/page500.ts'
import { Router } from './framework/router.ts'

export default class App {
  constructor() {
    const router = new Router('root')
    router
      .use('/', LoginPage)
      .use('/sign-up', RegistrationPage)
      .use('/settings', ProfilePage)
      .use('/messenger', MessengerPage)
      .use('/404', Page404)
      .use('/500', Page500)
      .start()
  }
}
