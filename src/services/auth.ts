import { IGetTokenModel } from '@/models/auth.model'
import { api } from './axios.config'

export const generatePayload = (model: { chainId: number; address: string }) => {
  return api.post('/auth/generate-payload', model)
}

export const getToken = (body: IGetTokenModel): Promise<{ data: { token: string } }> => {
  return api.post('/auth/token', body)
}

export const verifyToken = (
  token: string,
): Promise<{ data: { isValid: boolean; error?: string } }> => {
  return api.post('/auth/verify-token', { token })
}

export const verifyWalletAddress = (address: string) => {
  return api.post(
    '/auth/verify-wallet-address',
    { walletAddress: address },
    {
      headers: {
        Authorization: '',
      },
    },
  )
}
