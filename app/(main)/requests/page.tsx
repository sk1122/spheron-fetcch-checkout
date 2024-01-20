import React from "react"
import { Toaster } from "react-hot-toast"

import AddressInput from "@/components/address-input"
import PendingRequests from "@/components/pending-requests"

const RequestsPage = async () => {
  return (
    <div>
      <Toaster />
      <div className="relative z-20 mt-20 w-full px-6 text-center lg:px-0">
        <h1 className="text-center font-manrope text-3xl font-bold md:text-4xl xl:text-5xl 2xl:text-6xl">
          Create Link, <span className="text-[#FF7D1F]">Request</span> your
          crypto
        </h1>
        <div className="mx-auto mt-8 w-full max-w-md text-center md:max-w-lg xl:max-w-xl 2xl:max-w-full">
          <p className="font-manrope text-xl">
            Connect your wallet,{" "}
            <span className="font-architects_daughter line-through">
              choose chain, Set the amount,
            </span>{" "}
            sign the transaction.
          </p>
          <p className="font-manrope text-xl">
            your requester will get the payment{" "}
            <span className="text-primary">
              “Crypto made easy : Click , Send, Done!”
            </span>
          </p>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <AddressInput />
        </div>
        <h3 className="mt-12 font-manrope text-2xl font-semibold">
          Your Pending Links
        </h3>
        <PendingRequests />
      </div>
    </div>
  )
}

export default RequestsPage
