import { PlainObject, StringIndexed, StringOrSymbolIndexed } from './types.ts'

// Метод сокращает текс до определённого количества символов
export const shortenText = (text: string, length: number) => {
  if (text.length >= length) {
    return `${text.substring(0, length)}...`
  } else {
    return text
  }
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

// Метод преобразует путь через '.' в объект. pathToObject('a.b.c.d.e') --> {a:{b:{c:{d:{e:{}}}}}}
export function pathToObject(path: string) {
  const propList = path.split('.')

  return propList.reduceRight((accumulator, currentValue) => {
    const innerObject: Record<string, unknown> = {}
    innerObject[currentValue] = accumulator
    return innerObject
  }, {})
}

// Метод преобразует путь через '.' в объект, где последний ключ будет иметь значение 'value'. pathToObject('a.b.c', 123) --> {a:{b:{c:123}}}
export function pathToObjectWithValue(path: string, value: unknown) {
  const propList = path.split('.')
  return propList.reduceRight((accumulator, currentValue) => ({ [currentValue]: accumulator }), value)
}

// Метод который проверяет является ли значение "пустым"
/* function isEmpty(value: unknown): boolean {
  if (value) {
    if (Array.isArray(value)) {
      return !value.length
    } else if (isObject(value)) {
      if (Array.from(value)) {
        return !!value.length
      }

      if (Object.keys(value)) {
        return !Object.keys(value).length
      }
    } else if (typeof value === 'string') {
      return false
    } else if (value.length) {
      return false
    } else {
      return !!value
    }
  } else {
    return true
  }
} */

// Метод убирает заданные (или пробельные) символы из начали или конца строки
export function trim(value: string, chars = ' ') {
  const createRegexp = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g')
  return value.replace(createRegexp, '')
}

// Метод объединяет два объекта с сохранением их уникальных ключей
export function merge(lhs: StringIndexed, rhs: StringIndexed): StringIndexed {
  if (!isObject(rhs) && !isObject(lhs)) {
    throw new Error('Is not an objects')
  } else if (isObject(rhs) && !isObject(lhs)) {
    return rhs
  } else if (!isObject(rhs) && isObject(lhs)) {
    return lhs
  }

  const target: Record<string, unknown> = {}

  for (const key in lhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      target[key] = merge(lhs[key] as StringIndexed, rhs[key] as StringIndexed)
    } else {
      target[key] = lhs[key]
    }
  }

  for (const key in rhs) {
    if (!Object.prototype.hasOwnProperty.call(lhs, key)) {
      target[key] = rhs[key]
    }
  }

  return target
}

// Метод устанавливает в переданный объект значение по переданному пути
export function set(object: StringIndexed | unknown, path: string, value: | unknown): StringIndexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  if (isObject(object)) {
    const objectByPath = pathToObjectWithValue(path, value)
    return merge(object, objectByPath as StringIndexed)
  } else {
    return object
  }
}

// Метод глубокого сравнения объектов (не учитывает Date, Map, Set, Symbol...)
export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (typeof lhs !== typeof rhs) {
    return false
  } else if (isObject(lhs) && isObject(rhs)) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false
    }

    for (const [key] of Object.entries(lhs)) {
      if (Object.prototype.hasOwnProperty.call(lhs, key) && Object.prototype.hasOwnProperty.call(lhs, key)) {
        if (!isEqual(lhs[key], rhs[key])) {
          return false
        }
      } else {
        return false
      }
    }
  } else if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false
    }

    for (const [index, value] of lhs.entries()) {
      if (!isEqual(value, rhs[index])) {
        return false
      }
    }
  } else {
    return lhs === rhs
  }

  return true
}

// Метод выполняет глубокое копирование значений
export function cloneDeep<T extends StringOrSymbolIndexed>(obj: T) {
  return (function _cloneDeep(item: any): any {
    // Обработка: null, undefined, boolean, number, string, symbol, function
    if (item === null || typeof item !== 'object') {
      return item
    }

    // Обработка: Date
    if (item instanceof Date) {
      return new Date((item as Date).valueOf())
    }

    // Обработка: Array
    if (item instanceof Array) {
      const copy: ReturnType<typeof _cloneDeep>[] = []

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])))

      return copy
    }

    // Обработка: Set
    if (item instanceof Set) {
      const copy = new Set()

      item.forEach((v) => copy.add(_cloneDeep(v)))

      return copy
    }

    // Обработка: Map
    if (item instanceof Map) {
      const copy = new Map()

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)))

      return copy
    }

    // Обработка: Object
    if (item instanceof Object) {
      const copy: StringOrSymbolIndexed = {}

      // Обработка: Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => (copy[s.toString()] = _cloneDeep(item[s.toString()])))

      // Обработка: Object.name (other)
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])))

      return copy
    }

    throw new Error(`Unable to copy object: ${item}`)
  }(obj))
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = []

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)))
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))])
    }
  }

  return result
}

// Метод для преобразования объекта в queryString для запроса
export function queryStringify(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object')
  }

  return getParams(data).map((arr) => arr.join('=')).join('&')
}
