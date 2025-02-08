import { beforeEach, describe, expect, it, vi } from 'vitest'
import Block from './block.ts'

describe('Block', () => {
  class Component extends Block {}
  let component: Component

  beforeEach(() => {
    component = new Component()
  })

  it('should set props', () => {
    component.setProps({ text: 'Привет', time: '2025-02-07T19:43:26+00:00', user_id: 3180 })
    expect(component.props).toEqual({ text: 'Привет', time: '2025-02-07T19:43:26+00:00', user_id: 3180 })
  })

  it('should not call setProps on render', () => {
    const setProps = vi.spyOn(component, 'setProps')
    component.render()
    expect(setProps).not.toHaveBeenCalled()
  })
})
