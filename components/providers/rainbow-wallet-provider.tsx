"use client"

import React from "react"
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { arbitrum, avalanche, mainnet, optimism, polygon } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

export default function RainbowProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { chains, publicClient } = configureChains(
    // @ts-ignore
    [mainnet, polygon, arbitrum, optimism, avalanche],
    [jsonRpcProvider({
      rpc: (chain: any) => ({
        http: `https://rpc.ankr.com/${chain.name}`
      })
    })],
    [alchemyProvider({ apiKey: (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string) ?? "" })]
  )

  const { connectors } = getDefaultWallets({
    appName: "Fetcch Request",
    projectId: "YOUR_PROJECT_ID",
    chains,
  })

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  })

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        modalSize="wide"
        theme={lightTheme({
          borderRadius: "small",
          fontStack: "system"
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
