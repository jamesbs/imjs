import { useEffect, useState } from 'react'
import { EMPTY_ACCOUNT, isEmptyAccount } from '../model/account'
import { Account } from '@prisma/client'

export const Main = () => {
  const [account, setAccount] = useState(EMPTY_ACCOUNT)
  const isLoggedIn = !isEmptyAccount(account)

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
      {isLoggedIn ? (
        <button
          onClick={() => {
            location.href = '/logout'
          }}
        >
          logout
        </button>
      ) : (
        <button
          onClick={() => {
            location.href = '/login'
          }}
        >
          login
        </button>
      )}
    </div>
  )
}
