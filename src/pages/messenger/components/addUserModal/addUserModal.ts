import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Input } from '../../../../components/input/input.ts'
import { Button } from '../../../../components/button/button.ts'

class AddUserModal extends Block {
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
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        AddUserButton: new Button({
          props: {
            text: 'Добавить',
            events: {
              click: () => this.handleAdd()
            },
            attr: {
              class: 'button'
            }
          }
        })
      }
    })

    GlobalEventBus.on('openAddUserModal', () => this.open())
    GlobalEventBus.on('closeAddUserModal', () => this.close())
  }

  open(): void {
    document.body.appendChild(this.getContent())
  }

  close(): void {
    this.getContent().remove()
  }

  handleAdd() {
    console.log('handleAdd')
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
          <h2>Добавить пользователя</h2>
          {{{ InputUsername }}}
          {{{ AddUserButton }}}
        </div>
      </div>
    `
  }
}

export const addUserModal = new AddUserModal()
addUserModal.dispatchComponentDidMount()
