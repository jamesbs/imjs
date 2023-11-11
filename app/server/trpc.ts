import { initTRPC } from '@trpc/server'
import { getAliasByIdInput } from '../model/generated/alias.ts'

const trpc = initTRPC.create()

export const procedure = trpc.procedure

export const router = trpc.router({
  users: procedure.query(async () => {
    return [{ id: 'qq', name: 'Serena' }]
  }),
  ['get-alias-by-id']: procedure.input(getAliasByIdInput).query(async () => {
    return 'nothing'
  }),
})
