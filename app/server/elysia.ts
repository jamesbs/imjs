import { resolve } from 'path'
import { Elysia } from 'elysia'
import { trpc } from '@elysiajs/trpc'
import { staticPlugin } from '@elysiajs/static'

import { router } from './trpc.ts'
import { paths } from '../../env.ts'

const staticAssetsPath = paths.dist

export const serve = ({ port = 3000 }) => {
  new Elysia()
    .use(
      trpc(router, {
        endpoint: '/api',
      })
    )
    .get('/', () => Bun.file(resolve(paths.dist, 'index.html')))
    .use(
      staticPlugin({
        prefix: '/',
        assets: staticAssetsPath,
      })
    )
    .listen(port, (server) => {
      console.log(`server running on port ${server.port}`)
    })
}
