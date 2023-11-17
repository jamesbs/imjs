import { useAccount } from 'wagmi'

export const Main = () => {
  const { address, isConnected } = useAccount()

  return isConnected ? <div>Connected with: {address}</div> : null
}
