import { Account, GetAccountUrl } from '../model/account'

export type GetAccount = () => Promise<Account | null>

export const getAccount$: GetAccount = async () =>
  (await fetch(GetAccountUrl)).json()
