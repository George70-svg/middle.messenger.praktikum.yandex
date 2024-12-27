import './loginPage.css'
import Block, { BlockProps } from '../../framework/block.ts'
import { Link } from '../../components/link/link.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'
import { Button } from '../../components/button/button.ts'
import { Input } from '../../components/input/input.ts'
import { changePage } from '../../utils/common.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'

export class LoginPage extends Block {
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
            text: 'Нет аккаунта?',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'link',
              href: '/registrationPage',
              dataPage: 'registrationPage'
            }
          }
        }),
        PageNavigation: new PageNavigation()
      }
    })
  }

  handleSubmit() {
    const username = (this.children?.InputUsername as Input).getValue()
    const password = (this.children?.InputPassword as Input).getValue()

    GlobalEventBus.emit('formChange', ['login', 'password'])
    console.log('Form Data:', { username, password })
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
      
        {{{ PageNavigation }}}
      </main>
    `
  }
}
