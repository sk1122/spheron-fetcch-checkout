export default async function updatePaymentRequest(id: string, payer: string, actions: any[]) {
  try {
    const res = await fetch("/api/updatePaymentRequest", {
      method: "POST",
      body: JSON.stringify({
        id: Number(id),
        payer: payer,
        actions: actions,
        executed: true,
      })
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}