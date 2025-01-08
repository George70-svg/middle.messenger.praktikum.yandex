import './button.scss'
import Block, { BlockProps } from '../../framework/block.ts'

export class Button extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render(): string {
    return `
      <button class='{{class}}'>
        {{text}}
      </button>
    `
  }
}
