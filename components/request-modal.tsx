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
              receiver:
              requestAddress,
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
      <DialogContent className="w-full overflow-hidden p-6 sm:max-w-[392px] sm:rounded-[20px]">
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
            <DialogHeader className="flex w-full flex-row items-center justify-between">
              <DialogTitle className="font-manrope text-3xl font-extrabold">
                Request
              </DialogTitle>
              <DialogClose className="w-fit rounded-full border-2 border-primary p-2 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-primary data-[state=open]:text-primary">
                <X className="h-4 w-4 font-bold text-primary" strokeWidth={4} />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-col space-y-4 overflow-hidden">
              <div className="group overflow-hidden rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4 hover:bg-primary/50">
                <span className="px-4 font-manrope font-bold">To</span>
                <div className="flex items-center space-x-3 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#B0C8FE]">
                    <User className="h-4 w-4 stroke-primary" />
                  </div>
                  <input
                    className="pointer-events-none overflow-clip truncate border-none bg-transparent text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                    placeholder={
                      requestAddress.length > 0
                        ? requestAddress
                        : "steve.patrick@metamask"
                    }
                    readOnly
                  />
                </div>
              </div>
              <button
                className="group w-full text-left"
                onClick={() => setChainSelect(true)}
              >
                <div className="rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4 group-hover:bg-primary/50">
                  <span className="px-4 font-manrope font-bold">
                    Select Token
                  </span>
                  <div className="flex items-center space-x-3 p-4">
                    <div className="relative">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#B0C8FE]">
                        {tokenImg ? (
                          <Image
                            src={tokenImg}
                            alt="token_image"
                            priority
                            className="rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : null}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-[3E3ECFF] bg-[#B0C8FE]">
                        {chainImg ? (
                          <Image
                            src={chainImg}
                            alt="token_image"
                            priority
                            className="rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : null}
                      </div>
                    </div>
                    <input
                      className="pointer-events-none overflow-clip truncate border-none bg-transparent text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                      placeholder={`${selectedChainData[0].name} and ${selectedTokenData[0].name}`}
                      type="text"
                      readOnly
                    />
                  </div>
                </div>
              </button>
              <div className="rounded-xl border-2 border-primary bg-[#E3ECFF] pt-4">
                <span className="px-4 font-manrope font-bold">
                  Request Amount
                </span>
                <div className="flex items-center space-x-3 p-4">
                  <div className="relative">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-[#B0C8FE]">
                      {tokenImg ? (
                        <Image
                          src={tokenImg}
                          alt="token_image"
                          priority
                          className="rounded-full"
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-[3E3ECFF] bg-[#B0C8FE]">
                      {chainImg ? (
                        <Image
                          src={chainImg}
                          alt="token_image"
                          priority
                          className="rounded-full"
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full">
                    <input
                      className="overflow-clip truncate border-none bg-transparent text-lg text-primary outline-none placeholder:text-[#6893F0] focus:outline-none group-hover:placeholder:text-primary"
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => request()}
                className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-white"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RequestModal
