import { Elysia, t } from 'elysia'

export const serve = ({ port = 8080 }) => {
  const server = new Elysia()
    .get('/', () => 'hello')
    .listen(port, (server) => {
      console.log(`server running on port ${server.port}`)
    })
}
