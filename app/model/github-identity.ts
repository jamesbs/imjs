import { GithubUser } from '../server/identity-provider/github'
import { Identifier } from './id'

export type GithubIdentity = {
  type: 'github'
  identifier: Identifier<GithubUser>
}
