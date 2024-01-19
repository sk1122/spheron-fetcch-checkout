export default async function Subscribe(email: string) {
  try {
    const res = await fetch("https://wallet-api.fetcch.xyz/add-email-for-website", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}