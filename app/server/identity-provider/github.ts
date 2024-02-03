import { Strategy as GithubStrategy } from 'passport-github2'
import { VerifyCallback } from 'passport-oauth2'
import { Id, Identifier } from '../../model/id'

export type GithubUser = Id<string> & {
  provider: 'github'
}

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
  },
  (accessToken: string, _: string, user: GithubUser, done: VerifyCallback) => {
    return done(null, user)
  }
)

export const githubMatcher = (user: GithubUser) => ({
  type: 'github',
  identifier: user.id,
})
