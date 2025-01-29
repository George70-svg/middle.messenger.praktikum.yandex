import '../../../../styles/modal.scss'
import { GlobalEventBus } from '../../../../framework/eventBus.ts'
import Block, { BlockProps } from '../../../../framework/block.ts'
import { Button } from '../../../../components/button/button.ts'
import { Input } from '../../../../components/input/input.ts'
import { userController } from '../../../../api/user/userController.ts'

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
        InputAvatarFile: new Input({
          props: {
            labelText: 'Выбрать файл на компьютере',
            value: '',
            type: 'file',
            id: 'avatar-profile-edit',
            name: 'avatar',
            placeholder: '',
            hideHint: true,
            disabled: false
          }
        }),
        ChangeAvatarButton: new Button({
          props: {
            text: 'Поменять',
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
    const file = (this.children?.InputAvatarFile as Input).getFile()
    console.log('file', file)

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)
      userController.changeAvatar(formData)
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
        <div class="modal-change-avatar-content">
          <h2>Загрузите файл</h2>
          {{{ InputAvatarFile }}}
          {{{ ChangeAvatarButton }}}
        </div>
      </div>
    `
  }
}

export const changeAvatarModal = new ChangeAvatarModal()
changeAvatarModal.dispatchComponentDidMount()
