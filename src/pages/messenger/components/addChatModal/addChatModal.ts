import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Input } from '../../../../components/input/input.ts'
import { Button } from '../../../../components/button/button.ts'
import { chatsController } from '../../../../api/chats/chatsController.ts'

class AddChatModal extends Block {
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
        InputChatName: new Input({
          props: {
            labelText: 'Имя чата',
            type: 'text',
            id: 'add-chat-name',
            class: 'add-chat-name field',
            name: 'add-chat-name',
            placeholder: 'Имя чата',
            attr: {
              class: 'field-container no-label'
            }
          }
        }),
        AddChatButton: new Button({
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

    GlobalEventBus.on('openAddChatModal', () => this.open())
    GlobalEventBus.on('closeAddChatModal', () => this.close())
  }

  open(): void {
    document.body.appendChild(this.getContent())
  }

  close(): void {
    this.getContent().remove()
  }

  handleAdd() {
    console.log('handleAdd')
    const chatName = (this.children?.InputChatName as Input).getValue()

    if (chatName) {
      chatsController.createChat({ title: chatName })
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
          <h2>Добавить чат</h2>
          {{{ InputChatName }}}
          {{{ AddChatButton }}}
        </div>
      </div>
    `
  }
}

export const addChatModal = new AddChatModal()
addChatModal.dispatchComponentDidMount()
