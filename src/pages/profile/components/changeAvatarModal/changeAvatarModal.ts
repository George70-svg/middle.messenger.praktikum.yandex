import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Button } from '../../../../components/button/button.ts'

class ChangeAvatarModal extends Block {
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
        ChangeAvatarButton: new Button({
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

    GlobalEventBus.on('openChangeAvatarModal', () => this.open())
    GlobalEventBus.on('closeChangeAvatarModal', () => this.close())
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
        <div class="modal-change-avatar-content">
          <h2>Загрузите файл</h2>
          <p>Выбрать файл на компьютере</p>
          {{{ ChangeAvatarButton }}}
        </div>
      </div>
    `
  }
}

export const changeAvatarModal = new ChangeAvatarModal()
changeAvatarModal.dispatchComponentDidMount()
