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
            events: {
              click: () => this.handleImage()
            },
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
    console.log('dropdownToggle', this.isShowContent)
    this.setProps({})
  }

  override shouldDelegateEvent(): boolean {
    return true
  }

  handleImage() {
    console.log('Image')
  }

  override render(): string {
    return `
      <div class='file-dropdown'>
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
