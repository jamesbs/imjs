import { asValue, createContainer } from 'awilix'
import { getAccount$ } from './account'

export const container = createContainer({
  strict: true,
})

container.register({
  getAccount: asValue(getAccount$),
})
