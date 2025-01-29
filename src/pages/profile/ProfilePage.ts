import './profilePage.scss'
import Block, { BlockProps, PropsProps } from '../../framework/block.ts'
import { Input } from '../../components/input/input.ts'
import { Button } from '../../components/button/button.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'
import { goToPath } from '../../framework/common.ts'
import { Link } from '../../components/link/link.ts'
import { authController } from '../../api/auth/authController.ts'
import { withUser } from '../../store/utils.ts'
import { UserResponse } from '../../api/auth/type.ts'
import { userController } from '../../api/user/userController.ts'

class ProfilePage extends Block {
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
            value: (blockProps.props?.user as UserResponse)?.email || '',
            type: 'email',
            id: 'email-profileEdit',
            name: 'email',
            placeholder: 'pochta@yandex.ru',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputUsername: new Input({
          props: {
            labelText: 'Логин',
            value: (blockProps.props?.user as UserResponse)?.login || '',
            type: 'text',
            id: 'login-profile-edit',
            name: 'login',
            placeholder: 'ivanivanov',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputFirstName: new Input({
          props: {
            labelText: 'Имя',
            value: (blockProps.props?.user as UserResponse)?.first_name || '',
            type: 'text',
            id: 'first-name-profile-edit',
            name: 'first_name',
            placeholder: 'Иван',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputSecondName: new Input({
          props: {
            labelText: 'Фамилия',
            value: (blockProps.props?.user as UserResponse)?.second_name || '',
            type: 'text',
            id: 'second-name-profile-edit',
            name: 'second_name',
            placeholder: 'Иванов',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputDisplayName: new Input({
          props: {
            labelText: 'Имя в чате',
            value: (blockProps.props?.user as UserResponse)?.display_name || '',
            type: 'text',
            id: 'display-name-profile-edit',
            name: 'display_name',
            placeholder: 'Иван',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputPhone: new Input({
          props: {
            labelText: 'Телефон',
            value: (blockProps.props?.user as UserResponse)?.phone || '',
            type: 'tel',
            id: 'phone-profile-edit',
            name: 'phone',
            placeholder: '+79099673030',
            hideHint: true,
            disabled: blockProps.props?.mode !== 'edit'
          }
        }),
        InputOldPassword: new Input({
          props: {
            labelText: 'Старый пароль',
            type: 'password',
            id: 'old-password-profile-edit-password',
            name: 'password',
            hideHint: true,
            placeholder: '•••••••••'
          }
        }),
        InputNewPassword: new Input({
          props: {
            labelText: 'Новый пароль',
            type: 'password',
            id: 'new-password-profile-edit-password',
            name: 'password',
            hideHint: true,
            placeholder: '•••••••••••'
          }
        }),
        InputRepeatNewPassword: new Input({
          props: {
            labelText: 'Повторите новый пароль',
            type: 'password',
            id: 'new-repeat-password-password-profile-edit-password',
            name: 'password',
            hideHint: true,
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
            text: (blockProps.props?.user as UserResponse).avatar ? `<img class='image' src='https://ya-praktikum.tech/api/v2/resources/${(blockProps.props?.user as UserResponse).avatar}' alt='default'>` : '',
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
      GlobalEventBus.emit('formChange', ['email', 'first_name', 'phone', 'second_name', 'login'])

      const inputData = {
        email: this.children?.InputEmail as Input,
        login: this.children?.InputUsername as Input,
        first_name: this.children?.InputFirstName as Input,
        second_name: this.children?.InputSecondName as Input,
        display_name: this.children?.InputDisplayName as Input,
        phone: this.children?.InputPhone as Input
      }

      const inputValidationNames: (keyof Omit<typeof inputData, 'display_name'>)[] = ['email', 'login', 'first_name', 'second_name', 'phone']
      const isValidForm = inputValidationNames.every((field) => inputData[field].isValid(field))

      if (isValidForm) {
        const data = {
          email: inputData.email.getValue() as string,
          login: inputData.login.getValue() as string,
          first_name: inputData.first_name.getValue() as string,
          second_name: inputData.second_name.getValue() as string,
          display_name: inputData.display_name.getValue() as string,
          phone: inputData.phone.getValue() as string
        }

        userController.changeUser(data)
      }
    } else if (mode === 'password') {
      GlobalEventBus.emit('formChange', ['password'])

      const inputData = {
        oldPassword: this.children?.InputOldPassword as Input,
        newPassword: this.children?.InputNewPassword as Input
      }

      const inputValidationNames: (keyof Omit<typeof inputData, 'oldPassword'>)[] = ['newPassword']
      const isValidForm = inputValidationNames.every((field) => inputData[field].isValid(field))

      if (isValidForm) {
        const data = {
          oldPassword: inputData.oldPassword.getValue() as string,
          newPassword: inputData.newPassword.getValue() as string
        }

        userController.changePassword(data)
      }
    }
  }

  handleChangeAvatar() {
    GlobalEventBus.emit('openChangeAvatarModal')
  }

  _componentDidUpdate(oldProps: PropsProps, newProps: PropsProps): void {
    if (oldProps.user !== newProps.user && newProps.user) {
      (this.children?.InputEmail as Block).setProps({ value: (newProps.user as UserResponse).email || '' });
      (this.children?.InputUsername as Block).setProps({ value: (newProps.user as UserResponse).login || '' });
      (this.children?.InputFirstName as Block).setProps({ value: (newProps.user as UserResponse).first_name || '' });
      (this.children?.InputSecondName as Block).setProps({ value: (newProps.user as UserResponse).second_name || '' });
      (this.children?.InputPhone as Block).setProps({ value: (newProps.user as UserResponse).phone || '' });
      (this.children?.ChangeAvatarButton as Block).setProps(
        {
          text: (newProps.user as UserResponse).avatar
            ? `<img class='image' src='https://ya-praktikum.tech/api/v2/resources/${(newProps.user as UserResponse).avatar}' alt='default'>`
            : ''
        }
      )
    }

    super._componentDidUpdate(oldProps, newProps)
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
                <h3 class='name'>{{ user.display_name }}</h3>
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

export default withUser(ProfilePage)
