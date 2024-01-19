import { cn } from "@/lib/utils"

import "./globals.css"
import "./solana-wallet.css"
import "@rainbow-me/rainbowkit/styles.css"

import type { Metadata } from "next"
import { Architects_Daughter, Inter, Manrope } from "next/font/google"
import { Toaster } from "react-hot-toast"

import Footer from "@/components/footer"
import Providers from "@/components/providers/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--architects_daughter",
  weight: "400",
})

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
          manrope.variable,
          architects_daughter.variable
        )}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
