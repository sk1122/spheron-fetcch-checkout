"use client"

import React from "react"
import Image from "next/image"
import aptos from "@/public/assets/tokens/aptos.webp"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
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
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

const AptosaccountModal = () => {
  const { account, disconnect } = useWallet()
  const { connectedWallet, setConnectedWallet } = useConnectedWallet()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-input flex flex-shrink-0 items-center space-x-2 rounded-full p-2">
          <Image
            src={aptos}
            alt="ethereum_image"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <span>{truncatePublicKey(account?.address as string)}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-9 sm:max-w-xl md:max-w-[374px]">
        <DialogHeader className="w-full flex-row items-center justify-between">
          <DialogTitle className="font-manrope text-3xl font-bold">
            Connected to Aptos
          </DialogTitle>
          <DialogClose
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "flex-shrink-0"
            )}
          >
            <X className="text-primary h-4 w-4 font-bold" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div>
          <button
            className="bg-input hover:text-primary w-full rounded-md p-4 text-left"
            onClick={() => {
              disconnect()
              if (connectedWallet === "aptos") {
                setConnectedWallet(null)
                if(pathname.includes("/request/")) return
                router.push("/")
              }
            }}
          >
            Disconnect
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AptosaccountModal
