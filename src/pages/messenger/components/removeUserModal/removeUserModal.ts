import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Input } from '../../../../components/input/input.ts'
import { Button } from '../../../../components/button/button.ts'
import { withSelectedChats } from '../../../../store/utils.ts'
import { userController } from '../../../../api/user/userController.ts'
import { SearchUserResponse } from '../../../../api/user/type.ts'
import { ChatResponse } from '../../../../api/chats/types.ts'
import { chatsController } from '../../../../api/chats/chatsController.ts'

class RemoveUserModal extends Block {
  foundUsers: SearchUserResponse[] = []

  constructor(props?: BlockProps) {
    super({
      ...props,
      props: {
        ...props?.props,
        events: {
          ...props?.props?.events,
          click: (e: Event) => this.handleClick(e)
        }
      },
      children: {
        InputUsername: new Input({
          props: {
            labelText: 'Логин',
            type: 'text',
            id: 'find-username',
            class: 'username field',
            name: 'find-username',
            placeholder: 'Логин',
            events: { input: (event) => this.handleSearchLogin(event) },
            attr: { class: 'field-container no-label' }
          }
        }),
        RemoveUserButton: new Button({
          props: {
            text: 'Удалить',
            events: {
              click: () => this.handleRemove()
            },
            attr: {
              class: 'button'
            }
          }
        })
      }
    })

    GlobalEventBus.on('openRemoveUserModal', () => this.open())
    GlobalEventBus.on('closeRemoveUserModal', () => this.close())
  }

  open(): void {
    document.body.appendChild(this.getContent())
  }

  close(): void {
    this.getContent().remove()
  }

  handleSearchLogin(event: Event): void {
    (this.children?.InputUsername as Input).showHintIfNeeded()

    const target = event.target as HTMLInputElement
    const value = target?.value || ''

    userController.searchUser({ login: value })
      .then((users) => {
        this.foundUsers = users
      })
  }

  handleRemove() {
    const data = {
      users: [this.foundUsers.map((user) => user.id)[0]], // Просто беру первого найденного пользователя
      chatId: (this.props?.selectedChat as ChatResponse).id
    }

    if (data && data.users[0] && data.chatId) {
      chatsController.deleteUserFromChat(data)
        .then(() => {
          this.close()
        })
    }
  }

  override shouldDelegateEvent(): boolean {
    return true
  }

  override getDelegatedElement(): HTMLElement | null {
    return this.element
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement

    if (target.classList.contains('modal-backdrop')) {
      this.close()
    } else if (target.closest('.close-btn')) {
      this.close()
    }
  }

  override render(): string {
    return `
      <div class="modal-backdrop">
        <div class="modal-content">
          <h2>Удалить пользователя</h2>
          {{{ InputUsername }}}
          {{{ RemoveUserButton }}}
        </div>
      </div>
    `
  }
}

const RemoveUserModalPage = withSelectedChats(RemoveUserModal)
export const removeUserModal = new RemoveUserModalPage({})
removeUserModal.dispatchComponentDidMount()
