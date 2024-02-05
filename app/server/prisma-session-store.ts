import { PrismaClient } from '@prisma/client'
import { SessionData, Store } from 'express-session'

export type PrismaSessionStoreConfig = {
  client: PrismaClient
}

export type PassportSessionData = {
  passport: {
    user: number
  }
}

export class PrismaSessionStore extends Store {
  client: PrismaClient

  constructor({ client }: PrismaSessionStoreConfig) {
    super()
    this.client = client
  }

  get(sid: string, callback) {
    ;(async () => {
      try {
        const result = await this.client.session.findFirst({
          where: {
            sid,
          },
        })

        callback(
          null,
          result && {
            sid: result.sid,
            passport: {
              user: result.accountId,
            },
            ...JSON.parse(result.data),
          }
        )
      } catch (err) {
        callback(err, null)
      }
    })()
  }

  set(sid: string, session: SessionData & PassportSessionData, callback) {
    const data = JSON.stringify(session)

    const expiresAt =
      session.cookie.expires?.getTime() ??
      new Date().getTime() + (session.cookie.maxAge ?? 60) * 1000

    ;(async () => {
      try {
        const account = await this.client.account.findFirst({
          where: {
            id: session.passport.user,
          },
        })

        await this.client.session.upsert({
          where: {
            sid,
          },
          update: {
            data,
            expiresAt: new Date(expiresAt),
          },
          create: {
            sid,
            accountId: account.id,
            expiresAt: new Date(expiresAt),
            data,
          },
        })
        callback(null)
      } catch (err) {
        callback(err)
      }
    })()
  }

  destroy(sid: string | string[], callback) {
    ;(async () => {
      try {
        await this.client.session.deleteMany({
          where: {
            sid: {
              in: Array.isArray(sid) ? sid : [sid],
            },
          },
        })
        callback(null)
      } catch (err) {
        callback(err)
      }
    })()
  }

  touch(sid: string, session: SessionData, callback) {
    const expiresAt =
      session.cookie.expires?.getTime() ??
      new Date().getTime() + (session.cookie.maxAge ?? 60) * 1000

    ;(async () => {
      try {
        await this.client.session.update({
          where: {
            sid,
          },
          data: {
            expiresAt: new Date(expiresAt),
          },
        })
        callback(null)
      } catch (err) {
        callback(err)
      }
    })()
  }
}
