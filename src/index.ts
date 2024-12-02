import Handlebars from 'handlebars'
import button from './components/button.tmpl'
import {loginPage} from './pages/loginPage/loginPage.ts'

Handlebars.registerPartial('button', button)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  
  const loginTemplate = Handlebars.compile(loginPage)
  const result = loginTemplate({})

  if (root) {
    root.innerHTML = result
  }
})
