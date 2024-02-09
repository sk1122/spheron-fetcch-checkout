import React from "react"

import Demo from "@/components/demo"
import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-full w-full overflow-x-hidden">
      <MainNav />
      {children}
      <Footer />
    </main>
  )
}

export default MainLayout
