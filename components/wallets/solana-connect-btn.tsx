"use client"

import React from "react"
import Image from "next/image"
import solana from "@/public/assets/solana.svg"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

import { truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"

interface WalletBtnProps {
  setIsWalletsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SolanaConnectBtutton = ({ setIsWalletsModalOpen }: WalletBtnProps) => {
  const { publicKey, connected, disconnect, wallet } = useWallet()
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()
  const { setVisible } = useWalletModal()

  const isConnected = connected && publicKey && wallet

  return (
    <button
      className="focus:border-primary relative flex h-56 w-60 flex-col items-center justify-center rounded-[20px] bg-[#E3ECFF] focus:border-[3px] focus:bg-[#D4E2FF] focus:outline-none"
      type="button"
      onClick={async () => {
        setIsWalletsModalOpen(false)
        if (isConnected) {
          disconnect()
        } else {
          try {
            await setVisible(true)
            if (connectedWallet === null) {
              setConnectedWallet("solana")
            }
          } catch (err) {
            console.error(err)
          }
        }
      }}
    >
      <Image
        src={solana}
        alt="ethereum_image"
        className="h-32 w-32 -translate-y-4"
        width={128}
        height={128}
      />
      <span className="font-manrope absolute bottom-4 text-xl font-semibold">
        {isConnected
          ? truncatePublicKey(publicKey?.toBase58() as string)
          : "Solana"}
      </span>
    </button>
  )
}

export default SolanaConnectBtutton
