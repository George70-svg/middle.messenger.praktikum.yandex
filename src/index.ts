import Handlebars from 'handlebars'
import * as Pages from './pages'
import { button } from './components/button/button.ts'
import { input } from './components/input/input.ts'
import { link } from './components/link/link.ts'
import { footer } from './components/footer/footer.ts'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('link', link)
Handlebars.registerPartial('footer', footer)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')

  const loginTemplate = Handlebars.compile(Pages.loginPage)
  const result = loginTemplate({})

  if (root) {
    root.innerHTML = result
  }
  
  function attachEventListeners (): void {
    const footerLinks = document.querySelectorAll('.footer-link')
    footerLinks.forEach(link => {
      console.log(link)
      link.addEventListener('click', (e) => {
        e.preventDefault()
      })
    })
  }
  
  attachEventListeners()
})
