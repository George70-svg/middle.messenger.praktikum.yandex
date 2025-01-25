import Block, { BlockProps } from '../framework/block.ts'
import store, { StoreEvents } from './store.ts'
import { Indexed } from './types/types.ts'
import { isEqual } from '../utils/common.ts'

function connect(mapStateToProps: (state: Indexed<unknown>) => Indexed<unknown>) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(blockProps: BlockProps) {
        let state = mapStateToProps(store.getState())

        super({ ...blockProps, ...state })

        store.on(StoreEvents.Update, () => {
          const newState = mapStateToProps(store.getState())
          if (!isEqual(state, newState)) {
            this.setProps({ ...mapStateToProps(store.getState()) })
            console.log('StoreEvents.Update', this)
          }

          state = newState
        })
      }
    }
  }
}

export const withUser = connect((state: Indexed<unknown>) => ({ user: state.user }))
export const withChats = connect((state: Indexed<unknown>) => ({ chats: state.chats }))
