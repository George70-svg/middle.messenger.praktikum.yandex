import './pageNavigation.scss'
import Block from '../../framework/block.ts'
import { Link } from '../link/link.ts'
import { goToPath } from '../../framework/common.ts'

export class PageNavigation extends Block {
  constructor() {
    super({
      children: {
        LinkLogin: new Link({
          props: {
            content: 'Вход',
            events: {
              click: () => goToPath('/')
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/',
              dataPage: 'loginPage'
            }
          }
        }),
        LinkRegistration: new Link({
          props: {
            content: 'Регистрация',
            events: {
              click: () => goToPath('/sign-up')
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/sign-up',
              dataPage: 'registrationPage'
            }
          }
        }),
        LinkProfileView: new Link({
          props: {
            content: 'Профиль (просмотр)',
            events: {
              click: () => goToPath('/settings', { props: { mode: 'view' } })
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/settings',
              dataPage: 'profileViewPage'
            }
          }
        }),
        LinkProfileEdit: new Link({
          props: {
            content: 'Профиль (редактирование)',
            events: {
              click: () => goToPath('/settings', { props: { mode: 'edit' } })
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/settings',
              dataPage: 'profileEditPage'
            }
          }
        }),
        LinkProfilePassword: new Link({
          props: {
            content: 'Профиль (смена пароля)',
            events: {
              click: () => goToPath('/settings', { props: { mode: 'password' } })
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/settings',
              dataPage: 'profileEditPasswordPage'
            }
          }
        }),
        LinkMessenger: new Link({
          props: {
            content: 'Мессенджер',
            events: {
              click: () => goToPath('/messenger')
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/messenger',
              dataPage: 'messengerPage'
            }
          }
        }),
        Link404Page: new Link({
          props: {
            content: '404',
            events: {
              click: () => goToPath('/404')
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/404',
              dataPage: 'page404'
            }
          }
        }),
        Link500Page: new Link({
          props: {
            content: '500',
            events: {
              click: () => goToPath('/500')
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/500',
              dataPage: 'page500'
            }
          }
        })
      }
    })
  }

  override render(): string {
    return `
      <nav class='pageNavigation'>
        {{{ LinkLogin }}}
        {{{ LinkRegistration }}}
        {{{ LinkProfileView }}}
        {{{ LinkProfileEdit }}}
        {{{ LinkProfilePassword }}}
        {{{ LinkMessenger }}}
        {{{ Link404Page }}}
        {{{ Link500Page }}}
      </nav>
    `
  }
}
