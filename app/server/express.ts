import express from 'express'
import passport from 'passport'
import { resolve } from 'path'
import { paths } from '../../env.ts'
import { authenticationRequired, setupAuth } from './auth.ts'

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
    .get('/logout', authenticationRequired, (request) => {
      request.logout({}, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
    .get('*', async (...[, response]) => {
      response.sendFile(resolve(paths.dist, 'index.html'))
    })
    .listen(port, () => {
      console.log(`server running on port ${port}`)
    })
}
