import Handlebars from 'handlebars'
import { button } from './components/button/button.ts'
import { input } from './components/input/input.ts'
import { loginPage } from './pages/login/loginPage.ts'
import { registrationPage } from './pages/registration/registrationPage.ts'
import { messengerPage } from './pages/messenger/messengerPage.ts'
import { profilePage } from './pages/profile/profilePage.ts.ts'
import { page404 } from './pages/404/page404.ts'
import { page500 } from './pages/500/page500.ts'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')

  const loginTemplate = Handlebars.compile(loginPage)
  const result = loginTemplate({})

  if (root) {
    root.innerHTML = result
  }
})
