import { useEffect, useState } from 'react'
import { isEmptyAccount } from '../model/account'

export const Main = () => {
  const [account, setAccount] = useState({})
  const isLoggedIn = !isEmptyAccount(account)

  useEffect(() => {
    fetch(`/account`)
      .then((res) => res.json())
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
