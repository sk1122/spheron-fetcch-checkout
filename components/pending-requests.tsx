"use client"

// import SendPayment from "./send-payment";
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { Bell, User } from "lucide-react"

import SendPayment from "@/components/send-payment"
import { useConnectedWallet } from "./providers/providers"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { formatUnits } from "viem"

const Request = ({
  request
}: any) => {
  const payer = request.payer.ownerId ?? request.payer.owner
  const receiver = request.recevier.ownerId ?? request.recevier.owner

  return (
    <div className="mx-auto flex h-14 w-full items-center justify-between rounded-full border border-primary bg-[#E1EBFF] px-3 shadow-[0px_0px_35px_-9px_rgba(0,0,0,0.25)] md:h-[84px] md:w-[694px]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
              <User />
            </div>
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-manrope text-sm font-bold md:text-base">
              payment request received
            </h4>
            <div className="text-xs md:text-sm flex">
              <p className="w-36 truncate" title="Coming Soon" data-tooltip-placement="bottom">{receiver}</p> is requesting {request.actions[0].data.tokenData?.decimals ? formatUnits(request.actions[0].data.amount.amount, request.actions[0].data.tokenData.decimals) : 0} {request.actions[0].data.tokenData?.symbol}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="rounded-full border border-[#7C98F9] bg-white px-3 py-2 text-sm md:px-7 md:py-4 md:text-base">
            Dismiss
          </button>
          <SendPayment id={request.id} chain={request.actions[0].data.chain} receiver={receiver} amount={request.actions[0].data.amount.amount} token={request.actions[0].data.token} decimals={request.actions[0].data.tokenData?.decimals ?? 0} tokenName={request.actions[0].data.tokenData?.symbol ?? ""} />
        </div>
      </div>
  )
}

const PendingRequests = () => {
  const { connectedWallet, token } = useConnectedWallet()
  const [requests, setRequests] = useState([])
  
  const { address } = useAccount()
  const {
    publicKey,
  } = useWallet()
  const {
    account,
  } = useAptosWallet()
  
  useEffect(() => {
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
    fetch(`/api/getPendingRequests?address=${addr}&accessToken=${token}`).then(res => res.json()).then(data => {
      console.log("REQUESTS: ", data)

      setRequests(data.data)
      return data
    })
  }, [connectedWallet, address, publicKey, account])
  
  return (
    <>
      {true ? (
        <ScrollArea.Root className="mx-auto mt-7 h-96 max-w-3xl overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full rounded">
            <div className="flex flex-col space-y-3">
              {/* single request */}
              {requests.map(request => (
                <Request request={request} />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
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
