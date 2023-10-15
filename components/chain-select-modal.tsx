"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import type { Chain } from "@/lib/data"
import { cn } from "@/lib/utils"

import { DialogHeader } from "./ui/dialog"

const ChainSelectModal = ({
  setOpen,
  chains,
  children,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  chains: Chain[]
  children: React.ReactNode
}) => {
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

  const selectedChain = searchParams.get("chain") ?? "Ethereum"

  return (
    <>
      <DialogHeader className="flex w-full flex-row items-center justify-between">
        <ChevronLeft
          className="h-8 w-8 cursor-pointer rounded-full p-1 text-primary ring-2 ring-primary"
          onClick={() => setOpen(false)}
          strokeWidth={2}
        />
        <h2 className="font-manrope text-3xl font-bold">Select Token</h2>
        <div></div>
      </DialogHeader>
      {/* will be button in future */}
      <div className="mx-auto mt-5 grid w-full grid-cols-5 gap-2">
        {chains.map((chain, idx) => (
          <button
            key={idx}
            className={cn(
              "flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-[#426CFF] bg-[#E3ECFF] hover:bg-[rgba(66,108,255,0.44)]",
              {
                "bg-[rgba(66,108,255,0.44)]": selectedChain === chain.name,
              }
            )}
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("chain", chain.name)
              )
            }}
          >
            <Image
              src={chain.logoURI}
              alt="chain_image"
              width={42}
              height={42}
            />
          </button>
        ))}
      </div>
      <div className="relative">{children}</div>
    </>
  )
}

export default ChainSelectModal
