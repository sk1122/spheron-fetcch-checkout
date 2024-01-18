"use client"

import React, { useEffect, useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { Bell, ChevronDownIcon } from "lucide-react"

import NFTRequest from "./cards/nft-request"
import OtherRequest from "./cards/other-request"
import PaymentRequest from "./cards/payment-request"
import RequestCard from "./cards/request-card"

function PaymentRequests({ request }: { request: any }) {
  return (
    <>
      {request?.actions?.length > 0 &&
        request?.actions?.map((action: any) => {
          if (action?.type === "PAYMENT") {
            return (
              <PaymentRequest
                key={request?.id}
                id={request?.id}
                message={request?.message}
                action={action}
              />
            )
          }
        })}
    </>
  )
}

function NFTRequests({ request }: { request: any }) {
  return (
    <>
      {request?.actions?.length > 0 &&
        request?.actions?.map((action: any) => {
          if (action?.type === "PAYMENT") {
            return (
              <NFTRequest
                key={request?.id}
                id={request?.id}
                message={request?.message}
                action={action}
              />
            )
          }
        })}
    </>
  )
}

function OtherRequests({ request }: { request: any }) {
  return (
    <>
      {request?.actions?.length > 0 &&
        request?.actions?.map((action: any) => {
          if (action?.type === "PAYMENT") {
            return (
              <OtherRequest
                key={request?.id}
                id={request?.id}
                message={request?.message}
                action={action}
              />
            )
          }
        })}
    </>
  )
}

const Actions = ({ id }: { id: string }) => {
  const [request, setRequest] = useState<any>()

  useEffect(() => {
    fetch(`/api/getPaymentRequest?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setRequest(res.data)
        console.log(res.data)
        return
      })
  }, [id])

  return (
    <>
      {true ? (
        <div className="mx-auto mt-4 max-w-3xl">
          {/* <Accordion.Root type="single" collapsible>
            <Accordion.Item
              className="rounded-xl bg-[#3562FF] p-2"
              value="item-1"
            >
              <Accordion.Trigger className="flex w-full items-center justify-between px-2">
                <p className="text-left font-semibold text-white">
                  Payment Requestss
                </p>
                <ChevronDownIcon className="text-white" aria-hidden />
              </Accordion.Trigger>
              <Accordion.Content>
                <PaymentRequests request={request} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              className="mt-4 rounded-xl bg-[#F98430] p-2"
              value="item-2"
            >
              <Accordion.Trigger className="flex w-full items-center justify-between px-2">
                <p className="mx-2 text-left font-semibold text-white">NFT</p>
                <ChevronDownIcon className="text-white" aria-hidden />
              </Accordion.Trigger>
              <Accordion.Content>
                <NFTRequests request={request} />
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              className="mt-4 rounded-xl bg-[#3F2ABE] p-2"
              value="item-3"
            >
              <Accordion.Trigger className="flex w-full items-center justify-between px-2">
                <p className="mx-2 text-left font-semibold text-white">Other</p>
                <ChevronDownIcon className="text-white" aria-hidden />
              </Accordion.Trigger>
              <Accordion.Content>
                <OtherRequests request={request} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root> */}
          <RequestCard />
        </div>
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
