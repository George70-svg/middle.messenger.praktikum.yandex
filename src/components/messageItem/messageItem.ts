import './messageItem.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { withUser } from '../../store/utils.ts'
import { UserResponse } from '../../api/auth/type.ts'

class MessageItem extends Block {
  constructor(blockProps: BlockProps) {
    super({
      props: blockProps.props
    })
  }

  override render(): string {
    const isMyMessage = this.props?.user_id === (this.props?.user as UserResponse)?.id

    return `
      <article class='${isMyMessage ? 'me' : ''} message-item-container'>
        <p class='text'>{{text}}</p>
        <p class='time'>{{time}}</p>
      </article>
    `
  }
}

export default withUser(MessageItem)
