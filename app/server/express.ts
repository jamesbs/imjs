import express from 'express'
import passport from 'passport'
import { resolve } from 'path'
import { paths } from '../../env.ts'
import { authenticationRequired, setupAuth } from './auth.ts'
import { prismaClient } from './prisma.ts'
import { EMPTY_ACCOUNT } from '../model/account.ts'

export const serve = async ({ port = 3000 }) => {
  const app = express()

  app.use(express.static(paths.dist))
  setupAuth(app)

  app
    .get('/login', passport.authenticate('github', { scope: ['user:email'] }))
    .get(
      '/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      (...[, response]) => {
        response.redirect('/')
      }
    )
    .get('/logout', authenticationRequired, (request, response) => {
      request.logout({}, (err) => {
        if (err) {
          console.log(err)
        }
        response.redirect('/')
      })
    })
    .get('/account', async (request, response) => {
      if (!request.isAuthenticated()) {
        response.status(401).send(EMPTY_ACCOUNT)
      } else {
        try {
          const account = await prismaClient.account.findFirstOrThrow({
            where: {
              id: request.user,
            },
          })

          response.send(account)
        } catch (err: any) {
          response
            .status(500)
            .send(
              err?.message ??
                'An error has occurred while trying to get account information'
            )
        }
      }
    })
    .get('*', async (...[, response]) => {
      response.sendFile(resolve(paths.dist, 'index.html'))
    })
    .listen(port, () => {
      console.log(`server running on port ${port}`)
    })
}
