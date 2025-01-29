import { SignInRequest, SignUpRequest } from './type.ts'
import { auth } from './auth.ts'
import store from '../../store/store.ts'
import { goToPath } from '../../framework/common.ts'

class AuthController {
  signUp(data: SignUpRequest) {
    return auth.signUp(data)
      .then(() => {
        auth.getUser().then((user) => {
          store.set('user', user)
          localStorage.setItem('user', JSON.stringify(user))
        })
      })
      .catch((error) => {
        console.error('Ошибка регистрации пользователя', error)
      })
  }

  signIn(data: SignInRequest) {
    return auth.signIn(data)
      .then(() => { auth.getUser() })
      .then(() => { goToPath('/messenger') })
      .catch((error) => {
        if (error.reason === 'User already in system') {
          this.getUser()
            .then(() => { goToPath('/messenger') })
        }

        console.error('Ошибка входа пользователя', error)
      })
  }

  logout() {
    return auth.logout()
      .then(() => {
        auth.getUser().then(() => {
          store.set('user', {})
        })
      })
      .catch((error) => {
        console.error('Ошибка выхода пользователя', error)
      })
      .finally(() => {
        localStorage.removeItem('user')
      })
  }

  getUser() {
    return auth.getUser()
      .then((user) => {
        store.set('user', user)
        localStorage.setItem('user', JSON.stringify(user))
      })
  }
}

export const authController = new AuthController()
