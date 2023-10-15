import { PublicKey } from "@solana/web3.js"
import { isAddress } from "viem"

export const verifyEvmAddress = (address: string) => {
  return isAddress(address.toLowerCase())
}

export const verifySolanaAddress = (address: string) => {
  try {
    const pubKey = new PublicKey(address)
    return PublicKey.isOnCurve(pubKey.toBuffer())
  } catch (e) {
    return false
  }
}

export const verifyAptosAddress = (address: string) => {
  try {
    if (address.startsWith("0x") && address.length === 66) return true
    return false
  } catch (e) {
    return false
  }
}

export const verifyAddress = (address: string): boolean => {
  if (verifyEvmAddress(address)) return true
  else if (verifySolanaAddress(address)) return true
  else if (verifyAptosAddress(address)) return true

  return false
}
