import { Container, Theme } from '@radix-ui/themes'
import { Main } from './Main'
import { Nav } from './Nav'

import '@radix-ui/themes/styles.css'
import { useEffect, useState } from 'react'
import { Account } from '../model/account'
import { ValueUnknown } from '../model/value-unknown'

export const App = () => {
  const [account, setAccount] = useState<Account | null | ValueUnknown>(
    ValueUnknown
  )

  useEffect(() => {
    fetch(`/account`)
      .then((res) => res.json())
      .then((res: Account | null) => {
        setAccount(res)
      })
  }, [])

  return (
    <Theme>
      <Container></Container>
      <Nav account={account}></Nav>
      <Main account={account} />
    </Theme>
  )
}
