"use client"

import React, { useCallback, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import RequestModal from "@/components/request-modal"

const AddressInput = () => {
  const [walletAddress, setWalletAddress] = useState<string>("")
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

  return (
    <div className="relative mx-auto mt-7 flex h-16 w-full max-w-[699px] items-center rounded-full border border-primary p-8 shadow-[inset_0px_1px_4px_1px_rgba(0,0,0,0.25)]">
      <input
        type="text"
        placeholder="Enter Wallet Id/Address to request"
        onChange={(e) => setWalletAddress(e.target.value)}
        className="placeholder:text-muted-foreground block w-full bg-transparent text-lg ring-0 placeholder:text-[#777777] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <RequestModal>
        <button
          className="absolute right-1 rounded-full border-none bg-primary px-7 py-4 text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] outline-none focus-visible:outline-none disabled:cursor-not-allowed"
          disabled={walletAddress?.length < 1}
          onClick={() => {
            if (walletAddress.length > 1) {
              router.push(
                pathname + "?" + createQueryString("address", walletAddress)
              )
            }
            ;() => setWalletAddress("")
          }}
        >
          Request
        </button>
      </RequestModal>
    </div>
  )
}

export default AddressInput
