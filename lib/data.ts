export type Token = {
  address: string
  name: string
  chainId: number
  symbol: string
  logoURI: string
}

export type Chain = {
  chainId: number
  logoURI: string
  name: string
  tokens: Token[]
}

export const evmChainData: Chain[] = [
  {
    chainId: 1,
    name: "Ethereum",
    logoURI: "/assets/tokens/ethereum.webp",
    tokens: [
      {
        name: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        chainId: 1,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chainId: 1,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        chainId: 1,
        symbol: "DAI",
        logoURI: "/assets/tokens/dai.webp",
      },
      {
        name: "Eth",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 1,
        symbol: "ETH",
        logoURI: "/assets/tokens/ethereum.webp",
      },
    ],
  },
  {
    chainId: 137,
    name: "Polygon",
    logoURI: "/assets/tokens/matic.webp",
    tokens: [
      {
        name: "USDC",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        chainId: 137,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        chainId: 137,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "DAI",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        chainId: 137,
        symbol: "DAI",
        logoURI: "/assets/tokens/dai.webp",
      },
      {
        name: "MATIC",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 137,
        symbol: "POL",
        logoURI: "/assets/tokens/matic.webp",
      },
    ],
  },
  {
    chainId: 43114,
    name: "Avalanche",
    logoURI: "/assets/tokens/avalanche.webp",
    tokens: [
      {
        name: "USDC",
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        chainId: 137,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        chainId: 137,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "DAI",
        address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
        chainId: 137,
        symbol: "DAI",
        logoURI: "/assets/tokens/dai.webp",
      },
      {
        name: "AVAX",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 137,
        symbol: "AVAX",
        logoURI: "/assets/tokens/avalanche.webp",
      },
    ],
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    logoURI: "/assets/tokens/arb.webp",
    tokens: [
      {
        name: "USDC",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        chainId: 42161,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        chainId: 42161,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 42161,
        symbol: "DAI",
        logoURI: "/assets/tokens/dai.webp",
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 42161,
        symbol: "ETH",
        logoURI: "/assets/tokens/ethereum.webp",
      },
    ],
  },
  {
    chainId: 10,
    name: "Optimism",
    logoURI: "/assets/tokens/opt.webp",
    tokens: [
      {
        name: "USDC",
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        chainId: 10,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        chainId: 10,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 10,
        symbol: "DAI",
        logoURI: "/assets/tokens/dai.webp",
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 10,
        symbol: "ETH",
        logoURI: "/assets/tokens/ethereum.webp",
      },
    ],
  },
]

export const solanaChainData: Chain[] = [
  {
    chainId: 12465,
    name: "Solana",
    logoURI: "/assets/tokens/solana.webp",
    tokens: [
      {
        name: "USDC",
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        chainId: 12465,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        chainId: 12465,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "SOL",
        address: "1111111111111111111111111111111111111111111",
        chainId: 12465,
        symbol: "SOL",
        logoURI: "/assets/tokens/solana.webp",
      },
    ],
  },
]

export const aptosChainData: Chain[] = [
  {
    chainId: 12466,
    name: "Aptos",
    logoURI: "/assets/tokens/aptos.webp",
    tokens: [
      {
        name: "USDC",
        address:
          "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
        chainId: 12466,
        symbol: "USDC",
        logoURI: "/assets/tokens/usdc.webp",
      },
      {
        name: "USDT",
        address:
          "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT",
        chainId: 12466,
        symbol: "USDT",
        logoURI: "/assets/tokens/usdt.webp",
      },
      {
        name: "APT",
        address: "1111111111111111111111111111111111111111111",
        chainId: 12466,
        symbol: "APT",
        logoURI: "/assets/tokens/aptos.webp",
      },
    ],
  },
]
