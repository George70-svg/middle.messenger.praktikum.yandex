import './input.css'
import Block, { BlockProps } from '../../framework/block.ts'

export class Input extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render() {
    const isDisabled = this.props?.disabled

    return `
      <div class='field-container'>
        <label for='{{id}}'>{{labelText}}</label>
        <input
          type='{{type}}'
          id='{{id}}'
          class='{{class}}'
          name='{{name}}'
          placeholder='{{placeholder}}'
          ${isDisabled ? 'disabled' : ''}
        />
      </div>
    `
  }
}
