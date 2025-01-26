import './userMenu.scss'
import { Button } from '../../../../components/button/button.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import { chatsController } from '../../../../api/chats/chatsController.ts'
import { withSelectedChats } from '../../../../store/utils.ts'
import { ChatResponse } from '../../../../api/chats/types.ts'

class UserMenu extends Block {
  isShowContent: boolean = false

  constructor(blockProps: BlockProps) {
    super({
      props: {
        ...blockProps.props,
        events: {
          click: () => this.dropdownToggle()
        }
      },
      children: {
        AddUserButton: new Button({
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
        RemoveUserButton: new Button({
          props: {
            text: '<img src=\'svg/delete.svg\' alt=\'delete\'><p>Удалить пользователя</p>',
            events: {
              click: () => this.handleRemoveUser()
            },
            attr: {
              class: 'remove-user'
            }
          }
        }),
        RemoveChatButton: new Button({
          props: {
            text: '<img src=\'svg/basket.svg\' alt=\'delete\'><p>Удалить чат</p>',
            events: {
              click: () => this.handleRemoveChat()
            },
            attr: {
              class: 'remove-chat'
            }
          }
        })
      }
    })
  }

  dropdownToggle() {
    this.isShowContent = !this.isShowContent
    this.setProps({})
  }

  override shouldDelegateEvent(): boolean {
    return true
  }

  handleAddUser() {
    GlobalEventBus.emit('openAddUserModal')
  }

  handleRemoveUser() {
    GlobalEventBus.emit('openRemoveUserModal')
  }

  handleRemoveChat() {
    console.log('delete chat', this.props)

    if (this.props?.selectedChat) {
      const data = { chatId: (this.props.selectedChat as ChatResponse).id }
      chatsController.deleteChat(data)
    }
  }

  override render(): string {
    return `
      <div class='user-dropdown'>
        <div class='element'>
          <img class='file' src='svg/doteMenu.svg' alt='file'>
        </div>
        
        ${this.isShowContent ? `<div class='content'>
          {{{ AddUserButton }}}
          {{{ RemoveUserButton }}}
          {{{ RemoveChatButton }}}
        </div>` : ''}
      </div>
    `
  }
}

export default withSelectedChats(UserMenu)
