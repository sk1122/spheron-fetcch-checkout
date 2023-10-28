export async function POST(req: Request) {
    const body = await req.json()
  
    const myReq = await fetch(
      `${process.env.FETCCH_BASE_URL}/transaction-request/generate-message`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "secret-key": process.env.FETCCH_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
  
    console.log("ON SERVER: ", myReq)
    const data = await myReq.json()

    return Response.json({ data })
  }
  