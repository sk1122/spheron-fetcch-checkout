"use client"

import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useDetailStore from "@/store"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useFilter } from "@react-aria/i18n"
import { useWallet } from "@solana/wallet-adapter-react"
import base58 from "bs58"
import { Loader2, User, X } from "lucide-react"
import toast from "react-hot-toast"
import { parseUnits } from "viem"
import { useAccount, useNetwork, useSignMessage, useSwitchNetwork } from "wagmi"

import {
  aptosChainData,
  Chain,
  evmChainData,
  solanaChainData,
} from "@/lib/data"
import formatAddress from "@/lib/formatAddress"
import ChainSelectModal from "@/components/chain-select-modal"
import TokensList from "@/components/token-list"

import { useConnectedWallet } from "./providers/providers"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

const RequestModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [chainSelect, setChainSelect] = useState(false)
  const [chainData, setChainData] = useState<Chain[]>([
    ...evmChainData,
    ...solanaChainData,
    ...aptosChainData,
  ])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { addressChain, connectedWallet, setRequests, token } =
    useConnectedWallet()
  const {
    requestAddress,
    setAmount,
    amount,
    chain: selectedChain,
    token: selectedToken,
  } = useDetailStore()

  useEffect(() => {
    console.log("addressChain: ", addressChain)
    if (addressChain === "evm") {
      setChainData(evmChainData)
    } else if (addressChain === "solana") {
      setChainData(solanaChainData)
    } else if (addressChain === "aptos") {
      setChainData(aptosChainData)
    }
  }, [addressChain, open])

  let { contains } = useFilter({
    sensitivity: "base",
  })

  const selectedChainData = selectedChain
    ? chainData.filter((chain) =>
        contains(chain.name.toLowerCase(), selectedChain.toLowerCase())
      )
    : chainData

  const selectedTokenData =
    selectedChainData && selectedToken
      ? selectedChainData[0].tokens.filter((token) =>
          contains(token.address, selectedToken)
        )
      : selectedChainData[0].tokens

  const tokenImg = selectedTokenData && selectedTokenData[0]?.logoURI
  const chainImg = selectedChainData && selectedChainData[0]?.logoURI
  const chainName = selectedChainData && selectedChainData[0]?.name

  console.log("🔗 ", chainData[0].name)

  const { chains, pendingChainId, switchNetworkAsync } = useSwitchNetwork()
  const { chain: chainD } = useNetwork()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { signMessage, publicKey } = useWallet()
  const { signMessage: signAptosMessage, account } = useAptosWallet()

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

  const request = async () => {
    try {
      setLoading(true)
      let request: any = {
        // receiver: connectedWallet === "evm" ? address : connectedWallet === "solana" ? publicKey?.toBase58() : account?.address.toString(),
        receiver: requestAddress,
        // payer: searchParams.get("address"),
        actions: [
          {
            type: "PAYMENT",
            data: {
              token: selectedTokenData[0].address,
              chain: selectedChainData[0].id,
              receiver: requestAddress,
              amount: {
                amount: parseUnits(
                  amount,
                  selectedTokenData[0].decimals
                ).toString(),
                currency: "CRYPTO",
              },
            },
          },
        ],
        message: "Message from request.fetcch.xyz",
        label: "request.fetcch.xyz",
      }

      // const req = await fetch("/api/generateMessage", {
      //   method: "POST",
      //   body: JSON.stringify(request),
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // })

      // const res = await req.json()

      // const message = res.data.data.message
      // const timestamp = res.data.data.timestamp

      // console.log(res, message)

      // let hash = ""
      // if (connectedWallet === "evm") {
      //   if (chainD?.id !== selectedChainData[0].chainId)
      //     await switchNetworkAsync!(selectedChainData[0].chainId)
      //   console.log(message, "MESSAFGE")
      //   const signature = await signMessageAsync({
      //     message: message,
      //   })

      //   console.log(signature)

      //   hash = signature
      // } else if (connectedWallet === "solana") {
      //   const signature = base58.encode(
      //     await signMessage!(Buffer.from(message))
      //   )

      //   console.log(signature)

      //   hash = signature
      // } else if (connectedWallet === "aptos") {
      //   const signature =
      //     "0x" +
      //     (await signAptosMessage({
      //       message: message,
      //       nonce: timestamp,
      //     })!)!.signature

      //   console.log(signature)

      //   hash = signature
      // }

      // request.signature = hash

      const req2 = await fetch("/api/createRequest", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "content-type": "application/json",
        },
      })

      const res2 = await req2.json()

      if (req2.status >= 200 && req2.status <= 299) {
        toast.success(`Request successfully created with id ${res2.data.id}!`)
        fetchPendingRequests()
        navigator.clipboard.writeText(
          `https://request.fetcch.xyz/request/${res2.data.id}`
        )
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full overflow-hidden p-6 sm:max-w-[444px] sm:rounded-[20px]">
        {chainSelect ? (
          <ChainSelectModal chains={chainData} setOpen={setChainSelect}>
            <TokensList
              chains={chainData}
              selectedChain={
                selectedChainData ? selectedChainData[0] : chainData[0]
              }
              setSelectToken={setChainSelect}
            />
          </ChainSelectModal>
        ) : (
          <>
            <DialogHeader className="flex w-full flex-row items-center justify-between border-b border-gray-200 pb-2">
              <DialogTitle className="font-manrope text-3xl font-extrabold">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary bg-opacity-20 p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.66675 12.0833V9.16667C1.66675 6.83311 1.66675 5.66634 2.12089 4.77504C2.52036 3.99103 3.15778 3.35361 3.94179 2.95414C4.83309 2.5 5.99986 2.5 8.33341 2.5H11.2501C12.4149 2.5 12.9974 2.5 13.4568 2.6903C14.0694 2.94404 14.556 3.43072 14.8098 4.04329C14.9826 4.46043 14.9985 4.97895 14.9999 5.94275M1.66675 12.0833C1.66675 13.1914 1.66675 14.1621 1.98392 14.9278C2.40681 15.9488 3.21795 16.7599 4.2389 17.1828C5.00461 17.5 5.97532 17.5 7.91675 17.5H11.9835M1.66675 12.0833C1.66675 10.1419 1.66675 9.1712 1.98392 8.40549C2.40681 7.38453 3.21795 6.57339 4.2389 6.1505C5.00461 5.83333 5.97532 5.83333 7.91675 5.83333H12.0834C13.445 5.83333 14.3291 5.83333 14.9999 5.94275M14.9999 5.94275C15.2856 5.98934 15.5326 6.05578 15.7613 6.1505C16.7822 6.57339 17.5934 7.38453 18.0162 8.40549C18.2231 8.90492 18.2951 9.49156 18.3201 10.3779"
                        stroke="#193EFF"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.6667 10H14.1667M14.5238 15.343C15.0525 14.638 15.6659 14.0013 16.3498 13.4472C16.4423 13.3722 16.5545 13.3348 16.6666 13.3348M18.8095 15.343C18.2807 14.638 17.6674 14.0013 16.9835 13.4472C16.891 13.3722 16.7788 13.3348 16.6666 13.3348M16.6666 13.3348V18.3348"
                        stroke="#758BFF"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-base font-medium text-primary">Request</p>
                </div>
              </DialogTitle>
              <DialogClose className="w-fit rounded-full bg-primary bg-opacity-20 p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-primary data-[state=open]:text-primary">
                <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col space-y-4 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h6 className="text-sm font-semibold">To</h6>
                  <p className="text-xs">your address</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#BDBDBD] bg-[#EBEBEF] px-3 py-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.394 2.00004C14.6169 1.99957 15.4591 1.99925 16.2289 2.25187C16.9078 2.47465 17.5315 2.83899 18.0581 3.32094C18.6556 3.86779 19.0653 4.60091 19.6584 5.6621L21.3008 8.59836C21.8523 9.58327 22.234 10.2651 22.3913 11.0054C22.5302 11.6587 22.536 12.3331 22.4086 12.9887C22.2641 13.7316 21.8942 14.4199 21.36 15.4141L20.7914 16.4731C20.7865 16.4822 20.7815 16.4912 20.7764 16.5001L19.6666 18.4222C19.0679 19.46 18.6543 20.177 18.0595 20.7112C17.5351 21.182 16.9172 21.5374 16.2461 21.7546C15.4853 22.0009 14.6553 22.0006 13.4501 22.0001L10.584 22.0001C9.36109 22.0006 8.51896 22.0009 7.74911 21.7483C7.07021 21.5255 6.44652 21.1612 5.91994 20.6792C5.32244 20.1324 4.91273 19.3993 4.31968 18.3381L2.71079 15.4619C2.14864 14.4578 1.75951 13.7628 1.60335 13.0087C1.46555 12.3433 1.46555 11.6569 1.60335 10.9915C1.75951 10.2374 2.14864 9.54235 2.71079 8.53829L4.31967 5.66209C4.91272 4.60091 5.32244 3.86779 5.91994 3.32094C6.44652 2.83899 7.07021 2.47465 7.74911 2.25187C8.51896 1.99925 9.36109 1.99957 10.584 2.00004L13.394 2.00004ZM9.25 9.00012C9.25 7.48134 10.4812 6.25012 12 6.25012C13.5188 6.25012 14.75 7.48134 14.75 9.00012C14.75 10.5189 13.5188 11.7501 12 11.7501C10.4812 11.7501 9.25 10.5189 9.25 9.00012ZM7.25 16.0001C7.25 14.4813 8.48122 13.2501 10 13.2501H14C15.5188 13.2501 16.75 14.4813 16.75 16.0001C16.75 16.9666 15.9665 17.7501 15 17.7501H9C8.0335 17.7501 7.25 16.9666 7.25 16.0001Z"
                      fill="#193EFF"
                    />
                  </svg>
                  <p className="text-[#656565]">
                    {requestAddress.length > 0
                      ? formatAddress(requestAddress)
                      : "steve.patrick@metamask"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h6 className="text-sm font-semibold">Select Token</h6>
                  <p className="text-xs">Choose desired chain and tokens</p>
                </div>
                <div
                  className="flex w-40 cursor-pointer items-center justify-between rounded-full border border-[#BDBDBD] bg-[#F8F8F8] px-3 py-2"
                  onClick={() => setChainSelect(true)}
                >
                  <div className="flex items-center gap-2">
                    {tokenImg ? (
                      <Image
                        src={tokenImg}
                        alt="token_image"
                        priority
                        className="rounded-full"
                        width={24}
                        height={24}
                      />
                    ) : null}
                    <p className="text-sm font-semibold">{chainName}</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10.14C9.05663 11.5955 10.3015 12.9046 11.702 14.033C11.877 14.174 12.122 14.174 12.298 14.033C13.6985 12.9046 14.9434 11.5955 16 10.14"
                      stroke="#9E9E9E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h6 className="text-sm font-semibold">Request Amount</h6>
                  <p className="text-xs">Enter the amount to be requested</p>
                </div>
                <div className="flex w-40 items-center gap-2 rounded-full border border-[#BDBDBD] bg-[#F8F8F8] px-3 py-2">
                  {tokenImg ? (
                    <Image
                      src={tokenImg}
                      alt="token_image"
                      priority
                      className="rounded-full"
                      width={24}
                      height={24}
                    />
                  ) : null}
                  <input
                    type="text"
                    className="w-24 bg-transparent outline-none"
                    placeholder="0"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-end border-t border-gray-200 pt-3">
                <div className="mb-2 w-full md:mb-0 md:w-1/2 md:pr-2">
                  <button className="w-full rounded-full border border-gray-800 py-2 font-medium text-gray-800">
                    Decline
                  </button>
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <button
                    className="w-full rounded-full border border-[#2B67E8] bg-[#2B67E8] py-2 font-medium text-white"
                    onClick={request}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RequestModal
