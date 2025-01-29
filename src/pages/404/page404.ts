import './page404.scss'
import Block from '../../framework/block.ts'

export class Page404 extends Block {
  constructor() {
    super({
      children: {}
    })
  }

  override render(): string {
    return `
      <main class='page-404'>
        <h1>404</h1>
        <h2>Не туда попали</h2>
        <img src='images/corgi.png' class='image' alt='not found image :('>
      </main>
    `
  }
}
