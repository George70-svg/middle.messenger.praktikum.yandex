import { PageType } from './types.ts'

import { loginPage } from './login/loginPage.ts'
import { registrationPage } from './registration/registrationPage.ts'
import { messengerPage } from './messenger/messengerPage.ts'
import { profileViewPage } from './profileView/profileViewPage.ts'
import { profileEditPage } from './profileEdit/profileEditPage.ts'
import { profileEditPasswordPage } from './profileEditPassword/profileEditPasswordPage.ts'
import { page404 } from './404/page404.ts'
import { page500 } from './500/page500.ts'

const Pages: { [key in PageType]: string } = {
  loginPage,
  registrationPage,
  messengerPage,
  profileViewPage,
  profileEditPage,
  profileEditPasswordPage,
  page404,
  page500
}

export default Pages
