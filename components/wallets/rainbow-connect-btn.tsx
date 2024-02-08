"use client"

import React from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import ethereum from "@/public/assets/ethereum.svg"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useAccount, useDisconnect } from "wagmi"

import { truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"

interface WalletBtnProps {
  setIsWalletsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RainbowConnectBtutton = ({ setIsWalletsModalOpen }: WalletBtnProps) => {
  const { disconnectAsync } = useDisconnect()
  const { isConnected, address } = useAccount()
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()
  const { openConnectModal } = useConnectModal()
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <button
      className="relative flex h-56 w-60 flex-col items-center justify-center rounded-[20px] bg-[#E3ECFF] focus:border-[3px] focus:border-primary focus:bg-[#D4E2FF] focus:outline-none"
      type="button"
      onClick={async () => {
        setIsWalletsModalOpen(false)
        if (isConnected) {
          await disconnectAsync()
        } else {
          try {
            openConnectModal!()
            if (connectedWallet === null) {
              setConnectedWallet("evm")
              if(pathname.includes("/request/")) return
            }
          } catch (err) {
            console.error(err)
          }
        }
      }}
    >
      <Image
        src={ethereum}
        alt="ethereum_image"
        className="h-32 w-32 -translate-y-4"
        width={128}
        height={128}
      />
      <span className="absolute bottom-4 font-manrope text-xl font-semibold">
        {isConnected ? truncatePublicKey(address!) : "Ethereum"}
      </span>
    </button>
  )
}

export default RainbowConnectBtutton
