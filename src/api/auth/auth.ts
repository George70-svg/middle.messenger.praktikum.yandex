import { SignInRequest, SignUpRequest } from './type.ts'
import { HTTPTransport } from '../apiService.ts'

class Auth extends HTTPTransport {
  pathName: string = '/auth'

  path: string = this.baseURL + this.pathName

  signUp(data: SignUpRequest) {
    return this.post(`${this.path}/signup`, { data })
  }

  signIn(data: SignInRequest) {
    return this.post(`${this.path}/signin`, { data })
  }

  logout() {
    return this.post(`${this.path}/logout`)
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
