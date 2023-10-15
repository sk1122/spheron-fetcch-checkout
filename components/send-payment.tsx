"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SendPayment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full border-none bg-primary px-4 py-2 text-sm text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] outline-none focus-visible:outline-none md:px-7 md:py-4 md:text-base">
          Pay
        </button>
      </DialogTrigger>
      <DialogContent className="w-full p-6 sm:max-w-[392px] sm:rounded-[20px]">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="font-manrope text-3xl font-semibold">
            Pay
          </DialogTitle>
          <DialogPrimitive.Close className="w-fit rounded-full border-2 border-primary p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-primary data-[state=open]:text-primary">
            <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl">Confirm Transaction to</h3>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-zinc-600" />
              <span className="text-lg font-semibold text-primary">
                steve.patrick@metamask
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold">Chain & Amount</h3>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-zinc-600" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-primary">
                  34.24
                </span>
                <span className="text-xs text-primary">$ 18.78</span>
              </div>
            </div>
          </div>
          {/* pay button */}
          <button className="w-full rounded-full bg-primary py-4 text-white">
            Pay
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SendPayment
