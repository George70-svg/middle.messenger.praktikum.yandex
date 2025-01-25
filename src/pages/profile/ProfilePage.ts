import './profilePage.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { Input } from '../../components/input/input.ts'
import { Button } from '../../components/button/button.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { goToPath } from '../../framework/common.ts'
import { Link } from '../../components/link/link.ts'
import { authController } from '../../api/auth/authController.ts'

export class ProfilePage extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props,
      children: {
        LinkToMessenger: new Link({
          props: {
            content: '<img src=\'svg/arrow.svg\' alt=\'arrow\'>',
            events: {
              click: (event) => goToPath('/messenger', event)
            },
            attr: {
              class: 'pageNavigation-link round-button back-button',
              href: '/messenger',
              dataPage: 'messengerPage'
            }
          }
        }),
        LinkToEditMode: new Link({
          props: {
            content: 'Изменить данные',
            events: {
              click: (event) => goToPath('/settings', event, { props: { mode: 'edit' } })
            },
            attr: {
              class: 'change-info',
              href: '/settings',
              dataPage: 'profileEditPage'
            }
          }
        }),
        LinkToEditPasswordMode: new Link({
          props: {
            content: 'Изменить пароль',
            events: {
              click: (event) => goToPath('/settings', event, { props: { mode: 'password' } })
            },
            attr: {
              class: 'change-password',
              href: '/settings',
              dataPage: 'profileEditPasswordPage'
            }
          }
        }),
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
            placeholder: '+79099673030',
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
        LogoutButton: new Button({
          props: {
            text: 'выйти',
            events: {
              click: () => this.handleLogout()
            },
            attr: {
              class: 'exit'
            }
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
        ChangeAvatarButton: new Button({
          props: {
            text: '<img src=\'svg/image.svg\' alt=\'default\'>',
            events: {
              click: () => this.handleChangeAvatar()
            },
            attr: {
              class: 'avatar'
            }
          }
        })
      }
    })
  }

  async handleLogout() {
    try {
      await authController.logout()
    } catch (error) {
      console.error('Logout error', error)
    } finally {
      goToPath('/')
    }
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

  handleChangeAvatar() {
    GlobalEventBus.emit('openChangeAvatarModal')
  }

  override render(): string {
    const isEditMode = this.props?.mode === 'edit'
    const isPasswordMode = this.props?.mode === 'password'
    const isViewMode = this.props?.mode === 'view' || (!isEditMode && !isPasswordMode) // Режим просмотра если не выбраны другие

    return `
      <main class='profile-page'>
        <aside class='nav-container'>
          {{{ LinkToMessenger }}}
        </aside>
      
        <section class='profile-container'>
          <div class='profile'>
            <div class='avatar-container'>
              {{{ ChangeAvatarButton }}}
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
                {{{ LinkToEditMode }}}
                {{{ LinkToEditPasswordMode }}}
                {{{ LogoutButton }}}
              </div>` : ''}
      
            ${!isViewMode ? `
              <div class='save-container'>
                {{{ SaveButton }}}
              </div>` : ''}
          </div>
        </section>
      </main>
    `
  }
}
