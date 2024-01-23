import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronDown, Search, X } from "lucide-react"

import { chainData } from "@/lib/data"

export default function TokenModal({
  selectedChain,
  selectedToken,
  setSelectedToken,
}: {
  selectedChain: number
  selectedToken: number
  setSelectedToken: (selectedToken: number) => void
}) {
  const [searchItem, setSearchItem] = useState("")
  const [filteredTokens, setFilteredTokens] = useState(
    chainData[selectedChain].tokens
  )

  const handleInputChange = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)
    const filteredItems = chainData[selectedToken].tokens.filter((chain) =>
      chain.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTokens(filteredItems)
  }

  useEffect(() => {
    setFilteredTokens(chainData[selectedChain].tokens)
  }, [selectedChain])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-2 rounded-full bg-[#EBEBEF] px-3 py-2">
          <img
            src={chainData[selectedChain].tokens[selectedToken].logoURI}
            alt=""
            className="h-6 w-6 rounded-full"
          />
          <p className="font-medium">
            {chainData[selectedChain].tokens[selectedToken].name}
          </p>
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-20 max-h-[85vh] w-full -translate-x-2/4 -translate-y-2/4 rounded-lg border border-primary bg-white px-5 py-4 sm:w-[462px]">
          <div className="mt-2 flex items-center justify-between">
            <Dialog.Title className="font-semibold text-primary">
              Choose Token
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full bg-primary bg-opacity-20 p-2 text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-4">
            <div className="flex items-center rounded-xl border border-[#C9C9C9] bg-[#FAFAFA] px-4">
              <input
                className={"w-full bg-transparent py-2 focus:outline-none"}
                placeholder="Search"
                value={searchItem}
                onChange={handleInputChange}
              />
              <Search className="h-6 w-6 text-black" />
            </div>
            <div className="mt-4">
              {filteredTokens.map((token, index) => {
                return (
                  <Dialog.Close
                    asChild
                    key={index}
                    onClick={() => {
                      setSelectedToken(index)
                    }}
                  >
                    <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-[#E3ECFF]">
                      <img
                        src={token.logoURI}
                        alt={token.name}
                        className="h-8 w-8 rounded-lg"
                      />
                      <h1 className="text-xl">{token.name}</h1>
                    </div>
                  </Dialog.Close>
                )
              })}
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
