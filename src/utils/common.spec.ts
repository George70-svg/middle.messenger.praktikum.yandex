import { describe, expect, it } from 'vitest'
import { queryStringify } from './common.ts'

describe('Utility queryStringify', () => {
  it('should stringify simple data to query string', () => {
    expect(queryStringify({ a: 1, b: 2 })).to.equal('?a=1&b=2')
  })

  it('should stringify data with deep array to query string', () => {
    expect(queryStringify({ a: 1, b: [1, 'name', ['a', 'b', 'c']] })).to.equal('?a=1&b[0]=1&b[1]=name&b[2][0]=a&b[2][1]=b&b[2][2]=c1')
  })
})
