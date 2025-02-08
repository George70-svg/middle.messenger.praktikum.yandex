import { beforeEach, describe, expect, it } from 'vitest'
import { Router } from './router.ts'
import Block from './block.ts'

describe('Router', () => {
  let router: Router

  beforeEach(() => {
    router = new Router('root')
    class DefaultPageStub extends Block {}
    class SignInPageStub extends Block {}
    class MessengerPageStub extends Block {}

    router
      .use('/', DefaultPageStub)
      .use('/sign-in', SignInPageStub)
      .use('/messenger', MessengerPageStub)
  })

  it('should go through the pages and change the history value', () => {
    router.go('/sign-in')
    router.go('/')
    router.go('/messenger')

    expect(window.history.length).to.equal(4)
  })

  it('should go to the selected page ', () => {
    router.go('/messenger')
    expect(window.location.pathname).to.equal('/messenger')
  })
})
