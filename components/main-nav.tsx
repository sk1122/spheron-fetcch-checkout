import React from "react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/public/assets/fetcch.svg"

import ConnectWalletButton from "./connect-wallet-button"

const MainNav = () => {
  return (
    <div className="flex h-20 w-full items-center justify-between px-6 xl:h-28 xl:px-20">
      <Link href="/">
        <Image src={logo} alt="logo" priority />
      </Link>
      <ul className="hidden items-center space-x-6 md:flex xl:space-x-12">
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Products
        </Link>
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Learn
        </Link>
        <Link
          href="#"
          className="text-[#363C46] transition-all duration-200 hover:text-primary"
        >
          Use Cases
        </Link>
      </ul>
      <div className="max-w-fit">
        <ConnectWalletButton />
      </div>
    </div>
  )
}

export default MainNav
