import { BlockchainIdentity } from './blockchain-identity'
import { PublicKey } from './public-key'

export type EvmAddressFormat = `0x${string}`

export type EvmIdentity = BlockchainIdentity & {
  identifier: PublicKey<EvmAddressFormat>
}
