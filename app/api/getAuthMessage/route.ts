export async function POST(req: Request) {
  const { ownerAddress } = await req.json()
  // console.log("🍕 ", ownerAddress)

  const myReq = await fetch(
    `${process.env.FETCCH_BASE_URL}/authentication/generate-message`,
    {
      method: "POST",
      body: JSON.stringify({
        owner: ownerAddress,
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
