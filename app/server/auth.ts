import { Express, RequestHandler } from 'express'
import expressSession from 'express-session'
import passport from 'passport'
import { PrismaSessionStore } from './prisma-session-store'
import { prismaClient } from './prisma'
import { Id, Identifier } from '../model/id'
import {
  GithubUser,
  githubMatcher,
  githubStrategy,
} from './identity-provider/github'

export type PassportSessionData = {
  passport: {
    user: Identifier<GithubUser>
  }
}

export const setupAuth = (app: Express) => {
  passport.serializeUser(async (user: any, done) => {
    const account = await prismaClient.account.findFirst({
      where: {
        identities: {
          some: githubMatcher(user),
        },
      },
    })
    done(null, account?.id)
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

  app.use(passport.initialize())
  app.use(passport.session())
}

export const authenticationRequired: RequestHandler = (
  request,
  response,
  next
) => (request.isAuthenticated() ? next() : response.redirect('/'))
