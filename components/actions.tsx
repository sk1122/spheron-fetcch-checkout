"use client"

// import SendPayment from "./send-payment";
import React, { useCallback, useEffect, useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import classNames from "classnames"
import { Bell, ChevronDownIcon, User } from "lucide-react"

import SendPayment from "@/components/send-payment"
import { Chain, Token, aptosChainData, evmChainData, solanaChainData } from "@/lib/data"
import SendModal from "./send-modal"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
        <p className="text-[32px] font-bold w-full truncate">{children}</p>
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={classNames("flex w-full flex-row items-center justify-between", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="flex w-full flex-row items-center justify-between">{children}</div>
    </Accordion.Content>
  )
)

const AccordionItem = ({
  receiver,
  amount,
  token,
  chain,
  action,
  id
}: {
  receiver: string
  amount: string
  token: string
  chain: number,
  action: any,
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
        if(token) {
                // evm
                const chainData = chain <= 6 ? evmChainData.find(data => data.id === chain) : chain === 7 ? solanaChainData[0] : aptosChainData[0]

                const tokenData = chainData!.tokens.find(tokenData => tokenData.address.toLowerCase() === token.toLowerCase())
                console.log(tokenData, "dsa")
                if(tokenData) {
                    setTokenData(tokenData)
                } else {
                    setTokenData({
                        address: token,
                        chainId: chainData!.chainId,
                        logoURI: "",
                        name: token,
                        symbol: token
                    })
                }

                setChainData(chainData)
        }
    }, [token])

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
        <AccordionTrigger><p className="w-48 md:w-full truncate">{receiver}</p></AccordionTrigger>
        <AccordionContent>
          <div className="flex h-full w-full flex-col items-start justify-start space-y-5">
            <div className="w-full h-full flex items-center space-x-3">
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
                <span className="text-xs md:text-sm w-48 md:w-full truncate">{receiver}</span>
              </div>
            </div>
            <div className="w-full flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B0C8FE] md:h-[60px] md:w-[60px]">
                  <User />
                </div>
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-400" />
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <h4 className="font-manrope text-sm font-bold md:text-base">
                    Chain & Amount
                    </h4>
                    <span className="w-full flex space-x-1 text-xs md:text-sm"><p>{amount}</p> <span className="w-20 truncate"> {tokenData?.name as string}</span></span>
                </div>
                <button onClick={() => {
                    router.push(
                        pathname + "?" + createQueryString("chain", chainData!.name) + "&" + createQueryString("token", tokenData!.address)
                    )
                    setOpenRequestModal(true)
                }} className="rounded-full border-none bg-primary px-4 py-2 text-sm text-white shadow-[inset_0px_6px_4px_0px_rgba(255,255,255,0.2)] outline-none focus-visible:outline-none md:px-7 md:py-4 md:text-base">
                    Pay
                </button>
              </div>
            </div>
          </div>
          {/* {openRequestModal &&  */}
            <SendModal id={id} open={openRequestModal} setOpen={setOpenRequestModal} address={receiver} token={tokenData ? tokenData : { address: token, name: token, chainId: chain, logoURI: "", symbol: token }} amount={amount} chain={chainData!} action={action} />
          {/* } */}
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

const Actions = ({
  id,
}: {
  id: string
}) => {
    const [actions, setActions] = useState<{ receiver: string; amount: string; token: string; chain: number }[]>([])
    const [originalActions, setOriginalActions] = useState<any[]>()

    useEffect(() => {
        fetch(`/api/getPaymentRequest?id=${id}`).then(res => res.json()).then(res => {
            console.log("RES: ", res)

            setActions(res.data.actions.filter((action: any) => action.type === "PAYMENT").map((action: any) => ({
                receiver: action.data.receiver,
                amount: action.data.amount.amount,
                token: action.data.token,
                chain: Number(action.data.chain)
            })))

            setOriginalActions(res.data.actions.filter((action: any) => action.type === "PAYMENT").map((action: any) => ({ data: action.data, type: action.type })))

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
                <AccordionItem {...action} action={originalActions} id={id} />
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
