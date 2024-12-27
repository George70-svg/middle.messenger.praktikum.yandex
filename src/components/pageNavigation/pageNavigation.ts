import './pageNavigation.css'
import Block from '../../framework/block.ts'
import { Link } from '../link/link.ts'
import { changePage } from '../../utils/common.ts'

export class PageNavigation extends Block {
  constructor() {
    super({
      children: {
        LinkLogin: new Link({
          props: {
            text: 'Вход',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/loginPage',
              dataPage: 'loginPage'
            }
          }
        }),
        LinkRegistration: new Link({
          props: {
            text: 'Регистрация',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/registrationPage',
              dataPage: 'registrationPage'
            }
          }
        }),
        LinkProfileView: new Link({
          props: {
            text: 'Профиль (просмотр)',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/profileViewPage',
              dataPage: 'profileViewPage'
            }
          }
        }),
        LinkProfileEdit: new Link({
          props: {
            text: 'Профиль (редактирование)',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/profileEditPage',
              dataPage: 'profileEditPage'
            }
          }
        }),
        LinkProfilePassword: new Link({
          props: {
            text: 'Профиль (смена пароля)',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/profileEditPasswordPage',
              dataPage: 'profileEditPasswordPage'
            }
          }
        }),
        LinkMessenger: new Link({
          props: {
            text: 'Мессенджер',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/messengerPage',
              dataPage: 'messengerPage'
            }
          }
        }),
        Link404Page: new Link({
          props: {
            text: '404',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/page404',
              dataPage: 'page404'
            }
          }
        }),
        Link500Page: new Link({
          props: {
            text: '500',
            events: {
              click: (event) => changePage(event)
            },
            attr: {
              class: 'pageNavigation-link',
              href: '/page500',
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
