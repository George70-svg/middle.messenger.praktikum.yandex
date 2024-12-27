import './page404.scss'
import Block from '../../framework/block.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'

export class Page404 extends Block {
  constructor() {
    super({
      children: {
        PageNavigation: new PageNavigation()
      }
    })
  }

  override render(): string {
    return `
      <main class='page-404'>
        <h1>404</h1>
        <h2>Не туда попали</h2>
        <img src='images/corgi.png' class='image' alt='not found image :('>
        {{{ PageNavigation }}}
      </main>
    `
  }
}
