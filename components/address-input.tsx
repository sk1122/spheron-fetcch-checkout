"use client"

import { useDeferredValue, useEffect, useState } from "react"
import useDetailStore from "@/store"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Loader2 } from "lucide-react"
import { useAccount } from "wagmi"

import {
  verifyAptosAddress,
  verifyEvmAddress,
  verifySolanaAddress,
} from "@/lib/verifyAddress"
import RequestModal from "@/components/request-modal"

import { useConnectedWallet } from "./providers/providers"
import { Button } from "./ui/button"
import WalletsModal from "./wallets-modal"

const AddressInput = () => {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const address = useDeferredValue(walletAddress)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { setRequestAddress } = useDetailStore()

  const { address: evmAddress } = useAccount()
  const { publicKey } = useWallet()
  const { account } = useAptosWallet()

  const { connectedWallet, addressChain, setAddressChain } =
    useConnectedWallet()
  const [openRequestModal, setOpenRequestModal] = useState(false)

  useEffect(() => {
    console.log(
      "HERE",
      connectedWallet,
      evmAddress,
      publicKey?.toBase58(),
      account?.address.toString()
    )
    if (connectedWallet == "evm") {
      setWalletAddress(evmAddress as string)
    } else if (connectedWallet == "solana") {
      setWalletAddress(publicKey?.toBase58() as string)
    } else if (connectedWallet == "aptos") {
      setWalletAddress(account?.address.toString() as string)
    }
  }, [connectedWallet])

  const verifyWalletAddress = () => {
    try {
      if (
        walletAddress.length > 1 &&
        walletAddress !== null &&
        walletAddress !== undefined
      ) {
        setAddressChain(null)
        setLoading(true)
        setError("")
        fetch(`/api/verify?address=${address}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.data.validity) {
              console.log("verified", data.data)
              if (verifyAptosAddress(data.data.address.address)) {
                setAddressChain("aptos")
              }
              if (verifyEvmAddress(data.data.address.address)) {
                setAddressChain("evm")
              }
              if (verifySolanaAddress(data.data.address.address)) {
                setAddressChain("solana")
              }
              setRequestAddress(data?.data?.address?.address)
              setOpenRequestModal(true)
              setLoading(false)
              setError("")
            } else {
              setError("Please enter a valid address")
              setLoading(false)
            }
          })
      } else {
        setError("Please enter a valid address you want to request to.")
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  console.log("😎 ", addressChain)

  return (
    <div className="mt-7 flex h-full w-full max-w-[699px] flex-col items-start justify-center">
      <div className="relative mx-auto flex h-16 w-full max-w-[699px] items-center rounded-full border border-primary p-8 shadow-[inset_0px_1px_4px_1px_rgba(0,0,0,0.25)]">
        <input
          type="text"
          placeholder="Your address"
          spellCheck={false}
          value={walletAddress}
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
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Request
          </Button>
        )}
        <RequestModal open={openRequestModal} setOpen={setOpenRequestModal} />
      </div>
      {error && (
        <span className="mt-4 text-sm text-destructive/80">{error}</span>
      )}
    </div>
  )
}

export default AddressInput
