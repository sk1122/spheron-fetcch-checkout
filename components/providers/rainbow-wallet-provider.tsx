"use client"

import React from "react"
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"

export default function RainbowProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { chains, publicClient } = configureChains(
    [mainnet],
    [alchemyProvider({ apiKey: (process.env.ALCHEMY_API_KEY as string) ?? "" })]
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
        modalSize="compact"
        theme={lightTheme({
          borderRadius: "small",
          fontStack: "system",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
