"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import spheron from "@/public/assets/spheron.svg"
import ConnectWalletButton from "./connect-wallet-button"

const MainNav = () => {
  return (
    <div className="flex w-full items-center justify-between px-6 xl:px-20 py-3">
      <Link href="/">
        <div className="flex items-center gap-4">
          <Image src={spheron} alt="logo" priority className="h-8 md:h-16"/>
        </div>
      </Link>
      <div className="max-w-fit">
        <ConnectWalletButton />
      </div>
    </div>
  )
}

export default MainNav
