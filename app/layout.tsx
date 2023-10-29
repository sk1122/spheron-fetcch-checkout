import { cn } from "@/lib/utils"

import "./globals.css"
import "./solana-wallet.css"
import "@rainbow-me/rainbowkit/styles.css"

import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"

import Footer from "@/components/footer"
import Providers from "@/components/providers/providers"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

export const metadata: Metadata = {
  title: "Fetcch",
  description: "Payment Requests",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full font-sans antialiased",
          inter.variable,
          manrope.variable
        )}
      >
        <Providers>
        <Toaster />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
