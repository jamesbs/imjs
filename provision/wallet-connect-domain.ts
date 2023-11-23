import { exists, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'path'
import { paths } from '../env.ts'

export const provision = async () => {
  const wellKnownPath = resolve(paths.dist, '.well-known')

  if (!(await exists(wellKnownPath))) {
    await mkdir(wellKnownPath)
  }

  await writeFile(
    resolve(wellKnownPath, 'walletconnect.txt'),
    process.env.WALLET_CONNECT_DOMAIN_VERIFICATION
  )
}
