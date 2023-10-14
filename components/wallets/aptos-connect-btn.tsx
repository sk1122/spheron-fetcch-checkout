"use client"

import React, { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import aptos from "@/public/assets/aptos.svg"
import type { Wallet, WalletName } from "@aptos-labs/wallet-adapter-react"
import {
  isRedirectable,
  useWallet,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"
import { Button, buttonVariants } from "../ui/button"
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

const AptosConnectButton = ({ setIsWalletsModalOpen }: WalletBtnProps) => {
  const { wallets, connected: isConnected, account } = useWallet()
  return (
    <Dialog>
      <DialogTrigger>
        <button
          className="focus:border-primary relative flex h-56 w-60 flex-col items-center justify-center rounded-[20px] bg-[#E3ECFF] focus:border-[3px] focus:bg-[#D4E2FF] focus:outline-none"
          type="button"
        >
          <Image
            src={aptos}
            alt="aptos_image"
            className="h-32 w-32 -translate-y-4"
            width={128}
            height={128}
          />
          <span className="font-manrope absolute bottom-4 text-xl font-semibold">
            {isConnected
              ? truncatePublicKey(account?.address as string)
              : "Aptos"}
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
            <X className="text-primary h-4 w-4 font-bold" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="mt-6 flex w-full flex-col space-y-3">
          {wallets.map((wallet: Wallet) => {
            return (
              <WalletView wallet={wallet} setIsOpen={setIsWalletsModalOpen} />
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const WalletView = ({
  wallet,
  setIsOpen,
}: {
  wallet: Wallet
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()
  const { connect } = useWallet()
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable
  const mobileSupport = wallet.deeplinkProvider

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName)
      setIsOpen(false)
    } catch (error: any) {
      console.error(error)
    }
  }

  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className={`mr-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700`}
          disabled={false}
          key={wallet.name}
          onClick={() =>
            onWalletConnectRequest(wallet.name).then(() => {
              if (connectedWallet === null) {
                setConnectedWallet("aptos")
              }
            })
          }
        >
          <>{wallet.name}</>
        </button>
      )
    }
    // wallet does not have mobile app
    return (
      <Button disabled={true} key={wallet.name}>
        <>{wallet.name}</>
      </Button>
    )
  } else {
    // we are on desktop view
    return (
      <Button
        disabled={!isWalletReady}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
      >
        <>
          <Image
            className="mr-3 h-8 w-8 rounded-full"
            src={wallet.icon}
            alt="wallet_image"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold">{wallet.name}</span>
        </>
      </Button>
    )
  }
}

export default AptosConnectButton
