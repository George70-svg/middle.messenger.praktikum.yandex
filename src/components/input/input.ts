import './input.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { InputName, inputValidation, ValidationMessage } from '../../utils/validationService.ts'
import { GlobalEventBus } from '../../framework/eventBus.ts'

export class Input extends Block {
  validationMessage: ValidationMessage

  constructor(blockProps: BlockProps) {
    super({
      props: {
        ...blockProps.props,
        events: {
          focus: () => this.handleFocus(),
          blur: () => this.handleBlur(),
          input: () => this.handleInput(),
          ...blockProps.props?.events
        }
      }
    })

    this.validationMessage = {
      status: true,
      message: ''
    }

    GlobalEventBus.on('formChange', (args: InputName[]) => this.checkValidation(args))
  }

  override shouldDelegateEvent(): boolean {
    return true
  }

  override getDelegatedElement(): HTMLElement | null {
    return this.element?.querySelector('input') || null
  }

  handleBlur() {
    const currentValue = this.getValue() || ''
    this.validationMessage = inputValidation(this.props?.name as InputName, currentValue)
    this.updateValidation()
    this.removeHint()
  }

  handleFocus() {
    this.showHintIfNeeded()
  }

  handleInput() {
    this.showHintIfNeeded()
  }

  handleChange() {
    console.log('handleChange')
  }

  showHintIfNeeded() {
    if (this.props?.hideHint) {
      return
    }

    const hintContainer = this.element?.querySelector('.hint-container') as HTMLElement
    const value = this.getValue()?.trim()
    if (!hintContainer) return

    if (value) {
      this.addHint()
    } else {
      this.removeHint()
    }
  }

  addHint() {
    const hintContainer = this.element?.querySelector('.hint-container') as HTMLElement
    if (hintContainer) {
      hintContainer.style.display = 'block'
    }
  }

  removeHint() {
    const hintContainer = this.element?.querySelector('.hint-container') as HTMLElement
    if (hintContainer) {
      hintContainer.style.display = 'none'
    }
  }

  checkValidation(args: InputName[]) {
    if (args.includes(this.props?.name as InputName)) {
      const currentValue = this.getValue() || ''
      this.validationMessage = inputValidation(this.props?.name as InputName, currentValue)
      this.updateValidation()
    }
  }

  isValid(name: InputName) {
    const currentValue = this.getValue() || ''
    return !inputValidation(name, currentValue).status
  }

  updateValidation() {
    const inputContainerElement = this.element?.querySelector('.input-container') || null
    const messageContainer = this.element?.querySelector('.message-container')
    const isError = this.validationMessage.status

    if (messageContainer) {
      messageContainer.textContent = isError ? this.validationMessage.message : ''
    }

    if (isError) {
      inputContainerElement?.classList.add('error-input')
    } else {
      inputContainerElement?.classList.remove('error-input')
    }
  }

  getValue() {
    const inputElement = this.element?.querySelector('input')

    if (inputElement) {
      return inputElement.value
    } else {
      return null
    }
  }

  getFile() {
    const inputElement = this.element?.querySelector('input')

    if (inputElement && inputElement.files) {
      return inputElement.files[0]
    } else {
      return null
    }
  }

  override render() {
    const isDisabled = this.props?.disabled

    return `
      <div class='field-container'>
        <div class='hint-container'>{{labelText}}</div>
        <div class='input-container'>
          <label for='{{id}}'>{{labelText}}</label>
          <input
            type='{{type}}'
            value='{{value}}'
            id='{{id}}'
            class='{{class}}'
            name='{{name}}'
            placeholder='{{placeholder}}'
            ${isDisabled ? 'disabled' : ''}
          />
        </div>
        <div class='message-container'></div>
      </div>
    `
  }
}
