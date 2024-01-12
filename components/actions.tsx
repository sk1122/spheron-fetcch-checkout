"use client"

// import SendPayment from "./send-payment";
import React, { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as Accordion from "@radix-ui/react-accordion"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import classNames from "classnames"
import { Bell, ChevronDownIcon, User } from "lucide-react"
import { formatUnits } from "viem"

import {
  aptosChainData,
  Chain,
  evmChainData,
  solanaChainData,
  Token,
} from "@/lib/data"

import NFTRequest from "./cards/nft-request"
import OtherRequest from "./cards/other-request"
import PaymentRequest from "./cards/payment-request"
import ConnectWalletButton from "./connect-wallet-button"
import { useConnectedWallet } from "./providers/providers"
import SendModal from "./send-modal"

function PaymentRequests() {
  return (
    <div className="container mx-auto rounded-xl bg-[#3562FF] p-2">
      <p className="mx-2 font-semibold text-white">Payment Requests</p>
      <PaymentRequest />
    </div>
  )
}

function NFTRequests() {
  return (
    <div className="container mx-auto rounded-xl bg-[#F98430] p-2">
      <p className="mx-2 font-semibold text-white">NFT</p>
      <NFTRequest />
    </div>
  )
}

function OtherRequests() {
  return (
    <div className="container mx-auto rounded-xl bg-[#3F2ABE] p-2">
      <p className="mx-2 font-semibold text-white">Other</p>
      <OtherRequest />
    </div>
  )
}

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="flex w-full flex-row items-center justify-between">
      <Accordion.Trigger
        className={classNames(
          "flex w-full flex-row items-center justify-between",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <p className="w-full truncate text-[32px] font-bold">{children}</p>
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        "flex w-full flex-row items-center justify-between",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="flex w-full flex-row items-center justify-between">
        {children}
      </div>
    </Accordion.Content>
  )
)

const AccordionItem = ({
  receiver,
  message,
  label,
  amount,
  token,
  chain,
  action,
  id,
}: {
  receiver: string
  message: string
  label: string
  amount: string
  token: string
  chain: number
  action: any
  id: string
}) => {
  const [tokenData, setTokenData] = useState<Token>()
  const [chainData, setChainData] = useState<Chain>()
  const [openRequestModal, setOpenRequestModal] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    console.log(action, "ACTION")
    if (token) {
      const chainData = [
        ...evmChainData,
        ...solanaChainData,
        ...aptosChainData,
      ].find((chain) => chain.id === action[0].data.chain)

      setTokenData(action[0].data.tokenData)
      console.log(action[0].data.tokenData)
      setChainData(chainData)
    }
  }, [token])

  const { connectedWallet } = useConnectedWallet()

  return (
    <Accordion.Root
      className="h-full w-full duration-300"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item
        className="mx-auto flex h-full w-full flex-col items-start justify-start space-y-5 rounded-xl border border-primary bg-[#E1EBFF] p-5 shadow-[0px_0px_35px_-9px_rgba(0,0,0,0.25)] md:w-[694px]"
        value="item-1"
      >
        <AccordionTrigger>
          <p className="w-48 truncate md:w-full">
            {label} - {tokenData?.symbol as string}
          </p>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex h-full w-full flex-col items-start justify-start space-y-5">
            <div className="flex h-full w-full items-center space-x-3">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
                  <User />
                </div>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="font-manrope text-sm font-bold md:text-base">
                  Receipient
                </h4>
                <span className="w-48 truncate text-xs md:w-full md:text-sm">
                  {receiver}
                </span>
              </div>
            </div>
            <div className="flex w-full items-center space-x-3">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
                  <User />
                </div>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-fit flex-col items-start">
                  <h4 className="font-manrope text-sm font-bold md:text-base">
                    Chain & Amount
                  </h4>
                  <span className="flex w-full space-x-1 text-xs md:text-sm">
                    <p>
                      {formatUnits(BigInt(amount), Number(tokenData?.decimals))}
                    </p>{" "}
                    <span className="flex w-20 items-start justify-start truncate">
                      {" "}
                      {tokenData?.symbol as string}
                    </span>
                  </span>
                </div>
                {connectedWallet ? (
                  <button
                    onClick={() => {
                      router.push(
                        pathname +
                          "?" +
                          createQueryString("chain", chainData!.name) +
                          "&" +
                          createQueryString("token", action[0].data.token)
                      )
                      setOpenRequestModal(true)
                    }}
                    className="rounded-full border-none bg-primary px-4 py-2 text-sm text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] outline-none focus-visible:outline-none md:px-7 md:py-4 md:text-base"
                  >
                    Pay
                  </button>
                ) : (
                  <ConnectWalletButton />
                )}
              </div>
            </div>
          </div>
          {/* {openRequestModal &&  */}
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
          {/* } */}
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

const Actions = ({ id }: { id: string }) => {
  const [actions, setActions] = useState<
    { receiver: string; amount: string; token: string; chain: number }[]
  >([])
  const [originalActions, setOriginalActions] = useState<any[]>()
  const [request, setRequest] = useState<any>()

  useEffect(() => {
    fetch(`/api/getPaymentRequest?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("RES: ", res)

        setActions(
          res.data.actions
            .filter((action: any) => action.type === "PAYMENT")
            .map((action: any) => ({
              receiver: action.data.receiver,
              amount: action.data.amount.amount,
              token: action.data.token,
              chain: Number(action.data.chain),
            }))
        )

        setRequest(res.data)

        console.log(
          res.data.actions
            .filter((action: any) => action.type === "PAYMENT")
            .map((action: any) => ({
              receiver: action.data.receiver,
              amount: action.data.amount.amount,
              token: action.data.token,
              chain: Number(action.data.chain),
            }))
        )

        setOriginalActions(
          res.data.actions
            .filter((action: any) => action.type === "PAYMENT")
            .map((action: any) => ({ data: action.data, type: action.type }))
        )

        return
      })
  }, [id])

  return (
    <>
      {true ? (
        <ScrollArea.Root className="mx-auto mt-7 h-96 max-w-3xl">
          <ScrollArea.Viewport className="h-full w-full rounded">
            <div className="flex flex-col space-y-3">
              {actions.map((action) => (
                <AccordionItem
                  {...action}
                  message={request.message}
                  label={request.label}
                  action={originalActions}
                  id={id}
                />
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

export default Actions
