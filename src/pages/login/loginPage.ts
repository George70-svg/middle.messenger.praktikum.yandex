import './loginPage.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { Link } from '../../components/link/link.ts'
import { Button } from '../../components/button/button.ts'
import { Input } from '../../components/input/input.ts'
import { goToPath } from '../../framework/common.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { authController } from '../../api/auth/authController.ts'
import { withUser } from '../../store/utils.ts'

class LoginPage extends Block {
  constructor(blockProps?: BlockProps) {
    super({
      props: blockProps,
      children: {
        InputUsername: new Input({
          props: {
            labelText: 'Логин',
            type: 'text',
            id: 'login-username',
            class: 'username field',
            name: 'login',
            placeholder: 'Логин',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        InputPassword: new Input({
          props: {
            labelText: 'Пароль',
            type: 'password',
            id: 'login-password',
            class: 'password field',
            name: 'password',
            placeholder: 'Пароль',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        SubmitButton: new Button({
          props: {
            text: 'Войти',
            events: {
              click: () => this.handleSubmit()
            },
            attr: {
              class: 'button'
            }
          }
        }),
        NotAccount: new Link({
          props: {
            content: 'Нет аккаунта?',
            events: {
              click: (event) => goToPath('/sign-up', event)
            },
            attr: {
              class: 'link',
              href: '/sign-up',
              dataPage: 'registrationPage'
            }
          }
        })
      }
    })
  }

  handleSubmit() {
    // Отправляем событие на проверку всех типов, чтобы каждый причастный input прослушал его и мог вывести сообщение об ошибке
    GlobalEventBus.emit('formChange', ['login', 'password'])

    const inputData = {
      login: this.children?.InputUsername as Input,
      password: this.children?.InputPassword as Input
    }

    const inputValidationNames: (keyof Omit<typeof inputData, 'confirmPassword'>)[] = ['login', 'password']

    const isValidForm = inputValidationNames.every((field) => inputData[field].isValid(field))

    if (isValidForm) {
      const data = {
        login: inputData.login.getValue() as string,
        password: inputData.password.getValue() as string
      }

      authController.signIn(data)
    }
  }

  render() {
    return `
      <main class='login-page'>
        <section class='login-container'>
          <h1 class='title'>Вход</h1>
      
          <form>
            {{{ InputUsername  }}}
            {{{ InputPassword  }}}
          </form>
      
          {{{ SubmitButton }}}
          {{{ NotAccount }}}
        </section>
      </main>
    `
  }
}

export default withUser(LoginPage)
