import { SignInRequest, SignUpRequest } from './type.ts'
import { auth } from './auth.ts'
import store from '../../store/store.ts'

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
        throw error
      })
  }

  signIn(data: SignInRequest) {
    return auth.signIn(data)
      .then(() => {
        auth.getUser().then((user) => {
          store.set('user', user)
          localStorage.setItem('user', JSON.stringify(user))
        })
      })
      .catch((error) => {
        if (error.reason === 'User already in system') {
          auth.logout().then(() => console.log('Hard logout'))
        }

        console.error('Ошибка входа пользователя', error)
        throw error
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
        throw error
      })
      .finally(() => {
        localStorage.removeItem('user')
        console.log('localStorage', localStorage.getItem('user'))
      })
  }

  getUser() {
    return auth.getUser()
      .then((user) => {
        store.set('user', user)
      })
  }
}

export const authController = new AuthController()
