import React from "react"
import Image from "next/image"
import decoration from "@/public/assets/decoration.avif"

import MainNav from "@/components/main-nav"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-full w-full overflow-x-hidden">
      <MainNav />
      <Image
        src={decoration}
        alt="decoration"
        priority
        className="absolute -left-16 hidden w-1/3 select-none md:w-1/4 xl:block xl:w-1/6"
      />
      <Image
        src={decoration}
        alt="decoration"
        priority
        className="absolute -right-16 top-1/4 -z-10 hidden w-1/3 rotate-90 select-none md:w-1/4 xl:block xl:w-1/6"
      />
      {children}
    </main>
  )
}

export default MainLayout
