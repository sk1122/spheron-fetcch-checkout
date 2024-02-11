import React from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import solana from "@/public/assets/tokens/solana.webp"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useWallet } from "@solana/wallet-adapter-react"
import { X } from "lucide-react"

import { cn, truncatePublicKey } from "@/lib/utils"

import { useConnectedWallet } from "../providers/providers"
import { buttonVariants } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

const SolanaAccountModal = () => {
  const { setConnectedWallet } = useConnectedWallet()
  const { publicKey, disconnect } = useWallet()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex flex-shrink-0 items-center rounded bg-primary px-4 py-2 text-white">
          <span>{truncatePublicKey(publicKey?.toBase58() as string)}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-9 sm:max-w-xl md:max-w-[374px]">
        <DialogHeader className="w-full flex-row items-center justify-between">
          <DialogTitle className="font-manrope text-3xl font-bold">
            Connected to Solana
          </DialogTitle>
          <DialogClose
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "flex-shrink-0"
            )}
          >
            <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div>
          <button
            className="w-full rounded-md bg-input p-4 text-left hover:text-primary"
            onClick={async () => {
              await disconnect().then(() => {
                setConnectedWallet(null)
                if (pathname.includes("/request/")) return
                router.push("/")
              })
            }}
          >
            Disconnect
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SolanaAccountModal
