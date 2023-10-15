import React from "react"

import AddressInput from "@/components/address-input"
import PendingRequests from "@/components/pending-requests"

const RequestsPage = async () => {
  return (
    <div>
      <div className="relative z-20 mt-20 w-full px-6 text-center lg:px-0">
        <h1 className="text-center font-manrope text-5xl font-bold md:text-6xl xl:text-7xl 2xl:text-8xl">
          Payment Requests
        </h1>
        <p className="mx-auto mt-8 w-full max-w-md text-center text-[18px] md:max-w-lg xl:max-w-xl 2xl:max-w-full">
          Let&apos;s understand the user experience flow of{" "}
          <span className="text-[#FF7D1F]">request button</span> in wallets
          integrated with Fetcch.{" "}
        </p>
        <AddressInput />
        <h3 className="mt-12 font-manrope text-2xl font-semibold">
          Your Pending Requests
        </h3>
        <PendingRequests />
      </div>
    </div>
  )
}

export default RequestsPage
