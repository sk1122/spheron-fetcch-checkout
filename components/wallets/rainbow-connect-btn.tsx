"use client"

import React from "react"
import Image from "next/image"
import ethereum from "@/public/assets/ethereum.svg"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { Loader2, X } from "lucide-react"
import { useAccount, useConnect } from "wagmi"

import { truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"
import { buttonVariants } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

interface WalletBtnProps {
  setIsWalletsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RainbowConnectButton = ({ setIsWalletsModalOpen }: WalletBtnProps) => {
  const { connectors, connectAsync, isLoading, pendingConnector } = useConnect()
  const { isConnected, address } = useAccount()
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()

  return (
    <Dialog>
      <DialogTrigger>
        <button
          className="relative flex h-56 w-60 flex-col items-center justify-center rounded-[20px] bg-[#E3ECFF] focus:border-[3px] focus:border-primary focus:bg-[#D4E2FF] focus:outline-none"
          type="button"
        >
          <Image
            src={ethereum}
            alt="ethereum_image"
            className="h-32 w-32 -translate-y-4"
            width={128}
            height={128}
          />
          <span className="absolute bottom-4 font-manrope text-xl font-semibold">
            {isConnected ? truncatePublicKey(address as string) : "Ethereum"}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-9 sm:max-w-xl md:max-w-[374px]">
        <DialogHeader className="w-full flex-row items-center justify-between">
          <DialogTitle className="font-manrope text-3xl font-bold">
            Select Wallet
          </DialogTitle>
          <DialogClose
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="mt-6 flex w-full flex-col space-y-3">
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() =>
                connectAsync({ connector }).then(() => {
                  if (connectedWallet === null) {
                    setConnectedWallet("evm")
                  }
                  setIsWalletsModalOpen(false)
                })
              }
              className="w-full p-3 hover:bg-input"
            >
              <span className="flex w-full items-center text-left text-lg font-semibold">
                {connector.name}
                {isLoading && pendingConnector?.id === connector.id && (
                  <Loader2 className="ml-2 animate-spin" />
                )}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RainbowConnectButton
