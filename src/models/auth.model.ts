export interface IGetTokenModel {
  walletAddress: string // Get from zerodev when creating kernelAccount
  ownerWalletAddress: string // Get from wallet of usePrivy()
  accessToken: string // Get from getAccessToken() of usePrivy()
}
