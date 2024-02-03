import { Express, RequestHandler } from 'express'
import expressSession from 'express-session'
import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import { VerifyCallback } from 'passport-oauth2'
import { PrismaSessionStore } from './prisma-session-store'
import { prismaClient } from './prisma'

export type GithubUser = {
  id: number
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

export const setupAuth = (app: Express) => {
  app.use(passport.initialize())

  passport.serializeUser((user: any, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })

  passport.use(githubStrategy)

  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore({
        client: prismaClient,
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === 'production',
      },
    })
  )
  app.use(passport.session())
}

export const authenticationRequired: RequestHandler = (
  request,
  response,
  next
) => (request.isAuthenticated() ? next() : response.redirect('/'))
