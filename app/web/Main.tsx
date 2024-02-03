import { useEffect, useState } from 'react'
import { EMPTY_ACCOUNT, EmptyAccount, isEmptyAccount } from '../model/account'
import { Account } from '@prisma/client'

export const Main = () => {
  const [account, setAccount] = useState<Account | EmptyAccount | null>(null)

  useEffect(() => {
    fetch(`/account`)
      .then((res) => res.json() as Account)
      .catch((err) => {
        setAccount(EMPTY_ACCOUNT)
      })
      .then((res) => {
        if (!isEmptyAccount(res)) {
          setAccount(res)
        }
      })
  }, [])

  return (
    <div>
      this is the main component
      {(function () {
        if (account === null) {
          return null
        } else if (isEmptyAccount(account)) {
          return (
            <button
              onClick={() => {
                location.href = '/login'
              }}
            >
              login
            </button>
          )
        } else {
          return (
            <button
              onClick={() => {
                location.href = '/logout'
              }}
            >
              logout
            </button>
          )
        }
      })()}
    </div>
  )
}
