import { Account } from '@prisma/client'
import {
  Avatar,
  Flex,
  IconButton,
  Section,
  Text,
  Tooltip,
} from '@radix-ui/themes'
import { FC } from 'react'
import { ExitIcon } from '@radix-ui/react-icons'
import { ValueUnknown, isValueUnknown } from '../model/value-unknown'
import { getInitials } from '../model/account'

export type NavProps = {
  account: Account | null | ValueUnknown
}

export const Nav: FC<NavProps> = ({ account }) => {
  return (
    <nav>
      <Flex>
        <Text>imjs</Text>
        <Section>
          <Flex gap="3" align="center">
            {account && !isValueUnknown(account) && (
              <>
                <Avatar
                  size="4"
                  fallback={getInitials(account)}
                  radius="full"
                  src={account.avatar}
                />
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
              </>
            )}
          </Flex>
        </Section>
      </Flex>
    </nav>
  )
}
