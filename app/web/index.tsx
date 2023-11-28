import { render } from 'react-dom'
import { App } from './App'
import './.well-known/walletconnect.txt'

const root = document.querySelector('#root')

if (root) {
  render(<App />, root)
}
