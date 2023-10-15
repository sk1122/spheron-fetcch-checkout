"use client"

// import SendPayment from "./send-payment";
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Bell, User } from "lucide-react"

import SendPayment from "@/components/send-payment"

const PendingRequests = () => {
  return (
    <>
      {true ? (
        <ScrollArea.Root className="mx-auto mt-7 h-96 max-w-3xl overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full rounded">
            <div className="flex flex-col space-y-3">
              {/* single request */}
              <div className="mx-auto flex h-14 w-full items-center justify-between rounded-full border border-primary bg-[#E1EBFF] px-3 shadow-[0px_0px_35px_-9px_rgba(0,0,0,0.25)] md:h-[84px] md:w-[694px]">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
                      <User />
                    </div>
                    <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
                  </div>
                  <div className="flex flex-col items-start">
                    <h4 className="font-manrope text-sm font-bold md:text-base">
                      payment request received
                    </h4>
                    <span className="text-xs md:text-sm">
                      Dribble is requesting 9.99 USD
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="rounded-full border border-[#7C98F9] bg-white px-3 py-2 text-sm md:px-7 md:py-4 md:text-base">
                    Dismiss
                  </button>
                  <SendPayment />
                </div>
              </div>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      ) : (
        <>
          <h3 className="my-8 text-xl">No Pending Requests</h3>
          <div className="mx-auto flex w-fit max-w-xs items-center space-x-3 rounded-full border border-[#2FC816] bg-[#E8FFE8] px-4 py-3">
            <Bell stroke="#2FC816" />
            <span className="text-[#2FC816]">Send Payment requests OTG</span>
          </div>
        </>
      )}
    </>
  )
}

export default PendingRequests
