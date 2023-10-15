"use client"

import React, { createContext, useContext, useState } from "react"

import AptosProvider from "./aptos-provider"
import RainbowProvider from "./rainbow-wallet-provider"
import SolanaProvider from "./solana-provider"

export type WALLET = "evm" | "solana" | "aptos" | null

type WalletContextTypes = {
  connectedWallet: WALLET
  setConnectedWallet: React.Dispatch<React.SetStateAction<WALLET>>
  addressChain: WALLET
  setAddressChain: React.Dispatch<React.SetStateAction<WALLET>>
}

const WalletContext = createContext<WalletContextTypes | null>(null)

export const useConnectedWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useConnectedWallet must be used within the wallet context")
  }
  return context
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [connectedWallet, setConnectedWallet] = useState<WALLET | null>(null)
  const [addressChain, setAddressChain] = useState<WALLET | null>(null)

  return (
    <WalletContext.Provider
      value={{
        connectedWallet,
        setConnectedWallet,
        addressChain,
        setAddressChain,
      }}
    >
      <RainbowProvider>
        <SolanaProvider>
          <AptosProvider>{children}</AptosProvider>
        </SolanaProvider>
      </RainbowProvider>
    </WalletContext.Provider>
  )
}
