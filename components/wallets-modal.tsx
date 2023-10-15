"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useWallet } from "@solana/wallet-adapter-react"
import { Loader2, X } from "lucide-react"
import { useAccount } from "wagmi"

import { useIsMounted } from "@/lib/useIsMounted"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useConnectedWallet } from "./providers/providers"
import { Button, buttonVariants } from "./ui/button"
import AptosConnectButton from "./wallets/aptos-connect-btn"
import RainbowConnectButton from "./wallets/rainbow-connect-btn"
import SolanaConnectBtutton from "./wallets/solana-connect-btn"

const WalletsModal = ({ triggerClasses }: { triggerClasses?: string }) => {
  const [isWalletsModalOpen, setIsWalletsModalOpen] = useState(false)
  const mounted = useIsMounted()

  const { isConnected: isRainbowConnected, address } = useAccount()
  const { connected: isSolanaConnected, publicKey } = useWallet()
  const { connected: isAptosConnected, account } = useAptosWallet()

  const { connectedWallet, setConnectedWallet } = useConnectedWallet()

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

  // console.log("Wallet -> ", connectedWallet)
  // console.log("🦊 ", address)
  // console.log("🟣 ", publicKey?.toBase58())
  // console.log("⚪ ", account?.address)

  if (!mounted)
    return (
      <Button className={cn("mt-12 text-lg", triggerClasses)}>
        <Loader2 className="mr-3 h-4 w-4 animate-spin" />
        <span>Loading</span>
      </Button>
    )

  return (
    <>
      {isAnyWalletConncted ? (
        <Link
          href="/requests"
          className={cn(buttonVariants(), "mt-12 text-lg", triggerClasses)}
        >
          Get Started
        </Link>
      ) : (
        <Dialog open={isWalletsModalOpen} onOpenChange={setIsWalletsModalOpen}>
          <DialogTrigger asChild>
            <Button className={cn("mt-12 text-lg", triggerClasses)}>
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full p-9 sm:max-w-xl md:max-w-[874px]">
            <DialogHeader className="w-full flex-row items-center justify-between">
              <DialogTitle className="font-manrope text-3xl font-bold">
                Connect Wallet
              </DialogTitle>
              <DialogClose
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <RainbowConnectButton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              />
              <SolanaConnectBtutton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              />
              <AptosConnectButton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default WalletsModal
