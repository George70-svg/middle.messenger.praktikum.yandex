import { PlainObject, StringIndexed } from './types.ts'

export function trimYandex(string: string, chars: string) {
  const str = ` ${string} `

  if (str && chars === undefined) {
    return string.trim()
  }

  if (!str || !chars) {
    return (string || '')
  }

  const regFirst = new RegExp(` ${chars}`, 'gi')
  const regSecond = new RegExp(`${chars} `, 'gi')

  return str
    .replace(regFirst, '')
    .replace(regSecond, '')
    .trim()
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

export function isEqualYandex(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqualYandex(value, rightValue)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

export function queryStringifyYandex(data: Record<string, any>): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const value = data[key]
    const endLine = index < keys.length - 1 ? '&' : ''

    if (isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (items, arrData, ind) => ({
          ...items,
          [`${key}[${ind}]`]: arrData
        }),
        {}
      )

      return `${result}${queryStringifyYandex(arrayValue)}${endLine}`
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {})
        .reduce<StringIndexed>(
          (items, objKey) => ({
            ...items,
            [`${key}[${objKey}]`]: value[objKey]
          }),
          {}
        )

      return `${result}${queryStringifyYandex(objValue)}${endLine}`
    }

    return `${result}${key}=${value}${endLine}`
  }, '')
}
