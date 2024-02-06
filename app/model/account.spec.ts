import { test, expect, describe } from 'bun:test'
import { getInitials } from './account'

describe('getInitials', () => {
  test(`prefers displayName over name`, () => {
    expect(
      getInitials({ name: 'pmarca', displayName: 'Marc Andreessen' })
    ).toBe('MA')
  })

  test(`returns a single letter for names not separated by spaces, capitalizes letters`, () => {
    expect(getInitials({ name: 'xQc' })).toBe('X')
  })

  test(`returns multiple letters when names are separated by spaces, maxLength is 2 when not provided`, () => {
    expect(getInitials({ name: 'Mary Elizabeth Winstead' })).toBe('ME')
  })

  test(`returns multiple letters when names are separated by spaces, provides letters until maxLength when provided`, () => {
    expect(getInitials({ name: 'Mary Elizabeth Winstead' }, 3)).toBe('MEW')
  })
})
