import './registrationPage.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { Link } from '../../components/link/link.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'
import { Button } from '../../components/button/button.ts'
import { Input } from '../../components/input/input.ts'
import { changePage } from '../../framework/common.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'

export class RegistrationPage extends Block {
  constructor(blockProps?: BlockProps) {
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
              click: (event) => changePage(event)
            },
            attr: {
              class: 'link',
              href: '/loginPage',
              dataPage: 'loginPage'
            }
          }
        }),
        PageNavigation: new PageNavigation()
      }
    })
  }

  handleSubmit() {
    const email = (this.children?.InputEmail as Input).getValue()
    const username = (this.children?.InputUsername as Input).getValue()
    const firstName = (this.children?.InputFirstName as Input).getValue()
    const secondName = (this.children?.InputSecondName as Input).getValue()
    const phone = (this.children?.InputPhone as Input).getValue()
    const password = (this.children?.InputPassword as Input).getValue()
    const confirmPassword = (this.children?.InputConfirmPassword as Input).getValue()

    GlobalEventBus.emit('formChange', ['email', 'first_name', 'phone', 'second_name', 'login', 'password'])
    console.log('Form Data:', { email, username, firstName, secondName, phone, password, confirmPassword })
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
      
        {{{ PageNavigation }}}
      </main>
    `
  }
}
