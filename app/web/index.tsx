import { render } from 'preact'

const root = document.querySelector('#root')

if (root) {
  render(<h1>hello</h1>, root)
}
