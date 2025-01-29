import { ChangePasswordResponse, ChangeUserRequest, SearchUserRequest, SearchUserResponse } from './type.ts'
import { user } from './user.ts'
import store from '../../store/store.ts'

class UserController {
  searchUser(data: SearchUserRequest) {
    return user.searchUser(data)
      .then((users) => users as SearchUserResponse[])
      .catch((error) => {
        console.error('Ошибка поиска пользователя', error)
        throw error
      })
  }

  changeUser(data: ChangeUserRequest) {
    return user.changeUser(data)
      .catch((error) => {
        console.error('Ошибка редактирования профиля', error)
        throw error
      })
  }

  changeAvatar(data: FormData) {
    return user.changeAvatar(data)
      .then((user) => {
        store.set('user', user)
        localStorage.setItem('user', JSON.stringify(user))
      })
      .catch((error) => {
        console.error('Ошибка изменения аватара', error)
        throw error
      })
  }

  changePassword(data: ChangePasswordResponse) {
    return user.changePassword(data)
      .catch((error) => {
        console.error('Ошибка изменения пароля', error)
        throw error
      })
  }
}

export const userController = new UserController()
