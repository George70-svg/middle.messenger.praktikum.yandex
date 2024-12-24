import './loginPage.css'
import Block, { BlockProps } from '../../framework/block.ts'
import { Link } from '../../components/link/link.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'
import { Button } from '../../components/button/button.ts'
import { Input } from '../../components/input/input.ts'

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
        Button: new Button({
          props: {
            text: 'Войти',
            attr: {
              class: 'button'
            }
          }
        }),
        NotAccount: new Link({
          props: {
            text: 'Нет аккаунта?',
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

  render() {
    return `
      <main class='login-page'>
        <section class='login-container'>
          <h1 class='title'>Вход</h1>
      
          <form>
            {{{ InputUsername  }}}
            {{{ InputPassword  }}}
          </form>
      
          {{{ Button }}}
          {{{ NotAccount }}}
        </section>
      
        {{{ PageNavigation }}}
      </main>
    `
  }
}
