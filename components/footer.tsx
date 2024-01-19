import React from "react"
import Image from "next/image"
import decoration from "@/public/assets/decoration.avif"
import siteLogo from "@/public/assets/fetcch.svg"

const Footer = () => {
  return (
    <footer className="z-100 h-fit w-full pt-12">
      <div className="mx-auto px-6 pb-12 xl:px-20">
        <div className="flex h-fit min-h-32 flex-col items-start justify-between pb-12 md:flex-row">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
            <Image src={decoration} alt="decoration" className="w-32" />
            <div className="flex flex-col justify-center sm:ml-8">
              <Image src={siteLogo} alt="logo" className="w-20" />
              <p className="mt-4 text-sm">A Web3 Pull Layer Platform</p>
            </div>
          </div>
          {/* <div className="mt-6 flex w-full max-w-sm flex-col items-center justify-center md:mt-0">
            <div className="flex w-full flex-col space-y-2 rounded-full p-1 sm:border-gray-200 md:w-fit md:flex-row md:space-y-0 md:border">
              <input
                type="email"
                id="subEmail"
                pattern="[^ @]*@[^ @]*"
                placeholder="Enter your Email"
                className="rounded-full bg-transparent px-4 text-sm outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 md:rounded-l-full md:border-none"
              />
              <button className="cursor-pointer rounded-full bg-primary px-3 py-2 text-sm text-white lg:px-6 lg:py-3">
                Subscribe
              </button>
            </div>
            <p
              id="successMsg"
              className="mt-1 hidden text-center text-xs text-primary"
            >
              Successfully Added Email to Waitlist!
            </p>
          </div> */}
        </div>

        <ul className="grid grid-cols-2 flex-wrap gap-x-4 md:flex md:items-center md:gap-x-0 md:space-x-4 lg:space-x-8">
          <li className="cursor-pointer hover:text-primary">About Us</li>
          <li className="cursor-pointer hover:text-primary">
            <a href="https://docs.fetcch.xyz/faqs/faqs" target="_blank">
              {" "}
              FAQs
            </a>
          </li>
          <li className="cursor-pointer hover:text-primary">
            <a href="https://twitter.com/FetcchX" target="_blank">
              Twitter
            </a>
          </li>
          <li className="cursor-pointer hover:text-primary">
            <a href="https://writings.fetcch.xyz/" target="_blank">
              Writings
            </a>
          </li>
          <li className="cursor-pointer hover:text-primary">
            <a
              href="https://docs.fetcch.xyz/how-to-integrate/quickstart"
              target="_blank"
            >
              Integrate
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full bg-[#263238] py-12">
        <div className="mx-auto flex flex-col items-center justify-between space-y-6 px-6 text-sm text-white md:flex-row md:space-x-0 lg:text-base xl:px-20">
          <span>&copy; 2023 Fetcch . All Rights Reserved</span>
          <ul className="flex items-center space-x-6">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
