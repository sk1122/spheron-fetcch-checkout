export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')
  
    const myReq = await fetch(`${process.env.FETCCH_BASE_URL}/authentication/verify-address-or-did?address=${address}`, {
      method: "GET",
      headers: {
        "secret-key": process.env.FETCCH_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  
    let res = await myReq.json()
  
    console.log("ON server: ", res)
    return Response.json(res)
  }
  