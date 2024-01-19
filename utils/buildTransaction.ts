export default async function buildTransaction(actions: any[]) {
  try {
    const res = await fetch("/api/buildTransaction", {
      method: "POST",
      body: JSON.stringify({
        actions: actions
      }),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}