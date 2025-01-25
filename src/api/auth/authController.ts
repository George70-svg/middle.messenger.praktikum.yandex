import { SignInRequest, SignUpRequest } from './type.ts'
import { auth } from './auth.ts'
import store from '../../store/store.ts'

class AuthController {
  signUp(data: SignUpRequest) {
    return auth.signUp(data)
      .catch((error) => {
        console.error('error', error)
        throw error
      })
  }

  signIn(data: SignInRequest) {
    return auth.signIn(data)
      .then(() => {
        auth.getUser().then((user) => {
          store.set('user', user)
        })
      })
      .catch((error) => {
        if (error.reason === 'User already in system') {
          auth.logout().then(() => console.log('Hard logout'))
        }
        console.error('error', error)
        throw error
      })
  }

  logout() {
    return auth.logout()
      .catch((error) => {
        console.error('error', error)
        throw error
      })
  }
}

export const authController = new AuthController()
