import { SignInRequest, SignUpRequest } from './type.ts'
import { HTTPTransport } from '../apiService.ts'

const path = 'https://ya-praktikum.tech/api/v2/auth'

export const auth = {
  signUp(data: SignUpRequest) {
    return new HTTPTransport().post(`${path}/signup`, { data })
  },
  signIn(data: SignInRequest) {
    return new HTTPTransport().post(`${path}/signin`, { data })
  },
  logout() {
    return new HTTPTransport().post(`${path}/logout`)
  }
}

/*
AntonTest@mail.com
AntonTest
TestName
TestSurname
89821112345671
Password1
Password1
*/
