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
