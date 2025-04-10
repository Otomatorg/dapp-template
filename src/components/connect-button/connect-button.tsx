import IconChevronDown from '@/assets/icons/ic-chevron-down.svg'
import IconConnectWallet from '@/assets/icons/ic-connect-wallet.svg'
import { EnumChain, getAllChainIds } from '@/configs/chain'
import { client } from '@/configs/client'
import { wallets } from '@/configs/wallet'
import { decodeJWTAndCheckValidity, useAuthContext } from '@/context/auth-context'
import { setAxiosAuthorization } from '@/services/axios.config'
import clsx from 'clsx'
import { apiServices } from 'otomato-sdk'
import { useCallback, useMemo, useState } from 'react'
import { defineChain } from 'thirdweb'
import { LoginPayload } from 'thirdweb/dist/types/auth/core/types'
import {
  ConnectButton,
  useActiveWallet,
  useActiveWalletChain,
  useConnectedWallets,
  useWalletImage,
} from 'thirdweb/react'
import { shortenAddress } from 'thirdweb/utils'
import { Wallet } from 'thirdweb/wallets'
import { Button } from '../ui/button'

const BUTTON_CLASSNAMES =
  '!min-w-[auto] !min-h-[auto] !px-[16px] !py-[12px] !h-[40px] !text-[12px] !rounded-[100px] !bg-black-100 !text-white-100'
const DEFAULT_ACCESS_CODE = '465d4Z'

const ConnectWalletButton = () => {
  const chain = useActiveWalletChain() ?? defineChain(EnumChain.BASE)
  const connectedWallets = useConnectedWallets()
  const smartWallet = useActiveWallet()

  const { setAuth, setLastAddressLoggedIn: setAddressInContext } = useAuthContext()

  const [walletConnected, setWalletConnected] = useState<Wallet | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const accessTokens = JSON.parse(localStorage.getItem('accessTokens') || '{}') as Record<
    string,
    string
  >
  const token = localStorage.getItem('token') || ''
  const lastAddressLoggedIn = localStorage.getItem('lastAddressLoggedIn') || ''

  const definedChains = useMemo(() => {
    const chains = getAllChainIds()
    return chains.map((chain) => defineChain(chain as number))
  }, [])

  const walletId = useMemo(() => {
    return connectedWallets.find((w) => w.id !== walletConnected?.id)?.id
  }, [connectedWallets, walletConnected?.id])

  const { data: walletImage } = useWalletImage(walletId)

  const onConnectWallet = (wallet: Wallet) => {
    console.log('onConnectWallet')
    setWalletConnected(wallet)
  }

  const handleLogout = async () => {
    if (smartWallet) {
      await smartWallet.disconnect()
    }

    setWalletConnected(undefined)
    setAuth('', false)
    setAxiosAuthorization('')

    localStorage.removeItem('token')

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleCheckLoggedIn = async (): Promise<boolean> => {
    try {
      const smartAddress = smartWallet?.getAccount()?.address ?? ''
      const token = accessTokens[smartAddress]

      if (!token) {
        return false
      }

      // we decode its JWT to check if it's still valid
      const isValid = decodeJWTAndCheckValidity(token)

      if (isValid) {
        localStorage.setItem('token', token)

        setAuth(token, isValid)
        setAxiosAuthorization(token)
        setAddressInContext(smartAddress)

        return true
      }

      return false
    } catch (error) {
      console.error('Failed to check user logged in: ', error)
    }

    await handleLogout()
    return false
  }

  const handleLogin = async ({
    payload,
    signature,
  }: {
    payload: LoginPayload
    signature: string
  }) => {
    console.log('handleLogin')
    setIsLoading(true)

    try {
      const { token } = await apiServices.getToken(payload, signature)

      if (!token) {
        throw new Error('Failed to get token')
      }

      const smartAddress = smartWallet?.getAccount()?.address || ''
      const updatedTokens = { ...accessTokens, [smartAddress]: token }

      // Set authentication and persist data
      setAuth(token, true)
      setAxiosAuthorization(token)

      localStorage.setItem('accessTokens', JSON.stringify(updatedTokens))
      localStorage.setItem('lastAddressLoggedIn', smartAddress)
      localStorage.setItem('token', token)

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      console.error('Failed to get token: ', error)

      if (smartWallet) {
        await smartWallet.disconnect()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetLoginPayload = async (): Promise<LoginPayload> => {
    console.log('handleGetLoginPayload')
    setIsLoading(true)
    try {
      const walletAddress = smartWallet?.getAdminAccount?.()?.address ?? ''
      const smartAddress = smartWallet?.getAccount?.()?.address ?? ''

      const loginPayload = await apiServices.generateLoginPayload(
        smartAddress,
        chain.id,
        DEFAULT_ACCESS_CODE,
        walletAddress,
      )

      if (!loginPayload?.address) {
        await handleLogout()

        throw new Error('Failed to generate login payload')
      }

      return loginPayload
    } catch (error: any) {
      await handleLogout()

      const errorMessage = error?.message || error?.response?.data?.message
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const renderConnectedButton = useCallback(() => {
    const adminAccount = smartWallet?.getAdminAccount?.()
    const address = adminAccount?.address

    return address ? (
      <Button className={clsx(BUTTON_CLASSNAMES, 'flex items-center !px-[8px]')}>
        <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-black-300">
          <img src={walletImage} alt="img-wallet" />
        </div>
        <label>{shortenAddress(address)}</label>
        <div>
          <img src={IconChevronDown} alt="ic-chevron-down" />
        </div>
      </Button>
    ) : (
      <div />
    )
  }, [smartWallet, walletImage])

  return (
    <div>
      <ConnectButton
        theme="dark"
        client={client}
        wallets={wallets}
        chain={chain}
        chains={definedChains}
        accountAbstraction={{
          chain: chain,
          sponsorGas: true,
        }}
        connectButton={{
          label: (
            <>
              <div className="mr-2">
                <img src={IconConnectWallet} alt="ic-connect-wallet" />
              </div>
              <label>Connect Wallet</label>
            </>
          ),
          className: BUTTON_CLASSNAMES,
        }}
        signInButton={{
          label: 'Sign In',
          className: BUTTON_CLASSNAMES,
        }}
        detailsButton={{
          render: () => renderConnectedButton(),
        }}
        connectModal={{
          title: 'Connect Wallet',
          size: 'wide',
          titleIcon: '',
        }}
        onConnect={onConnectWallet}
        onDisconnect={handleLogout}
        showAllWallets={false}
        auth={{
          isLoggedIn: handleCheckLoggedIn,
          doLogin: handleLogin,
          getLoginPayload: handleGetLoginPayload,
          doLogout: handleLogout,
        }}
      />
    </div>
  )
}

export default ConnectWalletButton
