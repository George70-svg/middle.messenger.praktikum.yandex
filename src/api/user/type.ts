export type SearchUserRequest = {
  login: string
}

export type ChangeUserRequest = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export type SearchUserResponse = {
  avatar: string | null
  display_name: string
  first_name: string
  id: number
  login: string
  second_name: string
}
