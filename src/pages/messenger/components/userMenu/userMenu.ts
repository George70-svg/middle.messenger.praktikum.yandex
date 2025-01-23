import './userMenu.scss'
import { Button } from '../../../../components/button/button.ts'
import Block from '../../../../framework/block.ts'

export class UserMenu extends Block {
  isShowContent: boolean = false

  constructor() {
    super({
      props: {
        events: {
          click: () => this.dropdownToggle()
        }
      },
      children: {
        AddButton: new Button({
          props: {
            text: '<img src=\'svg/add.svg\' alt=\'add\'><p>Добавить пользователя</p>',
            events: {
              click: () => this.handleAddUser()
            },
            attr: {
              class: 'add-user'
            }
          }
        }),
        RemoveButton: new Button({
          props: {
            text: '<img src=\'svg/delete.svg\' alt=\'delete\'><p>Удалить пользователя</p>',
            events: {
              click: () => this.handleRemoveUser()
            },
            attr: {
              class: 'remove-user'
            }
          }
        })
      }
    })
  }

  dropdownToggle() {
    this.isShowContent = !this.isShowContent
    console.log('dropdownToggle', this.isShowContent)
    this.setProps({})
  }

  override shouldDelegateEvent(): boolean {
    return true
  }

  handleAddUser() {
    console.log('Add')
  }

  handleRemoveUser() {
    console.log('Remove')
  }

  override render(): string {
    return `
      <div class='user-dropdown'>
        <div class='element'>
          <img class='file' src='svg/doteMenu.svg' alt='file'>
        </div>
        
        ${this.isShowContent ? `<div class='content'>
          {{{ AddButton }}}
          {{{ RemoveButton }}}
        </div>` : ''}
      </div>
    `
  }
}
