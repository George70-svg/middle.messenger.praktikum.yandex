import { Route } from './route.ts'
import { BlockClass } from './types.ts'
import { BlockProps } from './block.ts'

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

  use(pathname: string, block: BlockClass) {
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
  
  go(pathname: string, props?: BlockProps) {
    this.history?.pushState({}, '', pathname)
    this._onRoute(pathname, props)
  }

  _onRoute(pathname: string, props?: BlockProps) {
    const route = this.getRoute(pathname)
    if (!route) {
      if(this.getRoute('/404')) {
        this._onRoute('/404')
      }
      
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    route.render(props)
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}
