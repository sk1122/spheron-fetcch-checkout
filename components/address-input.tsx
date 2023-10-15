"use client"

import React, { useCallback, useDeferredValue, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useAccount } from "wagmi"

import {
  verifyAddress,
  verifyAptosAddress,
  verifyEvmAddress,
  verifySolanaAddress,
} from "@/lib/verifyAddress"
import RequestModal from "@/components/request-modal"

import { useConnectedWallet } from "./providers/providers"
import { Button } from "./ui/button"
import WalletsModal from "./wallets-modal"

const AddressInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [walletAddress, setWalletAddress] = useState<string>("")
  const address = useDeferredValue(walletAddress)
  const [error, setError] = useState("")

  const { address: evmAddress } = useAccount()
  const { publicKey } = useWallet()
  const { account } = useAptosWallet()

  const isUserAddress =
    address.toLowerCase() === evmAddress?.toLowerCase() ||
    address.toLowerCase() === publicKey?.toBase58().toLowerCase() ||
    address.toLowerCase() === account?.address.toLowerCase()

  const { connectedWallet, addressChain, setAddressChain } =
    useConnectedWallet()
  const [openRequestModal, setOpenRequestModal] = useState(false)

  const verifyWalletAddress = () => {
    try {
      if (
        walletAddress.length > 1 &&
        walletAddress !== null &&
        walletAddress !== undefined &&
        !isUserAddress
      ) {
        setAddressChain(null)
        if (verifyAddress(address)) {
          if (verifyAptosAddress(address)) {
            setAddressChain("aptos")
          }
          if (verifyEvmAddress(address)) {
            setAddressChain("evm")
          }
          if (verifySolanaAddress(address)) {
            setAddressChain("solana")
          }
          router.push(pathname + "?" + createQueryString("address", address))
          setOpenRequestModal(true)
        } else {
          setError("Please enter a valid address")
        }
        setWalletAddress("")
      } else {
        setError("Please enter a valid address you want to request to.")
      }
    } catch (err) {
      console.error(err)
    }
  }

  console.log("😎 ", addressChain)

  return (
    <>
      <div className="relative mx-auto mt-7 flex h-16 w-full max-w-[699px] items-center rounded-full border border-primary p-8 shadow-[inset_0px_1px_4px_1px_rgba(0,0,0,0.25)]">
        <input
          type="text"
          placeholder="Enter Wallet Id/Address to request"
          value={walletAddress}
          spellCheck={false}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="placeholder:text-muted-foreground block w-full bg-transparent pr-24 text-lg ring-0 placeholder:text-[#777777] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:pr-36"
        />
        {connectedWallet === null ? (
          <WalletsModal triggerClasses="mt-0 text-sm absolute right-[6px]" />
        ) : (
          <Button
            className="absolute right-[6px]"
            onClick={verifyWalletAddress}
          >
            Request
          </Button>
        )}
        <RequestModal open={openRequestModal} setOpen={setOpenRequestModal} />
      </div>
      {error && (
        <span className="mt-4 text-sm text-destructive/80">{error}</span>
      )}
    </>
  )
}

export default AddressInput
