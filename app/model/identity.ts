import { Id, Identifier } from './id'
import { BlockchainIdentity } from './blockchain-identity'
import { User } from './user'

export type Identity = Id<number> & {
  user: Identifier<User>
} & BlockchainIdentity
