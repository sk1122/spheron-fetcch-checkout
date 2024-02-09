"use client"

import { useState } from "react"
import Image from "next/image"
import decoration from "@/public/assets/decoration.avif"
import siteLogo from "@/public/assets/fetcch.svg"
import Subscribe from "@/utils/subscribe"
import toast from "react-hot-toast"

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const Footer = () => {
  const [email, setEmail] = useState("")

  async function handleSubmit() {
    if (email.length === 0) {
      toast.error("Please enter an email")
    }
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email")
    }
    const data = await Subscribe(email)
    if (data.status === "created") {
      setEmail("")
      toast.success("Successfully Added Email to Waitlist!")
    }
  }

  return (
    <footer className="bg-[#F5F6FF] py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <p>Privacy Policy</p>
          <p>Terms of Conditions</p>
        </div>
        <img src="/assets/fetcch.svg" alt="" className="h-6" />
        <p>Fetcch. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
