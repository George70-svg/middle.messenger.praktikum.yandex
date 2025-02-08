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
  avatar: string | null
  display_name: string | null
  email: string | null
  first_name: string | null
  id: number | null
  login: string | null
  phone: string | null
  second_name: string | null
}

export type LastMessage = {
  content: string
  id: number
  time: string
  user: UserResponse
}
