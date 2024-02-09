import { Toaster } from "react-hot-toast"

import WalletsModal from "@/components/wallets-modal"

const LandingPage = () => {
  return (
    <div>
      <Toaster />
      <div className="z-20 flex h-[calc(100vh-128px)] w-full items-center justify-center px-6 text-center">
        <div>
          <h1 className="mx-auto max-w-7xl text-center font-syne text-3xl font-bold md:text-4xl xl:text-7xl 2xl:text-8xl">
            Complete the checkout for{" "}
            <span className="text-primary">spheron</span>
          </h1>
          <div className="mx-auto mt-8 w-full max-w-md text-center md:max-w-lg xl:max-w-xl 2xl:max-w-full">
            <p className="font-inter text-xl">
              Connect your wallet,{" "}
              <span className="font-architects_daughter line-through">
                choose chain, Set the amount,
              </span>{" "}
              sign the transaction.
            </p>
            <p className="font-inter text-xl">
              your requester will get the payment{" "}
              <span className="text-primary">
                “Crypto made easy : Click , Send, Done!”
              </span>
            </p>
          </div>
          <WalletsModal triggerClasses="flex items-start mx-auto lg:items-center" />
          <div className="flex items-center gap-2 justify-center mt-8">
            <p>
              <span className="font-michroma text-primary">Checkout</span> powered by
            </p>
            <img src="/assets/fetcch.svg" alt="" className="h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
