import { SignInRequest, SignUpRequest } from './type.ts'
import { HTTPTransport } from '../apiService.ts'

const authAPIInstance = new HTTPTransport('/api/v2/auth')

class Auth {
  signUp(data: SignUpRequest) {
    return authAPIInstance.post('/signup', { data })
      .catch((error) => {
        throw error
      })
  }

  signIn(data: SignInRequest) {
    return authAPIInstance.post('/signin', { data })
  }

  logout() {
    return authAPIInstance.post('/logout')
      .catch((error) => {
        throw error
      })
  }

  getUser() {
    return authAPIInstance.get('/user')
      .catch((error) => {
        throw error
      })
  }
}

export const auth = new Auth()

/*
AntonTest@mail.com
AntonTest
TestName
TestSurname
89821112345671
Password1
Password1
*/
