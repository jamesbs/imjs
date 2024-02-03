export type Account = {
  id: number
  name: string
}

export type EmptyAccount = {}

export const EMPTY_ACCOUNT: EmptyAccount = {}

export const isEmptyAccount = (data: any): data is EmptyAccount =>
  Object.keys(data).length === 0
