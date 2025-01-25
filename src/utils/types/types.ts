export type StringIndexed<T = unknown> = {
  [key: string]: T
}

export type StringOrSymbolIndexed<T = any> = {
  [k in (string | symbol)]: T
}

export type PlainObject<T = any> = {
  [k in string]: T
}
