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
    <footer className="bg-[#F5F6FF] p-4">
      <div className="items-center lg:flex container mx-auto">
        <div className="mb-6 flex items-center lg:mb-0">
          <a
            className="mr-4 inline-block text-sm font-semibold text-gray-500 hover:text-gray-600 sm:mr-10"
            href="http://fetcch.xyz/privacy-policy"
          >
            Privacy Policy
          </a>
          <a
            className="mr-4 inline-block text-sm font-semibold text-gray-500 hover:text-gray-600 sm:mr-10"
            href="http://fetcch.xyz/terms-and-conditions"
          >
            Terms & Conditions
          </a>
        </div>
        <span className="ml-auto inline-block text-sm text-gray-500">
          © All Rights Reserved
        </span>
      </div>
    </footer>
  )
}

export default Footer
