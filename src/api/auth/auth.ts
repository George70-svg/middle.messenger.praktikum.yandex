import { SignInRequest, SignUpRequest } from './type.ts'
import { HTTPTransport } from '../apiService.ts'

const authAPIInstance = new HTTPTransport('/api/v2/auth')

class Auth {
  signUp(data: SignUpRequest) {
    return authAPIInstance.post('/signup', { data })
  }

  signIn(data: SignInRequest) {
    return authAPIInstance.post('/signin', { data })
  }

  logout() {
    return authAPIInstance.post('/logout')
  }

  getUser() {
    return authAPIInstance.get('/user')
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
