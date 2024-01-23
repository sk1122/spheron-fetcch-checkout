"use client"

import { useEffect, useState } from "react"
import getPaymentRequestByID from "@/utils/getPaymentRequestByID"
import { Bell } from "lucide-react"

import { Request } from "@/types/request"

import PaymentCard from "./cards/payment-card"
import RequestCard from "./cards/request-card"

const Actions = ({ id }: { id: string }) => {
  const [request, setRequest] = useState<null | Request>(null)

  async function handleRequest() {
    const requestData = await getPaymentRequestByID(id)
    console.log(requestData)
    setRequest(requestData)
  }

  useEffect(() => {
    handleRequest()
  }, [])

  if (!request) return

  return (
    <>
      <div className="mt-8">
        {request && (
          <PaymentCard request={request} action={request.actions[0]} />
        )}
      </div>
      {request && request?.actions?.length > 1 && (
        <>
          <div className="mx-auto my-10 flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-neutral-200 px-7 py-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.928 11H16.923C16.8018 11 16.6818 11.0239 16.5698 11.0703C16.4578 11.1166 16.356 11.1846 16.2703 11.2703C16.1846 11.356 16.1166 11.4578 16.0703 11.5698C16.0239 11.6818 16 11.8018 16 11.923C16 13.623 14.622 15 12.923 15H11.077C10.2609 15 9.47828 14.6758 8.90123 14.0988C8.32418 13.5217 8 12.7391 8 11.923C8 11.6782 7.90276 11.4434 7.72966 11.2703C7.55656 11.0972 7.32179 11 7.077 11H2.072M21.928 11C21.9111 10.9391 21.8915 10.879 21.869 10.82C21.814 10.674 21.735 10.537 21.579 10.262L19.843 7.225C19.172 6.05 18.836 5.463 18.364 5.035C17.947 4.65721 17.4549 4.37165 16.92 4.197M21.928 11C21.9481 11.0724 21.9641 11.1458 21.976 11.22C22 11.375 22 11.533 22 11.85V12C22 14.8 22 16.2 21.455 17.27C20.9756 18.2108 20.2108 18.9756 19.27 19.455C18.2 20 16.8 20 14 20H10C7.2 20 5.8 20 4.73 19.455C3.78923 18.9756 3.02436 18.2108 2.545 17.27C2 16.2 2 14.8 2 12V11.85C2 11.533 2 11.375 2.024 11.22C2.03586 11.1458 2.05188 11.0724 2.072 11M2.072 11C2.08881 10.9391 2.1085 10.879 2.131 10.82C2.186 10.674 2.265 10.537 2.421 10.262L4.157 7.225C4.828 6.05 5.164 5.463 5.636 5.035C6.05303 4.65721 6.54508 4.37165 7.08 4.197M10 7.126C10.4931 7.7838 11.0654 8.37828 11.704 8.896C11.791 8.965 11.895 9 12 9M12 9C12.1077 9.00034 12.2122 8.96362 12.296 8.896C12.9346 8.37828 13.5069 7.7838 14 7.126M12 9V4"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-medium text-neutral-700">Pending Requests</p>
          </div>
          <div className="container mx-auto mb-20 flex flex-wrap items-center justify-between">
            {request?.actions?.map((action, index) => {
              if (index === 0) return
              return <PaymentCard request={request} action={action} />
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Actions