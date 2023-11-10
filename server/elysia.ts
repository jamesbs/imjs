import { Elysia, t } from 'elysia'
import { trpc } from '@elysiajs/trpc'
import { router } from './trpc'

export const serve = ({ port = 8080 }) => {
  const server = new Elysia()
    .use(
      trpc(router, {
        endpoint: '/api',
      })
    )
    .get('/', () => 'hello')
    .listen(port, (server) => {
      console.log(`server running on port ${server.port}`)
    })
}
