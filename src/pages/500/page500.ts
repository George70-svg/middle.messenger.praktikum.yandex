import './page500.scss'
import Block from '../../framework/block.ts'

export class Page500 extends Block {
  constructor() {
    super({
      children: {}
    })
  }

  override render(): string {
    return `
      <main class='page-500'>
        <h1>500</h1>
        <h2>Мы уже фиксим</h2>
        <img src='images/corgi.png' class='image' alt='not found image :('>
      </main>
    `
  }
}
