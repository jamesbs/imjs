import { Container, Theme } from '@radix-ui/themes'
import { Main } from './Main'

import '@radix-ui/themes/styles.css'

export const App = () => {
  return (
    <Theme>
      <Container>
        <h1>imjs</h1>
        <Main />
      </Container>
    </Theme>
  )
}
