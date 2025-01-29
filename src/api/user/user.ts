import { ChangePasswordResponse, ChangeUserRequest, SearchUserRequest } from './type.ts'
import { HTTPTransport } from '../apiService.ts'

const userAPIInstance = new HTTPTransport('/api/v2/user')

class User {
  searchUser(data: SearchUserRequest) {
    return userAPIInstance.post('/search', { data })
  }

  changeUser(data: ChangeUserRequest) {
    return userAPIInstance.put('/profile', { data })
  }

  changeAvatar(data: FormData) {
    return userAPIInstance.put('/profile/avatar', { data })
  }

  changePassword(data: ChangePasswordResponse) {
    return userAPIInstance.put('/password', { data })
  }
}

export const user = new User()
