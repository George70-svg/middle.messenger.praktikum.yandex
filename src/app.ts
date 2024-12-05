import Handlebars from 'handlebars'
import Pages from './pages'
import { isPageType, PageType } from './pages/types.ts'
import { button } from './components/button/button.ts'
import { input } from './components/input/input.ts'
import { link } from './components/link/link.ts'
import { footer } from './components/footer/footer.ts'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('link', link)
Handlebars.registerPartial('footer', footer)

export default class App {
  private state: { currentPage: PageType }
  private readonly appElement: HTMLElement | null
  
  constructor() {
    this.state = { currentPage: 'loginPage' }
    this.appElement = document.getElementById('root')
  }
  
  render() {
    if(this.state.currentPage && this.appElement) {
      const currentPage = this.state.currentPage
      const template = Handlebars.compile(Pages[currentPage])
      this.appElement.innerHTML = template({})
    }
    
    this.attachEventListeners()
  }
  
  attachEventListeners() {
    const footerLinks = document.querySelectorAll('.footer-link')
    footerLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        const target = event.target
        
        if (target instanceof HTMLElement && isPageType(target.dataset.page)) {
          this.changePage(target.dataset.page)
        }
      })
    })
  }
  
  changePage(page: PageType | undefined) {
    this.state.currentPage = page ?? 'page404'
    this.render()
  }
}
