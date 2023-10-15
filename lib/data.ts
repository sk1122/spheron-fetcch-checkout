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

export const chainData: Chain[] = [
  {
    chainId: 1,
    name: "Ethereum",
    logoURI:
      "https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
    tokens: [
      {
        name: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        chainId: 1,
        symbol: "USDC",
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      },
      {
        name: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chainId: 1,
        symbol: "USDT",
        logoURI:
          "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        name: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        chainId: 1,
        symbol: "DAI",
        logoURI:
          "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      },
      {
        name: "Eth",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 1,
        symbol: "ETH",
        logoURI:
          "https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
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
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      },
      {
        name: "USDT",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        chainId: 137,
        symbol: "USDT",
        logoURI:
          "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        name: "DAI",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        chainId: 137,
        symbol: "DAI",
        logoURI:
          "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
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
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      },
      {
        name: "USDT",
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        chainId: 137,
        symbol: "USDT",
        logoURI:
          "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        name: "DAI",
        address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
        chainId: 137,
        symbol: "DAI",
        logoURI:
          "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
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
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      },
      {
        name: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        chainId: 42161,
        symbol: "USDT",
        logoURI:
          "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 42161,
        symbol: "DAI",
        logoURI:
          "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 42161,
        symbol: "ETH",
        logoURI:
          "https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
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
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      },
      {
        name: "USDT",
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        chainId: 10,
        symbol: "USDT",
        logoURI:
          "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 10,
        symbol: "DAI",
        logoURI:
          "https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png",
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 10,
        symbol: "ETH",
        logoURI:
          "https://tokens-data.1inch.io/images/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      },
    ],
  },
]
