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

export default function PaymentRequest({
  message,
  action,
  id,
}: {
  message: string
  action: any
  id: string
}) {
  const [tokenData, setTokenData] = useState<Token>()
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
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0408 7.94604C17.0408 9.01762 16.6151 10.0453 15.8574 10.803C15.0996 11.5608 14.0719 11.9864 13.0004 11.9864C11.9288 11.9864 10.9011 11.5608 10.1434 10.803C9.38564 10.0453 8.95996 9.01762 8.95996 7.94604C8.95996 6.87446 9.38564 5.84677 10.1434 5.08905C10.9011 4.33132 11.9288 3.90564 13.0004 3.90564C14.0719 3.90564 15.0996 4.33132 15.8574 5.08905C16.6151 5.84677 17.0408 6.87446 17.0408 7.94604Z"
                  stroke="#2B67E8"
                  stroke-width="1.51515"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.0406 16.028H8.95984C7.88825 16.028 6.86056 16.4537 6.10284 17.2114C5.34512 17.9691 4.91943 18.9968 4.91943 20.0684C4.91943 20.6042 5.13228 21.1181 5.51114 21.4969C5.89 21.8758 6.40384 22.0886 6.93963 22.0886H19.0608C19.5966 22.0886 20.1105 21.8758 20.4893 21.4969C20.8682 21.1181 21.081 20.6042 21.081 20.0684C21.081 18.9968 20.6554 17.9691 19.8976 17.2114C19.1399 16.4537 18.1122 16.028 17.0406 16.028Z"
                  stroke="#2B67E8"
                  stroke-width="1.51515"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p className="text-xl font-medium">{formatAddress(receiver)}</p>
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
