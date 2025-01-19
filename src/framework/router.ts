import { Route } from './route.ts'
import Block from './block.ts'

export class Router {
  static __instance: Router

  routes: Array<Route> = []

  history: History | null = null

  _currentRoute: Route | null = null

  _rootQuery: string = ''

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: Event) => {
      const target = event.target as Window
      this._onRoute(target.location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    console.log('_onRoute')
    const route = this.getRoute(pathname)
    console.log('route', route)
    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    route.render()
  }

  go(pathname: string) {
    this.history?.pushState({ pathname }, pathname, pathname)
    this._onRoute(pathname)
    console.log('history', this.history)
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}
