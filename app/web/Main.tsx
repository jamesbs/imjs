import { FC } from 'react'
import { Account } from '@prisma/client'
import { Button } from '@radix-ui/themes'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { ValueUnknown, isValueKnown } from '../model/value-unknown'

export type MainProps = {
  account: Account | null | ValueUnknown
}

export const Main: FC<MainProps> = ({ account }) => {
  return (
    <div>
      {!account && (
        <Button
          onClick={() => {
            location.href = '/login'
          }}
        >
          <GitHubLogoIcon /> Login with GitHub
        </Button>
      )}
    </div>
  )
}
