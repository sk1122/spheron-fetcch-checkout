import { createPublicClient, http } from 'viem'
import { arbitrum, avalanche, bsc, mainnet, manta, optimism, polygon } from 'viem/chains'


function getChain(index: number) {
  switch (index) {
    case 0:
      return mainnet
    case 1:
      return polygon
    case 2:
      return bsc
    case 3:
      return avalanche
    case 4:
      return arbitrum
    case 5:
      return optimism
    default:
      return manta
  }

}

export default function getViemPublicClient(index: number) {
  const publicClient = createPublicClient({
    chain: getChain(index),
    transport: http()
  })
  return publicClient
}