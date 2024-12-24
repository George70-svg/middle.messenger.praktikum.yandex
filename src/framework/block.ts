import { v4 as makeUUID } from 'uuid'
import Handlebars from 'handlebars'
import { EventBus, EventCallback } from './eventBus.ts'

type PropsProps = { events?: Record<string, EventListenerOrEventListenerObject>, attr?: Record<string, string> } & Record<string, unknown>
type ChildrenProps = Record<string, Block>
type ListsProps = Record<string, unknown[]>

type ProxyProps = PropsProps | ListsProps

export type BlockProps = {
  props?: PropsProps
  children?: ChildrenProps
  lists?: ListsProps
}

export default class Block {
  EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  _element: HTMLElement | null = null

  _id: string = makeUUID()

  props?: PropsProps

  children?: ChildrenProps

  lists?: ListsProps

  eventBus: () => EventBus

  constructor(blockProps: BlockProps = { props: {}, children: {}, lists: {} }) {
    const eventBus = new EventBus()
    this.props = blockProps.props ? this._makePropsProxy(blockProps.props) : {}
    this.children = blockProps.children ? blockProps.children : {}
    this.lists = blockProps.lists ? this._makePropsProxy(blockProps.lists) : {}
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(this.EVENTS.INIT)
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(this.EVENTS.INIT, this.init.bind(this))
    eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback)
    eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  dispatchComponentDidMount(): void {
    this.eventBus().emit(this.EVENTS.FLOW_CDM)
  }

  componentDidMount(): void {
    //TODO [19.12.2024 @asiuraev] Реализовать метод монтирования компонент
    //console.log('componentDidMount', this)
  }

  isComponentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    //TODO [19.12.2024 @asiuraev] Реализовать метод глубокого сравнения props
    console.log('isComponentDidUpdate', oldProps, newProps, this)
    return true
  }

  init(): void {
    //console.log('_init')
    this.eventBus().emit(this.EVENTS.FLOW_RENDER)
  }

  _componentDidMount(): void {
    //console.log('_componentDidMount')
    this.componentDidMount()
    Object.values(this.children || {}).forEach((child) => {
      child.dispatchComponentDidMount()
    })
    this._render()
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    //console.log('_componentDidUpdate')
    const result = this.isComponentDidUpdate(oldProps, newProps)

    if (result) {
      this._render()
    }
  }

  _render(): void {
    console.log('_render')
    const templateData = { ...this.props } //Данные из props, которые будем добавлять в отрендеренный template
    const templateId = makeUUID()

    Object.entries(this.children || {}).forEach(([key, childrenElement]) => {
      templateData[key] = `<div data-id='${childrenElement._id}'></div>`
    })

    Object.entries(this.lists || {}).forEach(([key]) => {
      templateData[key] = `<div data-id='_list_${templateId}'></div>`
    })

    const fragment = this._createDocumentElement('template')
    fragment.innerHTML = Handlebars.compile(this.render())(templateData)

    Object.entries(this.children || {}).forEach(([, childrenElement]) => {
      const stub = fragment.content.querySelector(`[data-id='${childrenElement._id}']`)

      if (stub) {
        stub.replaceWith(childrenElement.getContent())
      }
    })
    
    Object.entries(this.lists || {}).forEach(([, listItem]) => {
      const listTemplate = this._createDocumentElement('template')

      listItem.forEach((item) => {
        if (item instanceof Block) {
          listTemplate.content.append(item.getContent())
        } else {
          listTemplate.content.append(`${item?.toString()}`)
        }
      })

      const stub = fragment.content.querySelector(`[data-id='_list_${templateId}']`)

      if (stub) {
        stub.replaceWith(listTemplate.content)
      }
    })

    const newElement = fragment.content.firstElementChild as HTMLDivElement
    //console.log('newElement', newElement)
    if (this._element && newElement) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement
    //console.log('this._element', this._element)
    this._addEvents()
    this.addAttributes()
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement
  }

  //Метод render будет возвращать более точный шаблон в наследуемых классах
  render(): string {
    console.log('render')
    return ''
  }

  getContent(): HTMLElement {
    if (this._element) {
      return this._element
    } else {
      throw new Error('Element is not created')
    }
  }

  _addEvents():void {
    const { events = {} } = this.props || {} //Props будут содержать отдельный подобъект для events
    //console.log('_addEvents', events)
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName])
      }
    })
  }

  addAttributes() :void {
    //console.log('addAttributes')
    const { attr = {} } = this.props || {} //Props будут содержать отдельный подобъект для атрибутов

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        if (typeof value === 'string') {
          this._element.setAttribute(key, value)
        }
      }
    })
  }

  setAttributes(attr: unknown): void {
    //console.log('setAttributes')
    Object.entries(attr || {}).forEach(([key, value]) => {
      if (this._element) {
        if (typeof value === 'string') {
          this._element.setAttribute(key, value)
        }
      }
    })
  }

  setProps(props: PropsProps): void {
    //console.log('setProps')
    if (props) {
      Object.assign(this.props || {}, props)
    }
  }

  setLists(list: ListsProps): void {
    //console.log('setLists')
    if (list) {
      Object.assign(this.lists || {}, list)
    }
  }

  get element(): HTMLElement | null {
    return this._element
  }

  _makePropsProxy<T extends ProxyProps>(props: T): T {
    //console.log('_makePropsProxy', props)
    const self = this

    const checkPrivateProp = (propName: string | symbol): boolean => {
      if (typeof propName === 'string') {
        return propName.startsWith('_')
      } else {
        return false
      }
    }

    return new Proxy(props, {
      get(target: T, propName: string | symbol) {
        if (checkPrivateProp(propName)) {
          throw new Error('Access denied')
        } else {
          const value = target[propName as keyof T]
          //При вызове через Proxy функция может потерять свой контекст выполнения, поэтому передача через bind гарантирует его сохранение
          return (typeof value === 'function') ? value.bind(target) as unknown as T[keyof T] : value
        }
      },
      set(target: T, propName: string, val: unknown) {
        if (checkPrivateProp(propName)) {
          throw new Error('Access denied')
        } else {
          const oldTarget = { ...target }
          target[propName] = val
          self.eventBus().emit(self.EVENTS.FLOW_CDU, oldTarget, target)
          return true
        }
      },
      deleteProperty(target: T, propName: string) {
        if (checkPrivateProp(propName)) {
          throw new Error('Access denied')
        } else {
          delete target[propName as keyof T]
          return true
        }
      }
    })
  }
}
