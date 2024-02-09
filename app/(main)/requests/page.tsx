import React from "react"
import { Toaster } from "react-hot-toast"

import AddressInput from "@/components/address-input"
import PendingRequests from "@/components/pending-requests"

const RequestsPage = async () => {
  return (
    <div>
      <Toaster />
      <div className="z-20 my-20 w-full px-6 text-center lg:px-0">
        <h1 className="mx-auto max-w-7xl text-center font-syne text-3xl font-bold md:text-4xl xl:text-7xl 2xl:text-8xl">
          Complete the checkout for{" "}
          <span className="text-primary">spheron</span>
        </h1>
        <div className="mx-auto mt-8 w-full max-w-md text-center md:max-w-lg xl:max-w-xl 2xl:max-w-full">
          <p className="font-inter text-xl">
            Connect your wallet,{" "}
            <span className="font-architects_daughter line-through">
              choose chain, Set the amount,
            </span>{" "}
            sign the transaction.
          </p>
          <p className="font-inter text-xl">
            your requester will get the payment{" "}
            <span className="text-primary">
              “Crypto made easy : Click , Send, Done!”
            </span>
          </p>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <AddressInput />
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          <p>
            <span className="font-michroma text-primary">Checkout</span> powered
            by
          </p>
          <img src="/assets/fetcch.svg" alt="" className="h-6" />
        </div>
        <h3 className="font-inter mt-12 text-2xl font-semibold">
          Your Pending Links
        </h3>
        <PendingRequests />
      </div>
    </div>
  )
}

export default RequestsPage
