import { LoginPage } from './pages/login/loginPage.ts'
import { RegistrationPage } from './pages/registration/registrationPage.ts'
import { ProfilePage } from './pages/profile/ProfilePage.ts'
import { MessengerPage } from './pages/messenger/messengerPage.ts'
import { Page404 } from './pages/404/page404.ts'
import { Page500 } from './pages/500/page500.ts'
import { Router } from './framework/router.ts'

export default class App {
  constructor() {
    const router = new Router('root')
    router
      .use('/', new LoginPage())
      .use('/sign-up', new RegistrationPage())
      .use('/settings', new ProfilePage())
      .use('/messenger', new MessengerPage())
      .use('/404', new Page404())
      .use('/500', new Page500())
      .start()

    console.log('router', router)
  }
}
