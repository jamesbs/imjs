import { Id, Identifier } from './id'
import { EvmIdentity } from './evm-identity'
import { User } from './user'

export type Identity = Id<string> & {
  user: Identifier<User>
} & EvmIdentity
