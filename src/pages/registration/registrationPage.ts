import './registrationPage.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { Link } from '../../components/link/link.ts'
import { Button } from '../../components/button/button.ts'
import { Input } from '../../components/input/input.ts'
import { goToPath } from '../../framework/common.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { authController } from '../../api/auth/authController.ts'

export class RegistrationPage extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps,
      children: {
        InputEmail: new Input({
          props: {
            labelText: 'Почта',
            type: 'email',
            id: 'registration-email',
            class: 'email field',
            name: 'email',
            placeholder: 'Почта',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputUsername: new Input({
          props: {
            labelText: 'Логин',
            type: 'text',
            id: 'registration-username',
            class: 'username field',
            name: 'login',
            placeholder: 'Логин',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputFirstName: new Input({
          props: {
            labelText: 'Имя',
            type: 'text',
            id: 'registration-first-name',
            class: 'first-name field',
            name: 'first_name',
            placeholder: 'Имя',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputSecondName: new Input({
          props: {
            labelText: 'Фамилия',
            type: 'text',
            id: 'registration-second-name',
            class: 'second-name field',
            name: 'second_name',
            placeholder: 'Фамилия',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputPhone: new Input({
          props: {
            labelText: 'Телефон',
            type: 'tel',
            id: 'registration-phone',
            class: 'phone field',
            name: 'phone',
            placeholder: 'Телефон',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputPassword: new Input({
          props: {
            labelText: 'Пароль',
            type: 'password',
            id: 'registration-password',
            class: 'password field',
            name: 'password',
            placeholder: 'Пароль',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputConfirmPassword: new Input({
          props: {
            labelText: 'Пароль',
            type: 'password',
            id: 'registration-confirm-password',
            class: 'confirm-password field',
            name: 'password',
            placeholder: 'Пароль (ещё раз)',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        SubmitButton: new Button({
          props: {
            text: 'Зарегистрироваться',
            events: {
              click: () => this.handleSubmit()
            },
            attr: {
              class: 'button'
            }
          }
        }),
        ToLogin: new Link({
          props: {
            content: 'Войти',
            events: {
              click: (event) => goToPath('/', event)
            },
            attr: {
              class: 'link',
              href: '/',
              dataPage: 'loginPage'
            }
          }
        })
      }
    })
  }

  handleSubmit() {
    // Отправляем событие на проверку всех типов, чтобы каждый причастный input прослушал его и мог вывести сообщение об ошибке
    GlobalEventBus.emit('formChange', ['email', 'first_name', 'phone', 'second_name', 'login', 'password'])

    const inputData = {
      email: this.children?.InputEmail as Input,
      login: this.children?.InputUsername as Input,
      first_name: this.children?.InputFirstName as Input,
      second_name: this.children?.InputSecondName as Input,
      phone: this.children?.InputPhone as Input,
      password: this.children?.InputPassword as Input,
      confirmPassword: this.children?.InputConfirmPassword as Input
    }

    const inputValidationNames: (keyof Omit<typeof inputData, 'confirmPassword'>)[] = ['email', 'login', 'first_name', 'phone', 'second_name', 'password']

    const isValidForm = inputValidationNames.every((field) => inputData[field].isValid(field))
    if (isValidForm) {
      const data = {
        email: inputData.email.getValue() as string,
        login: inputData.login.getValue() as string,
        first_name: inputData.first_name.getValue() as string,
        second_name: inputData.second_name.getValue() as string,
        phone: inputData.phone.getValue() as string,
        password: inputData.password.getValue() as string
      }

      authController.signUp(data)
        .then(() => {
          goToPath('/messenger')
        })
    }
  }

  render() {
    return `
      <main class='registration-page'>
        <section class='registration-container'>
          <h1 class='title'>Регистрация</h1>
      
          <form>
              {{{ InputEmail }}}
              {{{ InputUsername }}}
              {{{ InputFirstName }}}
              {{{ InputSecondName }}}
              {{{ InputPhone }}}
              {{{ InputPassword }}}
              {{{ InputConfirmPassword }}}
          </form>
          
          {{{ SubmitButton }}}
          {{{ ToLogin }}}
        </section>
      </main>
    `
  }
}
