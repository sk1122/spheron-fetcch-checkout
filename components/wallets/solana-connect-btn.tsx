"use client"

import React from "react"
import Image from "next/image"
import solana from "@/public/assets/solana.svg"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

import { truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"
import { useRouter } from "next/navigation"

interface WalletBtnProps {
  setIsWalletsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SolanaConnectBtutton = ({ setIsWalletsModalOpen }: WalletBtnProps) => {
  const { publicKey, connected, disconnect, wallet } = useWallet()
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  const isConnected = connected && publicKey && wallet

  return (
    <button
      className="relative flex h-56 w-60 flex-col items-center justify-center rounded-[20px] bg-[#E3ECFF] focus:border-[3px] focus:border-primary focus:bg-[#D4E2FF] focus:outline-none"
      type="button"
      onClick={async () => {
        setIsWalletsModalOpen(false)
        if (isConnected) {
          disconnect()
        } else {
          try {
            setVisible(true)
            if (connectedWallet === null) {
              setConnectedWallet("solana")
              router.push("/requests")
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
      <span className="absolute bottom-4 font-manrope text-xl font-semibold">
        {isConnected
          ? truncatePublicKey(publicKey?.toBase58() as string)
          : "Solana"}
      </span>
    </button>
  )
}

export default SolanaConnectBtutton
