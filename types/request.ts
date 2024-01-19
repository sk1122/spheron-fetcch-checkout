export interface Request {
  id: number
  payerId: any
  receiverId: number
  actions: Action[]
  executed: boolean
  label: string
  message: string
  updated: boolean
  metadata: any
  executedAt: string
  requestedAt: string
  sessionId: any
  payer: any
  recevier: Recevier
}

export interface Action {
  executionData: any
  data: Data
  type: string
}

export interface Data {
  chain: number
  token: string
  amount: Amount
  receiver: string
  tokenData: TokenData
}

export interface Amount {
  amount: string
  currency: string
}

export interface TokenData {
  decimals: number
  logo: string
  name: string
  symbol: string
}

export interface Recevier {
  id: number
  ownerId: any
  owner: string
  updatedAt: string
  createdAt: string
}
