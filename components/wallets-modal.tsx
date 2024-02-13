"use client"

import React, { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useWallet } from "@solana/wallet-adapter-react"
import { encode } from "bs58"
import { Loader2, X } from "lucide-react"
import { useAccount, useSignMessage } from "wagmi"

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

  const { push } = useRouter()

  const { isConnected: isRainbowConnected, address } = useAccount()
  const {
    connected: isSolanaConnected,
    publicKey,
    signMessage: signMessageSolana,
  } = useWallet()
  const {
    connected: isAptosConnected,
    account,
    signMessage: signAptosMessage,
  } = useAptosWallet()

  const { signMessageAsync } = useSignMessage()

  const { connectedWallet, setConnectedWallet, setToken } = useConnectedWallet()
  const [connectedWalletAddress, setConnectedWalletAddress] =
    useState<string>("")
  const [loading, setLoading] = useState(false)

  const isAnyWalletConncted =
    isRainbowConnected || isSolanaConnected || isAptosConnected

  useEffect(() => {
    if (isAnyWalletConncted) {
      if (isRainbowConnected && connectedWallet != "evm") {
        setConnectedWallet("evm")
        setConnectedWalletAddress(address as string)
      }
      if (isSolanaConnected && connectedWallet != "solana") {
        setConnectedWallet("solana")
        setConnectedWalletAddress(publicKey?.toBase58() as string)
      }
      if (isAptosConnected && connectedWallet != "aptos") {
        setConnectedWallet("aptos")
        setConnectedWalletAddress(account?.address as string)
      }
    } else {
      setConnectedWallet(null)
    }
  }, [
    isAnyWalletConncted,
    isRainbowConnected,
    isSolanaConnected,
    isAptosConnected,
  ])

  useEffect(() => {
    if (address) {
      setConnectedWallet("evm")
      setConnectedWalletAddress(address as string)
    } else if (publicKey) {
      setConnectedWallet("solana")
      setConnectedWalletAddress(publicKey?.toBase58() as string)
    } else if (account) {
      setConnectedWallet("aptos")
      setConnectedWalletAddress(account?.address as string)
    } else {
      setConnectedWallet(null)
    }
  }, [address, publicKey, account])

  if (!mounted)
    return (
      <Button className={cn("mt-12 flex items-center text-lg", triggerClasses)}>
        <Loader2 className="mr-3 h-4 w-4 animate-spin" />
        <span>Loading</span>
      </Button>
    )

  return (
    <>
      {isAnyWalletConncted ? (
        <a
          href="https://fetcch.xyz"
          target="_blank"
          className={cn(
            buttonVariants(),
            "mt-12 flex w-fit items-center justify-center text-lg mx-auto",
            triggerClasses
          )}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create a site like spheron
        </a>
      ) : (
        <Dialog open={isWalletsModalOpen} onOpenChange={setIsWalletsModalOpen}>
          <DialogTrigger asChild>
            <Button className={cn("mt-12 text-lg mx-auto uppercase", triggerClasses)}>
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full p-9 sm:max-w-xl md:max-w-[600px]">
            <DialogHeader className="w-full flex-row items-center justify-between">
              <DialogTitle className="font-manrope text-xl sm:text-3xl font-bold">
                Connect Wallet
              </DialogTitle>
              <DialogClose
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center sm:flex-row gap-3">
              <RainbowConnectButton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              />
              <SolanaConnectBtutton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              />
              {/* <AptosConnectButton
                setIsWalletsModalOpen={setIsWalletsModalOpen}
              /> */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default WalletsModal
