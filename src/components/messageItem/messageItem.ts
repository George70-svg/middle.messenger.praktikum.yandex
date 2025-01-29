import './messageItem.scss'
import Block, { BlockProps } from '../../framework/block.ts'
import { withUser } from '../../store/utils.ts'
import { UserResponse } from '../../api/auth/type.ts'
import { formatTime } from '../../pages/messenger/utils.ts'

class MessageItem extends Block {
  constructor(blockProps: BlockProps) {
    const messageTime = blockProps.props?.time as string
    const formattedTime = messageTime ? formatTime(messageTime) : ''
    
    super({
      props: {
        ...blockProps.props,
        formattedTime
      }
    })
  }

  override render(): string {
    const isMyMessage = this.props?.user_id === (this.props?.user as UserResponse)?.id

    return `
      <article class='${isMyMessage ? 'me' : ''} message-item-container'>
        <p class='text'>{{text}}</p>
        <p class='time'>{{formattedTime}}</p>
      </article>
    `
  }
}

export default withUser(MessageItem)
