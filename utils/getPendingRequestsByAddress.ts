export default async function getPendingRequestsByAddress(address: string) {
  try {
    const res = await fetch(`/api/getPendingRequests?address=${address}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}