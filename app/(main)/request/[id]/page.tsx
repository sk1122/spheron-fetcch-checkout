import React from "react"

import { Toaster } from "react-hot-toast"
import Actions from "@/components/actions"

const RequestsPage = async ({ params }: { params: { id: string } }) => {  
    return (
    <div>
      <Toaster />
      <div className="relative z-20 mt-20 w-full px-6 text-center lg:px-0">
        <h1 className="text-center font-manrope text-5xl font-bold md:text-6xl xl:text-7xl 2xl:text-8xl">
          Payment Actions
        </h1>
        <p className="mx-auto mt-8 w-full max-w-md text-center text-[18px] md:max-w-lg xl:max-w-xl 2xl:max-w-full">
          Let&apos;s understand the user experience flow of{" "}
          <span className="text-[#FF7D1F]">request button</span> in wallets
          integrated with Fetcch.{" "}
        </p>
        {/* <h3 className="mt-12 font-manrope text-2xl font-semibold">
          Your Pending Requests
        </h3> */}
        <Actions id={params.id} />
      </div>
    </div>
  )
}

export default RequestsPage
