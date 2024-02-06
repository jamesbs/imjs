export type Account = {
  id: number
  name: string
  displayName?: string
  avatar?: string
}

export const getInitials = (
  { name, displayName }: Pick<Account, 'name' | 'displayName'>,
  maxLength = 2
) =>
  (displayName ?? name)
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, maxLength)
    .toUpperCase()
