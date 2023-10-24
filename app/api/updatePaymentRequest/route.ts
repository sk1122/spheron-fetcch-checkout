export async function POST(req: Request) {
    const body = await req.json()
    // console.log("🍕 ", ownerAddress)
  
    const myReq = await fetch(
      `${process.env.FETCCH_BASE_URL}/transaction-request`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "secret-key": process.env.FETCCH_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
  
    const { data } = await myReq.json()
    return Response.json({ data })
  }
  