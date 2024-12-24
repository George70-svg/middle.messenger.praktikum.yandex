import './page500.css'
import Block from '../../framework/block.ts'
import { PageNavigation } from '../../components/pageNavigation/pageNavigation.ts'

export class Page500 extends Block {
  constructor() {
    super({
      children: {
        PageNavigation: new PageNavigation()
      }
    })
  }

  override render(): string {
    return `
      <main class='page-500'>
        <h1>500</h1>
        <h2>Мы уже фиксим</h2>
        <img src='images/corgi.png' class='image' alt='not found image :('>
        {{{ PageNavigation }}}
      </main>
    `
  }
}
