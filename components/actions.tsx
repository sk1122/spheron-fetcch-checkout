"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"

import NFTRequest from "./cards/nft-request"
import OtherRequest from "./cards/other-request"
import PaymentRequest from "./cards/payment-request"

function PaymentRequests({ request }: { request: any }) {
  return (
    <div className="rounded-xl bg-[#3562FF] p-2">
      <p className="mx-2 text-left font-semibold text-white">
        Payment Requests
      </p>
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
    </div>
  )
}

function NFTRequests({ request }: { request: any }) {
  return (
    <div className="mx-auto mt-4 max-w-3xl rounded-xl bg-[#F98430] p-2">
      <p className="mx-2 text-left font-semibold text-white">NFT</p>
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
    </div>
  )
}

function OtherRequests({ request }: { request: any }) {
  return (
    <div className="mx-auto mt-4 max-w-3xl rounded-xl bg-[#3F2ABE] p-2">
      <p className="mx-2 text-left font-semibold text-white">Other</p>
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
    </div>
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
          <PaymentRequests request={request} />
          <NFTRequests request={request} />
          <OtherRequests request={request} />
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
