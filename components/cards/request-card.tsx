"use client"

import { useState } from "react"
import buildTransaction from "@/utils/buildTransaction"
import updatePaymentRequest from "@/utils/updatePaymentRequest"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, VersionedTransaction } from "@solana/web3.js"
import * as aptos from "aptos"
import base58 from "bs58"
import toast from "react-hot-toast"
import { formatUnits } from "viem"
import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useSwitchNetwork,
} from "wagmi"
import { number } from "zod"

import { Action, Request } from "@/types/request"
import { chainData, explorerLinks } from "@/lib/data"
import formatAddress from "@/lib/formatAddress"
import formatAmount from "@/lib/formatAmount"

import ConnectWalletButton from "../connect-wallet-button"
import ChainModal from "../modals/chain-modal"
import TokenModal from "../modals/token-modal"
import { useConnectedWallet } from "../providers/providers"

export default function RequestCard({ request }: { request: Request }) {
  const { connectedWallet } = useConnectedWallet()
  const {
    connected: isSolanaConnected,
    publicKey,
    sendTransaction,
  } = useWallet()
  const {
    connected: isAptosConnected,
    account,
    signAndSubmitBCSTransaction,
  } = useAptosWallet()
  const { address: accountAddress } = useAccount()
  const { chain: chainID } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { sendTransactionAsync } = useSendTransaction()

  const amount = formatUnits(
    BigInt(request?.actions[0].data?.amount?.amount),
    Number(request?.actions[0].data?.tokenData?.decimals)
  )

  const requestedChain = chainData.find(
    (chain) => chain.id === request?.actions[0]?.data?.chain
  )

  const requestedToken = requestedChain?.tokens.find(
    (token) => token.address === request?.actions[0]?.data?.token
  )

  return (
    <section className="mx-auto w-96 rounded-xl border border-primary bg-white px-4 py-6 text-left">
      <div className="relative">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 14.5V11C2 8.2 2 6.8 2.545 5.73C3.02436 4.78923 3.78923 4.02436 4.73 3.545C5.8 3 7.2 3 10 3H13.5C14.898 3 15.597 3 16.148 3.228C16.5121 3.37877 16.8429 3.59979 17.1216 3.87844C17.4002 4.15709 17.6212 4.48791 17.772 4.852C17.979 5.352 17.998 5.975 18 7.132M2 14.5C2 15.83 2 16.995 2.38 17.913C2.63139 18.5197 2.99984 19.071 3.46432 19.5353C3.92879 19.9996 4.48018 20.3678 5.087 20.619C6.005 21 7.17 21 9.5 21H14M2 14.5C2 12.17 2 11.005 2.38 10.087C2.63139 9.48 2.99995 8.92849 3.46461 8.46401C3.92926 7.99953 4.48091 7.63117 5.088 7.38C6.005 7 7.17 7 9.5 7H14.5C16.134 7 17.195 7.001 18 7.132M18 7.132C18.343 7.188 18.639 7.267 18.913 7.381C19.5196 7.63227 20.0708 8.00057 20.5351 8.46487C20.9994 8.92917 21.3677 9.48037 21.619 10.087C21.733 10.361 21.813 10.657 21.869 11M14 12H17"
                stroke="#193EFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.5"
                d="M22 19.126C21.5069 19.7838 20.9346 20.3783 20.296 20.896C20.2122 20.9636 20.1077 21.0003 20 21M20 21C19.895 21 19.791 20.965 19.704 20.896C19.0654 20.3783 18.4931 19.7838 18 19.126M20 21V15"
                stroke="#193EFF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-medium text-primary">Payment Request</p>
          </div>
          <img src={requestedChain?.logoURI} alt="" className="h-8 w-8" />
        </div>
        <p className="my-6 text-sm font-semibold text-[hsl(240,3%,19%)]">
          You requested {formatAmount(parseInt(amount))}{" "}
          {request?.actions[0]?.data?.tokenData?.symbol} on{" "}
          {requestedChain?.name}
        </p>
        <div className="">
          <p className="font-semibold text-gray-600">Requested amount</p>
          <div className="mt-3 flex items-center gap-2 border-b border-gray-200 pb-4">
            <img
              src={requestedToken?.logoURI}
              alt=""
              className="h-6 w-6 rounded-full md:h-10 md:w-10"
            />
            <p className="text-xl font-semibold md:text-4xl">
              {formatAmount(parseInt(amount))}
            </p>
          </div>
        </div>
        <div
          className={`${
            connectedWallet ? "hidden" : "block"
          } absolute inset-0 h-full w-full bg-white bg-opacity-40`}
        ></div>
      </div>
      <div className="mt-4">
        <button
          className="w-full rounded-full border border-[#2B67E8] bg-[#2B67E8] py-2 font-medium text-white"
          onClick={() => {
            {
              request.executed
                ? window.navigator.clipboard.writeText(
                    `${
                      explorerLinks[request?.actions[0]?.executionData?.chain]
                    }${request?.actions[0]?.executionData?.hash}`
                  )
                : window.navigator.clipboard.writeText(
                    `https://request.fetcch.xyz/request/${request.id}`
                  )
              toast.success("Copied link")
            }
          }}
        >
          Copy link
        </button>
      </div>
    </section>
  )
}
