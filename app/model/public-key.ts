import { Brand } from 'utility-types'

export type PublicKey<T extends string = string> = Brand<T, 'PublicKey'>
