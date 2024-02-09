import { Container, Theme } from '@radix-ui/themes'
import { Main } from './main'
import { Nav } from './nav'

import '@radix-ui/themes/styles.css'
import { useEffect, useState } from 'react'
import { Account } from '../model/account'
import { ValueUnknown, isValueKnown } from '../model/value-unknown'
import { container } from './container'

export const App = () => {
  const [account, setAccount] = useState<Account | null | ValueUnknown>(
    ValueUnknown
  )

  useEffect(() => {
    if (!isValueKnown(account)) {
      const getAccount = container.resolve('getAccount')
      getAccount().then(setAccount)
    }
  }, [])

  return (
    <Theme>
      <Container></Container>
      <Nav account={account}></Nav>
      <Main account={account} />
    </Theme>
  )
}
