import { Toaster } from "react-hot-toast"

import Actions from "@/components/actions"

const RequestsPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="min-h-[calc(100vh-112px)]">
        <Toaster />
        <div className="relative z-20 mt-20 w-full px-6 text-center lg:px-0">
          <h1 className="mx-auto max-w-7xl text-center font-syne text-3xl font-bold md:text-4xl xl:text-7xl 2xl:text-8xl">
            Complete the checkout for{" "}
            <span className="text-primary">spheron</span>
          </h1>
          <div className="mx-auto mt-8 w-full max-w-md text-center md:max-w-lg xl:max-w-xl 2xl:max-w-full">
            <p className="font-manrope text-xl">
              Connect your wallet,{" "}
              <span className="font-architects_daughter line-through">
                choose chain, Set the amount,
              </span>{" "}
              sign the transaction.
            </p>
            <p className="font-manrope text-xl">
              your requester will get the payment{" "}
              <span className="text-primary">
                “Crypto made easy : Click , Send, Done!”
              </span>
            </p>
          </div>
          <Actions id={params.id} />
          <div className="mt-8 flex items-center justify-center gap-2">
            <p>
              <span className="font-michroma text-primary">Checkout</span>{" "}
              powered by
            </p>
            <img src="/assets/fetcch.svg" alt="" className="h-6" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RequestsPage
