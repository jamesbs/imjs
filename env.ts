import path from 'path'
import { fileURLToPath } from 'url'

export const getCurrentPath = ({ url }: ImportMeta) =>
  fileURLToPath(new URL('.', url))

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const paths = {
  dist: path.resolve(__dirname, 'dist'),
  web: path.resolve(__dirname, 'app/web'),
}
