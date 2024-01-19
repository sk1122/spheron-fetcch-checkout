export default async function getPaymentRequestByID(id: string) {
  try {
    const res = await fetch(`/api/getPaymentRequest?id=${id}`)
    const data = await res.json()
    return data?.data
  } catch (error) {
    console.log(error)
  }
}