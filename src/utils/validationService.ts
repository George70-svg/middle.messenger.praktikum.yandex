export type InputName = 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | 'message' | 'newPassword'

export type ValidationMessage = {
  status: boolean,
  message: string
}

type ValidationRules = Record<
  InputName,
  { regex: string, message: string }[]
>

const validationRules: ValidationRules = {
  email: [
    { regex: '^[A-Za-z0-9._-]+@', message: 'Email должен содержать латиницу, цифры, дефисы, подчёркивания и "@"' },
    { regex: '[A-Za-z0-9-]+\\.[A-Za-z]+$', message: 'После "@" должен быть домен с буквами и точкой' }
  ],
  login: [
    { regex: '^.{3,20}$', message: 'Длина логина от 3 до 20 символов' },
    { regex: '[A-Za-z]', message: 'Логин должен содержать хотя бы одну букву латиницы' },
    { regex: '^[A-Za-z0-9_-]+$', message: 'Логин должен состоять только из букв, цифр, дефисов и подчёркиваний' },
    { regex: '^(?!\\d+$).*$', message: 'Логин не должен состоять только из цифр' }
  ],
  first_name: [
    { regex: '^[A-ZА-ЯЁ]', message: 'Первая буква имени должна быть заглавная (латиница или кириллица)' },
    { regex: '^[A-ZА-ЯЁa-zа-яё-]+$', message: 'Имя должно содержать только буквы и дефисы' },
    { regex: '^\\S+$', message: 'Имя не должно содержать пробелов' },
    { regex: '^[^\\d]*$', message: 'Имя не должно содержать цифр' },
    { regex: '^(?!-).*(?<!-)$', message: 'Дефисы не могут быть в начале или конце строки' }
  ],
  second_name: [
    { regex: '^[A-ZА-ЯЁ]', message: 'Первая буква фамилии должна быть заглавная (латиница или кириллица)' },
    { regex: '^[A-ZА-ЯЁa-zа-яё-]+$', message: 'Фамилия должна содержать только буквы и дефисы' },
    { regex: '^\\S+$', message: 'Фамилия не должна содержать пробелов' },
    { regex: '^[^\\d]*$', message: 'Фамилия не должна содержать цифр' },
    { regex: '^(?!-).*(?<!-)$', message: 'Дефисы не могут быть в начале или конце строки' }
  ],
  phone: [
    { regex: '^.{10,15}$', message: 'Телефон должен быть длиной от 10 до 15 символов' },
    { regex: '^\\+?[0-9]+$', message: 'Телефон должен состоять только из цифр и может начинаться с плюса' }
  ],
  message: [
    { regex: '^.+$', message: 'Сообщение не должно быть пустым' }
  ],
  password: [
    { regex: '^.{8,40}$', message: 'Длина должна быть от 8 до 40 символов' },
    { regex: '(?=.*[A-Z])', message: 'Пароль должен содержать хотя бы одну заглавную латинскую букву' },
    { regex: '(?=.*\\d)', message: 'Пароль должен содержать хотя бы одну цифру' }
  ],
  newPassword: [
    { regex: '^.{8,40}$', message: 'Длина должна быть от 8 до 40 символов' },
    { regex: '(?=.*[A-Z])', message: 'Пароль должен содержать хотя бы одну заглавную латинскую букву' },
    { regex: '(?=.*\\d)', message: 'Пароль должен содержать хотя бы одну цифру' }
  ]
}

export function inputValidation(inputName: InputName, inputValue: string): ValidationMessage {
  const rules = validationRules[inputName]

  if (!rules || rules.length === 0) {
    return { status: false, message: '' }
  }

  for (const rule of rules) {
    const regex = new RegExp(rule.regex)

    if (!regex.test(inputValue)) {
      return {
        status: true,
        message: rule.message
      }
    }
  }

  return {
    status: false,
    message: ''
  }
}
