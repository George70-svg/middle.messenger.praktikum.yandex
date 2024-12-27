import './profilePage.css'
import Block, { BlockProps } from '../../framework/block.ts'
import { Input } from '../../components/input/input.ts'
import { Button } from '../../components/button/button.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'

export class ProfilePage extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props,
      children: {
        InputEmail: new Input({
          props: {
            labelText: 'Почта',
            type: 'email',
            id: 'email-profileEdit',
            name: 'email',
            placeholder: 'pochta@yandex.ru',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputUsername: new Input({
          props: {
            labelText: 'Логин',
            type: 'text',
            id: 'login-profile-edit',
            name: 'login',
            placeholder: 'ivanivanov',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputFirstName: new Input({
          props: {
            labelText: 'Имя',
            type: 'text',
            id: 'first-name-profile-edit',
            name: 'first_name',
            placeholder: 'Иван',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputSecondName: new Input({
          props: {
            labelText: 'Фамилия',
            type: 'text',
            id: 'second-name-profile-edit',
            name: 'second_name',
            placeholder: 'Иванов',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputDisplayName: new Input({
          props: {
            labelText: 'Имя в чате',
            type: 'text',
            id: 'display-name-profile-edit',
            name: 'display_name',
            placeholder: 'Иван',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputPhone: new Input({
          props: {
            labelText: 'Телефон',
            type: 'tel',
            id: 'phone-profile-edit',
            name: 'phone',
            placeholder: '+7 (909) 967 30 30',
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputOldPassword: new Input({
          props: {
            labelText: 'Старый пароль',
            type: 'password',
            id: 'old-password-profile-edit-password',
            name: 'password',
            placeholder: '•••••••••'
          }
        }),
        InputNewPassword: new Input({
          props: {
            labelText: 'Новый пароль',
            type: 'password',
            id: 'new-password-profile-edit-password',
            name: 'password',
            placeholder: '•••••••••••'
          }
        }),
        InputRepeatNewPassword: new Input({
          props: {
            labelText: 'Повторите новый пароль',
            type: 'password',
            id: 'new-repeat-password-password-profile-edit-password',
            name: 'password',
            placeholder: '•••••••••••'
          }
        }),
        SaveButton: new Button({
          props: {
            text: 'Сохранить',
            events: {
              click: () => this.handleSave()
            },
            attr: {
              class: 'button'
            }
          }
        }),
        PageNavigation: new PageNavigation()
      }
    })
  }

  handleSave() {
    const mode = this.props?.mode

    if (mode === 'edit') {
      const email = (this.children?.InputEmail as Input).getValue()
      const username = (this.children?.InputUsername as Input).getValue()
      const firstName = (this.children?.InputFirstName as Input).getValue()
      const secondName = (this.children?.InputSecondName as Input).getValue()
      const displayName = (this.children?.InputDisplayName as Input).getValue()
      const phone = (this.children?.InputPhone as Input).getValue()

      GlobalEventBus.emit('formChange', ['email', 'first_name', 'phone', 'second_name', 'login'])
      console.log('Form Data:', { email, username, firstName, secondName, displayName, phone })
    } else if (mode === 'password') {
      const oldPassword = (this.children?.InputOldPassword as Input).getValue()
      const newPassword = (this.children?.InputNewPassword as Input).getValue()

      GlobalEventBus.emit('formChange', ['password'])
      console.log('Form Data:', { oldPassword, newPassword })
    }
  }

  override render(): string {
    const isViewMode = this.props?.mode === 'view'
    const isPasswordMode = this.props?.mode === 'password'

    return `
      <main class='profile-page'>
        <aside class='nav-container'>
          <div class='round-button back-button'>
            <img src='svg/arrow.svg' alt='arrow'>
          </div>
        </aside>
      
        <section class='profile-container'>
          <div class='profile'>
            <div class='avatar-container'>
              <div class='avatar'>
                <img src='svg/image.svg' alt='default'>
              </div>
            </div>

            ${isViewMode ? `
              <div class='name-container'>
                <h3 class='name'>Иван</h3>
              </div>` : ''}
      
            <form class='info-container'>
              ${!isPasswordMode ? `
                {{{ InputEmail }}}
                {{{ InputUsername }}}
                {{{ InputFirstName }}}
                {{{ InputSecondName }}}
                {{{ InputDisplayName }}}
                {{{ InputPhone }}}` : ''}
              
              ${isPasswordMode ? `
                {{{ InputOldPassword }}}
                {{{ InputNewPassword }}}
                {{{ InputRepeatNewPassword }}}` : ''}
            </form>
            
            ${isViewMode ? `
              <div class='edit-container'>
                <p class='change-info'>Изменить данные</p>
                <p class='change-password'>Изменить пароль</p>
                <p class='exit'>Выйти</p>
              </div>` : ''}
      
            ${!isViewMode ? `
              <div class='save-container'>
                {{{ SaveButton }}}
              </div>` : ''}
          </div>
        </section>
      
        {{{ PageNavigation }}}
      </main>
    `
  }
}
