export async function POST(req: Request) {
  const { ownerAddress, signature, timestamp } = await req.json()
  // console.log("🍕 ", ownerAddress)

  const myReq = await fetch(`${process.env.FETCCH_BASE_URL}/authentication`, {
    method: "POST",
    body: JSON.stringify({
      owner: ownerAddress,
      signature: signature,
      timestamp: timestamp,
    }),
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
