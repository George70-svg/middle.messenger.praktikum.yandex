import './fileMenu.scss'
import { Button } from '../../../../components/button/button.ts'
import Block from '../../../../framework/block.ts'

export class FileMenu extends Block {
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
            text: '<img src=\'svg/foto.svg\' alt=\'add\'><p>Фото</p>',
            events: {},
            attr: {
              class: 'add-user'
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

  override render(): string {
    return `
      <div class='file-dropdown'>
        <div class='element'>
          <img class='file' src='svg/file.svg' alt='file'>
        </div>
        
        ${this.isShowContent ? `<div class='content'>
          {{{ AddButton }}}
          {{{ RemoveButton }}}
        </div>` : ''}
      </div>
    `
  }
}
