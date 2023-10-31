import { aptosChainData, evmChainData, solanaChainData } from "@/lib/data"

const getToken = async (address: string, id: number, rpc: string) => {
  if(address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      return {
          decimals: 18,
          logo: "",
          name: id === 1 || id === 5 || id === 6 ? "Ethereum" : id === 2 ? "Polygon" : id === 4 ? "Avalanche" : "BSC",
          symbol: id === 1 || id === 5 || id === 6 ? "ETH" : id === 2 ? "POL" : id === 4 ? "AVAX" : "BSC"
      }
  } else if (address == "1111111111111111111111111111111111111111111") {
      return {
          decimals: 9,
          logo: "",
          name: "Solana",
          symbol: "SOL"
      }
  } else if (address == "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>") {
      return {
          decimals: 10,
          logo: "",
          name: "Aptos",
          symbol: "APT"
      }
  }
  
  const reqs = await fetch(rpc, {
      method: "POST",
      body: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "alchemy_getTokenMetadata",
          "params": [
              `${address}`
          ],
          "id": 42
      })
  })

  const data = await reqs.json()

  console.log(data.result, rpc, address, "on server")
  if(data.result) {
      return data.result
  } else {
      const tokens = [...evmChainData.map(x => x.tokens), ...solanaChainData.map(x => x.tokens), ...aptosChainData.map(x => x.tokens)].flat()

      const token = tokens.find(token => token.address.toLowerCase() === address.toLowerCase())

      return {
          decimals: token?.decimals,
          name: token?.name,
          symbol: token?.symbol,
          logo: token?.logoURI
      }
  }
}

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
  
    let cachedTokens: any = {}
    const reqs = res.data

    for(let j = 0; j < reqs.actions.length; j++) {
      const action = reqs.actions[j].data
      const chain = [...evmChainData, ...solanaChainData].find(chain => chain.id === action.chain)!
      console.log(action.token, chain.id)
      if(cachedTokens[action.token]) {
        reqs.actions[j].data.tokenData = cachedTokens[action.token]
      } else {
          const data = await getToken(action.token, chain.id, chain.rpc)

          reqs.actions[j].data.tokenData = data

          cachedTokens[action.token] = reqs.actions[j].data.tokenData
      }
  }

    console.log("ON server: ", reqs.actions[0], cachedTokens)
    return Response.json({
      data: reqs
    })
  }
  