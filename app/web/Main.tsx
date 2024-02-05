import { useEffect, useState } from 'react'
import { EmptyAccount, isEmptyAccount } from '../model/account'
import { Account } from '@prisma/client'
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Section,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { ExitIcon, GitHubLogoIcon } from '@radix-ui/react-icons'

export const Main = () => {
  const [account, setAccount] = useState<Account | EmptyAccount | null>(null)

  useEffect(() => {
    fetch(`/account`)
      .then((res) => res.json() as Account)
      .then((res) => {
        setAccount(res)
      })
  }, [])

  return (
    <div>
      {(function () {
        if (account === null) {
          return null
        } else if (isEmptyAccount(account)) {
          return (
            <Button
              onClick={() => {
                location.href = '/login'
              }}
            >
              <GitHubLogoIcon /> Login with GitHub
            </Button>
          )
        } else {
          return (
            <Section>
              <Flex gap="3" align="center">
                <Avatar size="4" fallback="JS" radius="full" />
                <Text as="div">{account.name}</Text>
                <Tooltip content="Logout">
                  <IconButton
                    variant="ghost"
                    onClick={() => {
                      location.href = '/logout'
                    }}
                  >
                    <ExitIcon />
                  </IconButton>
                </Tooltip>
              </Flex>
            </Section>
          )
        }
      })()}
    </div>
  )
}
