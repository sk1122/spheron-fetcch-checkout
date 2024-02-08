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

import { Action, Request } from "@/types/request"
import { chainData, explorerLinks } from "@/lib/data"
import formatAddress from "@/lib/formatAddress"
import getViemPublicClient from "@/lib/getViemPublicClient"

import ConnectWalletButton from "../connect-wallet-button"
import ChainModal from "../modals/chain-modal"
import TokenModal from "../modals/token-modal"
import { useConnectedWallet } from "../providers/providers"

export default function PaymentCard({
  request,
  action,
}: {
  request: Request
  action: Action
}) {
  const [selectedChain, setSelectedChain] = useState(
    chainData.findIndex((chain) => chain.id === action?.data?.chain)
  )
  const [selectedToken, setSelectedToken] = useState(
    chainData[selectedChain].tokens.findIndex(
      (token) => token.address === action?.data?.token
    )
  )
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
  const [isExecuted, setIsExecuted] = useState(request?.executed || false)
  const [hash, setHash] = useState(request?.actions[0]?.executionData?.hash)

  const amount = formatUnits(
    BigInt(action.data?.amount?.amount),
    Number(action.data?.tokenData?.decimals)
  ).toString()

  const requestedChain = chainData.find(
    (chain) => chain.id === action?.data?.chain
  )

  const requestedToken = requestedChain?.tokens.find(
    (token) => token.address === action?.data?.token
  )

  async function handlePayment() {
    const toastId = toast.loading("Executing payment...")
    try {
      if (chainData[selectedChain].id === 7 && connectedWallet !== "solana") {
        toast.error("Connect your solana wallet")
        throw new Error("")
      } else if (
        chainData[selectedChain].id === 8 &&
        connectedWallet !== "aptos"
      ) {
        toast.error("Connect your aptos wallet")
        throw new Error()
      } else if (
        (chainData[selectedChain].id <= 6 ||
          chainData[selectedChain].id === 9) &&
        connectedWallet !== "evm"
      ) {
        toast.error("Connect your evm wallet")
        throw new Error()
      }

      const actions = request?.actions.map((action: any) => ({
        ...action,
        data: {
          ...action.data,
          payer:
            connectedWallet === "evm"
              ? accountAddress
              : connectedWallet === "solana"
                ? publicKey?.toBase58()
                : account?.address.toString(),
          fromChain: chainData[selectedChain].id,
          fromToken: chainData[selectedChain].tokens[selectedToken].address,
        },
      }))

      const data = await buildTransaction(actions)
      const transactions = data.data[0]

      for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i]

        console.log(tx, "transaction")

        if (connectedWallet === "evm") {
          if (chainID?.id !== chainData[selectedChain].chainId)
            await switchNetworkAsync!(chainData[selectedChain].chainId)

          console.log({
            ...tx.tx,
            gasPrice: undefined,
          })
          const transaction = await sendTransactionAsync({
            ...tx.tx,
            gasPrice: undefined,
          })

          const client = getViemPublicClient(selectedChain)

          await client.waitForTransactionReceipt({
            hash: transaction.hash,
          })

          setHash(transaction.hash)
        } else if (connectedWallet === "solana") {
          const txData = VersionedTransaction.deserialize(base58.decode(tx.tx))
          const connection = new Connection(
            "https://solana-mainnet.g.alchemy.com/v2/LZLe8tHrIZ06MnZlxn-L4Fo5aj7iIdgI"
          )
          const blockhash = await connection.getLatestBlockhash()
          txData.message.recentBlockhash = blockhash.blockhash

          const transaction = await sendTransaction!(txData, connection)

          console.log(transaction)

          setHash(transaction)
        } else if (connectedWallet === "aptos") {
          const txData = aptos.TxnBuilderTypes.RawTransaction.deserialize(
            new aptos.BCS.Deserializer(base58.decode(tx.tx))
          )

          const transaction = await signAndSubmitBCSTransaction(txData)

          setHash(transaction)
        }

        if (
          transactions.length === 1 ||
          (tx.type &&
            (tx.type === "PAYMENT_TOKEN" ||
              tx.type === "OTHER" ||
              tx.type === "PAYMENT_NATIVE"))
        ) {
          const actions = [
            {
              type: request?.actions[0].type,
              data: request?.actions[0].data,
              executionData: {
                hash,
                chain: chainData[selectedChain].id,
                timestamp: new Date().getTime() * 1000,
              },
            },
          ]
          const payer =
            connectedWallet === "evm"
              ? accountAddress
              : connectedWallet === "solana"
                ? publicKey?.toBase58()
                : account?.address.toString()

          const data = await updatePaymentRequest(request?.id, payer!, actions)

          if (data) {
            setIsExecuted(true)
          }

          toast.success("Payment successfully done!", {
            id: toastId,
          })
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Payment not successfully executed!", {
        id: toastId,
      })
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-xl border border-primary bg-white px-4 py-6 text-left">
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
          <img
            src={requestedChain?.logoURI}
            alt=""
            className="h-8 w-8 rounded-full"
          />
        </div>
        <p className="my-6 text-sm font-semibold text-[hsl(240,3%,19%)]">
          {formatAddress(request?.recevier?.owner)} requesting {amount}{" "}
          {action.data?.tokenData?.symbol} on {requestedChain?.name}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-600">Requested</p>
          <p className="font-semibold text-gray-600">Choose Token</p>
        </div>
        <div className="mt-3 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={requestedToken?.logoURI}
              alt=""
              className="h-6 w-6 rounded-full md:h-10 md:w-10"
            />
            <p className="text-xl font-semibold md:text-4xl">{amount}</p>
          </div>
          {requestedChain?.id === 8 ||
          requestedChain?.id === 9 ||
          isExecuted ? (
            <div className="flex items-center justify-between gap-2 rounded-full bg-[#EBEBEF] px-3 py-2">
              <img
                src={requestedToken?.logoURI}
                alt=""
                className="h-6 w-6 rounded-full"
              />
              <p className="font-medium">{requestedToken?.name}</p>
            </div>
          ) : (
            <TokenModal
              selectedChain={selectedChain}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
            />
          )}
        </div>
        <div className="mt-6 flex items-start justify-between border-b border-gray-200 pb-6">
          <div className="">
            <p className="md:text-md text-sm font-semibold">Choose Chain</p>
            <p className="max-w-28 text-xs md:max-w-xs md:text-sm">
              Select desired chain to send assets
            </p>
          </div>
          {requestedChain?.id === 8 ||
          requestedChain?.id === 9 ||
          isExecuted ? (
            <div className="flex items-center justify-between gap-2 rounded-full bg-[#EBEBEF] px-3 py-2">
              <img
                src={requestedChain?.logoURI}
                alt=""
                className="h-6 w-6 rounded-full"
              />
              <p className="font-medium">{requestedChain?.name}</p>
            </div>
          ) : (
            <ChainModal
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              setSelectedToken={setSelectedToken}
            />
          )}
        </div>
        <div
          className={`${
            connectedWallet ? "hidden" : "block"
          } absolute inset-0 h-full w-full bg-white bg-opacity-40`}
        ></div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end">
        {isExecuted ? (
          <div className="mb-2 w-full md:mb-0 md:pr-2">
            <button
              className={
                "border-gray-500] w-full rounded-full border bg-gray-500 py-2 font-medium text-white"
              }
              onClick={() => {
                window.navigator.clipboard.writeText(
                  `${explorerLinks[chainData[selectedChain].id]}${hash}`
                )
                toast.success("Copied link")
              }}
            >
              Copy Transaction Link
            </button>
          </div>
        ) : (
          <>
            {connectedWallet ? (
              <>
                <div className="mb-2 w-full md:mb-0 md:w-1/2 md:pr-2">
                  <button className="w-full rounded-full border border-gray-800 py-2 font-medium text-gray-800">
                    Decline
                  </button>
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <button
                    className="w-full rounded-full border border-[#2B67E8] bg-[#2B67E8] py-2 font-medium text-white"
                    onClick={handlePayment}
                  >
                    Pay
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full">
                <ConnectWalletButton />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
