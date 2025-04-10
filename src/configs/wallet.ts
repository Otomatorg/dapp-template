import { createWallet, walletConnect } from 'thirdweb/wallets'

export enum EnumWallet {
  METAMASK = 'io.metamask',
  COINBASE = 'com.coinbase.wallet',
  RABBY = 'io.rabby',
}

export const wallets = [
  createWallet(EnumWallet.METAMASK),
  createWallet(EnumWallet.RABBY),
  walletConnect(),
]
