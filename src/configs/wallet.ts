import { createWallet, inAppWallet, walletConnect } from 'thirdweb/wallets'

export enum EnumWallet {
  METAMASK = 'io.metamask',
  COINBASE = 'com.coinbase.wallet',
  RABBY = 'io.rabby',
}

export const wallets = [
  inAppWallet({
    auth: {
      options: ['google'],
    },
  }),
  createWallet(EnumWallet.METAMASK),
  createWallet(EnumWallet.RABBY),
  walletConnect(),
]
