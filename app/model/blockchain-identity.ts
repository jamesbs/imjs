import { PublicKey } from './public-key'

export type BlockchainIdentity = {
  type: 'blockchain'
  identifier: PublicKey
}
