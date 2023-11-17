import { WagmiConfig, createConfig } from 'wagmi'
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from 'connectkit'
import { Main } from './Main'

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_KEY!,
    // Required
    appName: 'imjs',
    // Optional
    appDescription: 'personal app',
    appUrl: process.env.APP_URL, // your app's url
    appIcon: process.env.APP_URL + 'imjs-logo.png', // your app's icon, no bigge1313r than 1024x1024px (max. 1MB)
  })
)
export const App = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <h1>App goes here</h1>
        <Main />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
