import { Id } from './id'

export type Alias = Id<number> & {
  email: string
}
