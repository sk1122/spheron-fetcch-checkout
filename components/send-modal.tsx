"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Close as DialogClose } from "@radix-ui/react-dialog"
import { useFilter } from "@react-aria/i18n"
import { Loader2, User, X } from "lucide-react"
import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react"
import * as aptos from "aptos"
import { useSwitchNetwork, useNetwork } from "wagmi"

import {
  aptosChainData,
  Chain,
  evmChainData,
  solanaChainData,
  Token,
} from "@/lib/data"
import ChainSelectModal from "@/components/chain-select-modal"
import TokensList from "@/components/token-list"

import { useConnectedWallet } from "./providers/providers"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { useWallet } from "@solana/wallet-adapter-react"
import { useSendTransaction, useAccount } from "wagmi"
import { Connection, VersionedTransaction } from "@solana/web3.js"
import base58 from "bs58"
import toast from "react-hot-toast"

const SendModal = ({
  open,
  setOpen,
  address,
  chain,
  token,
  amount,
  action,
  id
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  address: string,
  chain: Chain,
  token: Token,
  amount: string,
  action: any,
  id: string
}) => {
  const [chainSelect, setChainSelect] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chainData, setChainData] = useState<Chain[]>([...evmChainData,  ...solanaChainData, ...aptosChainData])
  const { addressChain, connectedWallet } = useConnectedWallet()

  const { address: accountAddress } = useAccount()
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

  const { sendTransactionAsync } = useSendTransaction()

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

  const searchParams = useSearchParams()

  const selectedChain = searchParams.get("chain")
  const selectedToken = searchParams.get("token")

  console.log(selectedChain, selectedToken, "dsa")

  let { contains } = useFilter({
    sensitivity: "base",
  })

  const selectedChainData: Chain[] =
    (selectedChain) ?
    chainData.filter((chain) => contains(chain.name, selectedChain)) : []

  let selectedTokenData: Token[] =
    ((selectedChainData &&
    selectedToken) ?
    selectedChainData[0].tokens.filter((token) =>
      contains(token.address, selectedToken)
    ) : []) ?? []

  if(!selectedTokenData) {
    selectedTokenData = [
      {
        address: token.address,
        name: token.name,
        logoURI: token.logoURI,
        chainId: token.chainId,
        symbol: token.symbol,
        decimals: 18
      }
    ]
  }

  const tokenImg = selectedTokenData && selectedTokenData[0]?.logoURI
  const chainImg = selectedChainData && selectedChainData[0]?.logoURI

  console.log("🔗 ", chainData[0].name)

  const { chains, pendingChainId, switchNetworkAsync } = useSwitchNetwork()
  const { chain: chainD } = useNetwork()

  const pay = async () => {
    setLoading(true)
    const toastId = toast.loading("Executing payment...")
    try {
      console.log({
        ...action.data,
        payer: connectedWallet === "evm" ? accountAddress : connectedWallet === "solana" ? publicKey?.toBase58() : account?.address.toString(),
        fromChain: selectedChainData[0].id,
        fromToken: (selectedTokenData![0] as Token).address
      })
      const req = await fetch("/api/buildTransaction", {
        method: "POST",
        body: JSON.stringify({
          actions: action.map((action: any) => ({
            ...action,
            data: {
              ...action.data,
              payer: connectedWallet === "evm" ? accountAddress : connectedWallet === "solana" ? publicKey?.toBase58() : account?.address.toString(),
              fromChain: selectedChainData[0].id,
              fromToken: (selectedTokenData![0] as Token).address
            }
          }))
        })
      })
  
      const res = await req.json()
  
      const transactions = res.data[0]
  
      console.log(res, transactions)
  
      for(let i = 0; i < transactions.length; i++) {
        const tx = transactions[i]
  
        console.log(tx, "transaction")
  
        let hash = ''
        if(connectedWallet === "evm") {
          if(chainD?.id !== selectedChainData[0].chainId) await switchNetworkAsync!(selectedChainData[0].chainId)
  
          console.log({
            ...tx.tx,
            gasPrice: undefined
          })
          const transaction = await sendTransactionAsync({
            ...tx.tx,
            gasPrice: undefined
          })
  
          console.log(transaction)
  
          hash = transaction.hash
        } else if (connectedWallet === "solana") {
          const txData = VersionedTransaction.deserialize(base58.decode(tx.tx))
          const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/LZLe8tHrIZ06MnZlxn-L4Fo5aj7iIdgI")
  
          const transaction = await sendTransaction!(txData, connection)
  
          console.log(transaction)
  
          hash = transaction
        } else if (connectedWallet === "aptos") {
          const txData = aptos.TxnBuilderTypes.RawTransaction.deserialize(
            new aptos.BCS.Deserializer(base58.decode(tx.tx))
          )
  
          const transaction = await signAndSubmitBCSTransaction(txData)
  
          console.log(transaction)
  
          hash = transaction
        }
  
        if(transactions.length === 1 || (tx.type && (tx.type === "PAYMENT_TOKEN" || tx.type === "OTHER" || tx.type === "PAYMENT_NATIVE"))) {
          await fetch("/api/updatePaymentRequest", {
            method: "POST",
            body: JSON.stringify({
              id: Number(id),
              payer: connectedWallet === "evm" ? accountAddress : connectedWallet === "solana" ? publicKey?.toBase58() : account?.address.toString(),
              actions: [{
                type: action[0].type,
                data: action[0].data,
                executionData: {
                  hash,
                  chain: chain.id,
                  timestamp: new Date().getTime() * 1000
                }
              }],
              executed: true
            })
          })
    
          toast.success("Payment successfully done!", {
            id: toastId
          })
          setOpen(false)
        }
      }
    } catch (e) {
      toast.error("Payment not successfully executed!", {
        id: toastId
      })
      setLoading(false)
    }

    setLoading(false)
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
                      address
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
                      placeholder={(selectedChainData.length > 0 && selectedTokenData.length > 0) ? `${selectedChainData[0].name} and ${selectedTokenData![0].name}` : "Select Chain and token"}
                      type="text"
                      readOnly
                    />
                  </div>
                </div>
              </button>
              <button onClick={() => pay()} className="w-full flex justify-center items-center rounded-full bg-primary py-4 text-white">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SendModal
