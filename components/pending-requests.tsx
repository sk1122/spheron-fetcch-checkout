"use client"

// import SendPayment from "./send-payment";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useWallet } from "@solana/wallet-adapter-react"
import { Bell, User } from "lucide-react"
import toast from "react-hot-toast"
import { formatUnits } from "viem"
import { useAccount } from "wagmi"

import { explorerLinks } from "@/lib/data"
import SendPayment from "@/components/send-payment"

import { useConnectedWallet } from "./providers/providers"

const Request = ({ request }: any) => {
  const receiver = request.recevier.ownerId ?? request.recevier.owner

  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center space-y-3 rounded-full border border-primary px-3 py-3 shadow-[0px_0px_35px_-9px_rgba(0,0,0,0.25)] md:mx-auto md:h-[84px] md:w-[694px] md:flex-row md:justify-between md:space-y-0 md:rounded-full " +
        (request.executed ? "bg-[#fff3e1]" : "bg-[#E1EBFF]")
      }
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
            <User />
          </div>
          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
        </div>
        <div className="flex flex-col items-start">
          <h4 className="font-manrope text-base font-bold">
            payment request sent!
          </h4>
          <div className="flex text-xs md:text-sm">
            requested{" "}
            {request.actions[0].data.tokenData?.decimals
              ? formatUnits(
                  request.actions[0].data.amount.amount,
                  request.actions[0].data.tokenData.decimals
                )
              : 0}{" "}
            {request.actions[0].data.tokenData?.symbol}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => {
            {
              request.executed
                ? window.navigator.clipboard.writeText(
                    `${explorerLinks[request.actions[0].executionData.chain]}${
                      request.actions[0].executionData.hash
                    }`
                  )
                : window.navigator.clipboard.writeText(
                    `https://request.fetcch.xyz/request/${request.id}`
                  )
              toast.success("Copied link")
            }
          }}
          className="whitespace-nowrap rounded-full border border-[#7C98F9] bg-white px-3  py-2 text-base md:px-7 md:py-4"
        >
          {request.executed ? "Copy Tx Link" : "Copy Link"}
        </button>
        <SendPayment
          id={request.id}
          chain={request.actions[0].data.chain}
          receiver={receiver}
          amount={request.actions[0].data.amount.amount}
          token={request.actions[0].data.token}
          decimals={request.actions[0].data.tokenData?.decimals ?? 0}
          tokenName={request.actions[0].data.tokenData?.symbol ?? ""}
        />
      </div>
    </div>
  )
}

const PendingRequests = () => {
  const { connectedWallet, token, requests, setRequests } = useConnectedWallet()

  const router = useRouter()

  const { address } = useAccount()
  const { publicKey } = useWallet()
  const { account } = useAptosWallet()

  const fetchPendingRequests = () => {
    let addr = ""

    console.log(address, publicKey, account)

    if (connectedWallet == "evm") {
      addr = address as string
    } else if (connectedWallet == "solana") {
      addr = publicKey?.toBase58() as string
    } else if (connectedWallet == "aptos") {
      addr = account?.address.toString() as string
    }
    console.log("TOKEN: ", token)
    if (addr) {
      fetch(`/api/getPendingRequests?address=${addr}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("REQUESTS: ", data)

          setRequests(data.data)
          return data
        })
        .catch((e) => {
          toast.error("Token expired, login again")
          router.push("/")
        })
    }
  }

  useEffect(() => {
    fetchPendingRequests()
  }, [connectedWallet, address, publicKey, account])

  return (
    <>
      {requests.length > 0 ? (
        <div className="mt-7 h-screen w-full">
          <div className="flex h-full flex-col space-y-3">
            {/* single request */}
            {requests.map((request: any) => (
              <>
                <Request request={request} />
              </>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h3 className="my-8 text-xl">No Pending Requests</h3>
          <div className="mx-auto flex w-fit max-w-xs items-center space-x-3 rounded-full border border-[#2FC816] bg-[#E8FFE8] px-4 py-3">
            <Bell stroke="#2FC816" />
            <span className="text-[#2FC816]">Send Payment requests OTG</span>
          </div>
        </>
      )}
    </>
  )
}

export default PendingRequests
