export enum EnumChain {
  ETHEREUM = 1,
  MODE = 34443,
  BASE = 8453,
  ARBITRUM = 42161,
  OASIS = 23294,
}

/**
 * Get all chain IDs from the EnumChain enum
 * @returns An array of chain IDs
 */
export function getAllChainIds(): number[] {
  return Object.values(EnumChain).filter((value) => typeof value === 'number') as number[]
}

/**
 * Get all chain names from the EnumChain enum
 * @returns An array of chain names
 */
export function getAllChainNames(): string[] {
  return Object.keys(EnumChain).filter((key) => isNaN(Number(key)))
}

/**
 * Get chain ID by chain name
 * @param chainName The name of the chain (e.g., 'ETHEREUM', 'BASE')
 * @returns The chain ID or undefined if not found
 */
export function getChainIdByName(chainName: string): number | undefined {
  return EnumChain[chainName as keyof typeof EnumChain]
}

/**
 * Get chain name by chain ID
 * @param chainId The ID of the chain (e.g., 1, 8453)
 * @returns The chain name or undefined if not found
 */
export function getChainNameById(chainId: number): string | undefined {
  return Object.keys(EnumChain).find((key) => EnumChain[key as keyof typeof EnumChain] === chainId)
}
