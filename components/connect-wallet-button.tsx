"use client"

import React from "react"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Loader2 } from "lucide-react"
import { useAccount } from "wagmi"

import { useIsMounted } from "@/lib/useIsMounted"

import { useConnectedWallet } from "./providers/providers"
import { Button } from "./ui/button"
import WalletsModal from "./wallets-modal"
import AptosaccountModal from "./wallets/aptos-account-modal"
import RainbowAccountModal from "./wallets/rainbow-account-modal"
import SolanaAccountModal from "./wallets/solana-account-modal"

const ConnectWalletButton = () => {
  const mounted = useIsMounted()

  const { isConnected: isRainbowConnected } = useAccount()
  const { connected: isSolanaConnected } = useWallet()
  const { connected: isAptosConnected } = useAptosWallet()

  const { connectedWallet, setConnectedWallet, setAddressChain } =
    useConnectedWallet()

  const isAnyWalletConncted =
    isRainbowConnected || isSolanaConnected || isAptosConnected

  if (isAnyWalletConncted) {
    if (isRainbowConnected && connectedWallet != "evm") {
      setConnectedWallet("evm")
    }
    if (isSolanaConnected && connectedWallet != "solana") {
      setConnectedWallet("solana")
    }
    if (isAptosConnected && connectedWallet != "aptos") {
      setConnectedWallet("aptos")
    }
  } else {
    setConnectedWallet(null)
  }

  if (!mounted && isAnyWalletConncted)
    return (
      <Button>
        <Loader2 className="mr-3 h-4 w-4 animate-spin" />
        <span>Loading</span>
      </Button>
    )

  return (
    <>
      {isAnyWalletConncted ? (
        <>
          {isRainbowConnected && <RainbowAccountModal />}
          {isSolanaConnected && <SolanaAccountModal />}
          {isAptosConnected && <AptosaccountModal />}
        </>
      ) : (
        <WalletsModal triggerClasses="mt-0 text-[10px] px-2 py-2 sm:px-4 md:text-sm w-full" />
      )}
    </>
  )
}

export default ConnectWalletButton
