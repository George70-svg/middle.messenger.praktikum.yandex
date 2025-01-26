import { ChangeUserRequest, SearchUserRequest, SearchUserResponse } from './type.ts'
import { user } from './user.ts'

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
}

export const userController = new UserController()
