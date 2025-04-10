import { api } from './axios.config'

export const registerUserEmail = (email: string) => {
  return api.patch('/users/me', { email })
}

export const getBalanceByChainAndSymbol = (chainId: number, tokenSymbol: string) => {
  return api.get('/users/me/balances', { params: { chainId, tokenSymbol } })
}

export const getUserDetails = () => api.get('/users/me')

export const acceptTermsOfUse = () => {
  return api.patch('/users/me/', { hasAcceptedTerm: true })
}

export const getIntegrations = (blockId?: number) => {
  return api.get(blockId ? `/integrations/blocks/${blockId}` : '/integrations/blocks')
}

export const getWalletBalances = () => api.get('/users/me/balances')
