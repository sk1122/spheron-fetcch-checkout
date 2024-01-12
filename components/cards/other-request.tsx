import React, { useEffect, useState } from "react"
import useDetailStore from "@/store"
import { formatUnits } from "viem"

import {
  aptosChainData,
  Chain,
  evmChainData,
  solanaChainData,
  Token,
} from "@/lib/data"
import formatAddress from "@/lib/formatAddress"

import ConnectWalletButton from "../connect-wallet-button"
import { useConnectedWallet } from "../providers/providers"
import SendModal from "../send-modal"

export default function OtherRequest({
  message,
  action,
  id,
}: {
  message: string
  action: any
  id: string
}) {
  const [tokenData, setTokenData] = useState<any>()
  const [chainData, setChainData] = useState<Chain>()
  const [openRequestModal, setOpenRequestModal] = useState(false)
  const { setChain, setToken } = useDetailStore()

  const amount = action.data.amount.amount
  const token = action.data.token
  const chain = action.data.chain
  const receiver = action.data.receiver

  useEffect(() => {
    console.log(action, "ACTION")
    if (token) {
      const chainData = [
        ...evmChainData,
        ...solanaChainData,
        ...aptosChainData,
      ].find((chain) => chain.id === action.data.chain)

      setTokenData(action.data.tokenData)
      console.log(action.data.tokenData)
      setChainData(chainData)
    }
  }, [token])

  const { connectedWallet } = useConnectedWallet()

  return (
    <>
      <div className="mt-2 rounded-xl bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-[#2B67E8] bg-[#2B67E8] bg-opacity-10 p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8H16M8 12H13M12 21H9.4C7.16 21 6.04 21 5.184 20.564C4.43139 20.1805 3.81949 19.5686 3.436 18.816C3 17.96 3 16.84 3 14.6V9.4C3 7.16 3 6.04 3.436 5.184C3.81949 4.43139 4.43139 3.81949 5.184 3.436C6.04 3 7.16 3 9.4 3H14.6C16.84 3 17.96 3 18.816 3.436C19.5686 3.81949 20.1805 4.43139 20.564 5.184C21 6.04 21 7.16 21 9.4V11M15.72 18.96L16.72 20.293C17.154 20.873 17.371 21.162 17.638 21.265C17.8709 21.3554 18.1291 21.3554 18.362 21.265C18.629 21.162 18.846 20.872 19.28 20.293L20.28 18.96C20.538 18.616 20.667 18.444 20.717 18.255C20.7611 18.0879 20.7611 17.9121 20.717 17.745C20.667 17.556 20.538 17.385 20.28 17.04L19.28 15.707C18.846 15.127 18.629 14.838 18.362 14.735C18.1291 14.6446 17.8709 14.6446 17.638 14.735C17.371 14.838 17.154 15.128 16.72 15.707L15.72 17.04C15.462 17.384 15.333 17.556 15.283 17.745C15.2389 17.9121 15.2389 18.0879 15.283 18.255C15.333 18.444 15.462 18.615 15.72 18.96Z"
                  stroke="#2B67E8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-left font-medium leading-4">
                Request for lorem spun approval
              </h3>
              <p className="text-left text-sm text-[#2B67E8]">
                {formatAddress(receiver)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={tokenData?.logo}
              alt={tokenData?.name}
              className="h-10 w-10 rounded-full object-contain"
            />
            <div>
              <p className="text-right text-lg font-medium leading-4">
                {formatUnits(BigInt(amount), Number(tokenData?.decimals))}
              </p>
              <p className="text-right font-medium text-[#2B67E8]">
                {formatUnits(BigInt(amount), Number(tokenData?.decimals))}{" "}
                {tokenData?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-left text-gray-600 md:mt-2 md:text-lg">
          Message: <span className="text-[#2B67E8]"> {message} </span>
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-4">
          {connectedWallet ? (
            <>
              <button className="w-full rounded-full border border-gray-800 px-12 py-2 font-medium text-gray-800 md:w-auto">
                Decline
              </button>
              <button
                className="w-full rounded-full border border-[#2B67E8] bg-[#2B67E8] px-12 py-2 font-medium text-white md:w-auto"
                onClick={() => {
                  setChain(chainData!.name)
                  setToken(action?.data?.token)
                  setOpenRequestModal(true)
                }}
              >
                Pay
              </button>
            </>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      </div>
      <SendModal
        id={id}
        open={openRequestModal}
        setOpen={setOpenRequestModal}
        address={receiver}
        token={
          tokenData
            ? tokenData
            : {
                address: token,
                name: token,
                chainId: chain,
                logoURI: "",
                symbol: token,
                decimals: 18,
              }
        }
        amount={amount}
        chain={chainData!}
        action={action}
      />
    </>
  )
}
