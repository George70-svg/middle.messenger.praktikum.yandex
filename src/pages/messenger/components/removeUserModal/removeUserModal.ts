import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Input } from '../../../../components/input/input.ts'
import { Button } from '../../../../components/button/button.ts'

class RemoveUserModal extends Block {
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

  handleRemove() {
    console.log('handleRemove')
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

export const removeUserModal = new RemoveUserModal()
removeUserModal.dispatchComponentDidMount()
