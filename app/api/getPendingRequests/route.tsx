import { aptosChainData, evmChainData, solanaChainData } from "@/lib/data"

const getToken = async (address: string, rpc: string) => {
    if(address == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        return {
            decimals: 18,
            logo: "",
            name: "Ethereum",
            symbol: "ETH"
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
    const address = searchParams.get('address')
    const accessToken = searchParams.get("accessToken")
    console.log("🍕 ", address, accessToken, `${process.env.FETCCH_BASE_URL}/transaction-request?payer=${address}`)
  
    const myReq = await fetch(`${process.env.FETCCH_BASE_URL}/transaction-request?payer=${address}`, {
      method: "GET",
      headers: {
        "secret-key": process.env.FETCCH_API_KEY,
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  
    let res = await myReq.json()

    let cachedTokens: any = {}
    for(let i = 0; i < res.data.length; i++) {
        const req = res.data[i]
        for(let j = 0; j < req.actions.length; j++) {
            const action = req.actions[j].data
            if(action.chain === 8 || action.chain === 4) continue
            const chain = [...evmChainData, ...solanaChainData].find(chain => chain.id === action.chain)!

            if(cachedTokens[action.token]) {
                req.actions[j].data.tokenData = cachedTokens[action.token]
            } else {
                const data = await getToken(action.token, chain.rpc)

                req.actions[j].data.tokenData = data

                cachedTokens[action.token] = req.actions[j].data.tokenData
            }
        }
    }
  
    console.log("ON server: ", res)
    return Response.json(res)
  }
  