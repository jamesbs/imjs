import { test, expect, describe } from 'bun:test'
import { isEmptyAccount } from './account'

describe('isEmptyAccount', () => {
  test('{} is empty account', () => {
    expect(isEmptyAccount({})).toBe(true)
  })

  test(`{ id: 1, name: 'imjs' } is not empty account`, () => {
    expect(isEmptyAccount({ id: 1, name: 'imjs' })).toBe(false)
  })
})
