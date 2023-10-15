"use client"

import type { Dispatch, SetStateAction } from "react"
import { Suspense, useCallback, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useFilter } from "@react-aria/i18n"
import { Divide, ExternalLink, Search } from "lucide-react"

import { type Chain } from "@/lib/data"
import { cn } from "@/lib/utils"

type TokensListProps = {
  selectedChain: Chain
  setSelectToken: Dispatch<SetStateAction<boolean>>
}

const TokensList = ({
  selectedChain: { tokens },
  setSelectToken,
}: TokensListProps) => {
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

  let { contains } = useFilter({
    sensitivity: "base",
  })

  const [token, setToken] = useState("")
  const filteredTokens = tokens.filter((item) => contains(item.name, token))
  const selectedToken = searchParams.get("token") ?? null

  return (
    <div>
      <div className="relative mt-8 w-full">
        <input
          type="text"
          onChange={(e) => setToken(e.target.value)}
          className="h-12 w-full rounded-xl border border-[#426CFF] bg-[#E3ECFF] pl-3 pr-10 outline-none placeholder:text-[#6893F0] hover:bg-white focus-visible:outline-none"
          placeholder="Select token by name"
        />
        <Search className="absolute right-3 top-3 stroke-[#6893F0]" />
      </div>
      <ScrollArea.Root className="mx-auto mt-7 h-fit max-h-[40vh] max-w-3xl overflow-hidden md:max-h-96">
        <ScrollArea.Viewport className="h-full w-full rounded">
          <div className="flex flex-col space-y-3">
            {filteredTokens.map((token, idx) => (
              <button
                onClick={() => {
                  router.push(
                    pathname + "?" + createQueryString("token", token.address)
                  )
                  setSelectToken(false)
                }}
                className={cn(
                  "group flex cursor-pointer space-x-3 rounded-md p-2 hover:bg-[#E3ECFF]",
                  {
                    "bg-[#E3ECFF]": selectedToken === token.address,
                  }
                )}
                key={idx}
              >
                <Suspense
                  fallback={
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#B0C8FE]" />
                  }
                >
                  <Image
                    src={token.logoURI}
                    alt="token_logo"
                    priority
                    width={48}
                    height={48}
                    className="h-12 w-12 flex-shrink-0 rounded-full"
                  />
                </Suspense>
                <div className="flex flex-col items-start space-y-1">
                  <h4 className="text-lg font-medium text-primary">
                    {token.symbol}
                  </h4>
                  <div className="text-xs text-primary">
                    <span className="group-hover:hidden">{token.symbol}</span>
                    <span className="hidden items-center group-hover:flex">
                      <span className="w-20 truncate ">{token.address}</span>
                      <ExternalLink className="storke-primary inline h-3 w-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  )
}

export default TokensList
