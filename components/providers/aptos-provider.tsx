"use client"

import type { FC, ReactNode } from "react"
import {
  AptosWalletAdapterProvider,
  type Wallet,
} from "@aptos-labs/wallet-adapter-react"
import { PetraWallet } from "petra-plugin-wallet-adapter"

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallets: Wallet[] = [new PetraWallet()]

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      onError={(error) => {
        console.log("Custom error handling", error)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  )
}

const AptosProvider = ({ children }: { children: ReactNode }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>
}

export default AptosProvider
