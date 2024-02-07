import { createRoot } from 'react-dom/client'
import { App } from './_app'

const root = document.querySelector('#root')

if (root) {
  createRoot(root).render(<App />)
}
