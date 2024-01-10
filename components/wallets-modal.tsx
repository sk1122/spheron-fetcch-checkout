"use client"

import React, { useEffect, useState } from "react"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useWallet } from "@solana/wallet-adapter-react"
import { encode } from "bs58"
import { Loader2, X } from "lucide-react"
import { useAccount, useSignMessage } from "wagmi"
import { useRouter } from "next/navigation"

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
import { redirect } from "next/navigation"
import { useConnectModal } from "@rainbow-me/rainbowkit"

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
  }, [isAnyWalletConncted, isRainbowConnected, isSolanaConnected, isAptosConnected])

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

  const handleGetStartedClick = async () => {
    try {
      // setLoading(true)
  
      // console.log("Owner address: ", connectedWalletAddress)
  
      // const authData = await fetch("/api/getAuthMessage", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ownerAddress: connectedWalletAddress,
      //   }),
      // })
  
      // const signedData = await authData
      //   .json()
      //   .then(
      //     async ({
      //       data: { message, timestamp },
      //     }: {
      //       data: { message: string; timestamp: number }
      //     }) => {
      //       if (connectedWallet === "evm") {
      //         let signedMsg = await signMessageAsync({ message })
      //         return { signedMsg, timestamp }
      //       } else if (connectedWallet === "solana") {
      //         const solanaSignedArray = await signMessageSolana!(
      //           Buffer.from(message)
      //         )
      //         let signedMsg = encode(Uint8Array.from(solanaSignedArray))
      //         return { signedMsg, timestamp }
      //       } else if (connectedWallet === "aptos") {
      //         const aptosSignedMsg = await signAptosMessage({
      //           message: message,
      //           nonce: timestamp.toString(),
      //         })
  
      //         console.log("APTOS SINGED MSG: ", aptosSignedMsg)
      //         let signedMsg = aptosSignedMsg?.signature as string
  
      //         console.log("APTOS: ", signedMsg)
      //         return { signedMsg, timestamp }
      //       }
      //     }
      //   )
  
      // const getAuthToken = await fetch("/api/getAuthToken", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ownerAddress: connectedWalletAddress,
      //     signature: signedData?.signedMsg,
      //     timestamp: signedData?.timestamp,
      //   }),
      // })
  
      // const res = await getAuthToken.json()
  
      // console.log("TOKEN: ", res)
  
      // setToken(res.data.accessToken)
  
      // setLoading(false)
  
      push("/requests")
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <>
      {isAnyWalletConncted ? (
        <Button
          onClick={() => handleGetStartedClick()}
          className={cn(
            buttonVariants(),
            "mt-12 w-fit text-lg flex justify-center items-center",
            triggerClasses
          )}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Started
        </Button>
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
            <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row">
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
