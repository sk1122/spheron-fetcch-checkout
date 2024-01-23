export async function POST(req: Request) {
  try {
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

      console.log(myReq, JSON.stringify(body), process.env.FETCCH_API_KEY, "req")
    
      const { data } = await myReq.json()
      console.log(data)
      return Response.json({ data })
  }  catch (e) {
    console.log(e, "1233")
  }
  }
  