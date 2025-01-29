import Block, { BlockProps } from '../block.ts'

export type BlockClass = { new (props: BlockProps): Block }
