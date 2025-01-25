export type SignUpRequest = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type SignInRequest = {
  login: string,
  password: string
}

export type UserResponse = {
  avatar: string
  display_name: null
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
}
