export async function POST(req: Request) {
    const { actions } = await req.json()
    // console.log("🍕 ", ownerAddress)
  
    const myReq = await fetch(
      `${process.env.FETCCH_BASE_URL}/payment/build-transaction`,
      {
        method: "POST",
        body: JSON.stringify({
          actions
        }),
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
  