export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    // console.log("🍕 ", ownerAddress)
  
    const myReq = await fetch(`${process.env.FETCCH_BASE_URL}/transaction-request?id=${id}`, {
      method: "GET",
      headers: {
        "secret-key": process.env.FETCCH_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  
    const res = await myReq.json()
  
    console.log("ON server: ", res)
    return Response.json(res)
  }
  