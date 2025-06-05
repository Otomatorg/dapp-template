import IconChevronDown from '@/assets/icons/ic-chevron-down.svg'
import IconConnectWallet from '@/assets/icons/ic-connect-wallet.svg'
import { EnumChain, getAllChainIds } from '@/configs/chain'
import { client } from '@/configs/client'
import { wallets } from '@/configs/wallet'
import { TIMEOUT_RELOAD_PAGE } from '@/constants/timing'
import { decodeJWTAndCheckValidity, useAuthContext } from '@/context/auth-context'
import { setAxiosAuthorization } from '@/services/axios.config'
import clsx from 'clsx'
import { apiServices } from 'otomato-sdk'
import { useCallback, useMemo } from 'react'
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
import { Button } from '../ui/button'

const BUTTON_CLASSNAMES =
  '!min-w-[auto] !min-h-[auto] !px-[16px] !py-[12px] !h-[40px] !text-[12px] !rounded-[100px] !bg-black-100 !text-white-100'
const DEFAULT_ACCESS_CODE = import.meta.env.VITE_OTOMATO_REFERRAL_CODE

const ConnectWalletButton = () => {
  const chain = useActiveWalletChain() || defineChain(EnumChain.BASE)
  const connectedWallets = useConnectedWallets()
  const smartWallet = useActiveWallet()
  const { isValid, setAuth, setLastAddressLoggedIn: setAddressInContext } = useAuthContext()

  const accessTokens = JSON.parse(localStorage.getItem('accessTokens') || '{}') as Record<
    string,
    string
  >

  const smartAddress = smartWallet?.getAccount()?.address || ''
  const walletAddress = smartWallet?.getAdminAccount?.()?.address || ''

  const definedChains = useMemo(() => {
    const chains = getAllChainIds()
    return chains.map((chain) => defineChain(chain as number))
  }, [])

  const walletId = useMemo(() => {
    return connectedWallets.find((w) => w.id !== smartWallet?.id)?.id
  }, [connectedWallets, smartWallet?.id])

  const { data: walletImage } = useWalletImage(walletId)

  const handleLogout = async () => {
    if (smartWallet) {
      await smartWallet.disconnect()
    }

    setAuth('', false)
    setAxiosAuthorization('')
    localStorage.removeItem('token')

    setTimeout(() => {
      window.location.reload()
    }, TIMEOUT_RELOAD_PAGE)
  }

  const handleCheckLoggedIn = useCallback(async (): Promise<boolean> => {
    try {
      const token = accessTokens[smartAddress]

      if (!token) {
        return false
      }

      const isTokenValid = decodeJWTAndCheckValidity(token)

      if (isTokenValid) {
        localStorage.setItem('token', token)
        setAuth(token, isTokenValid)
        setAxiosAuthorization(token)
        setAddressInContext(smartAddress)
        return true
      }

      return false
    } catch (error) {
      console.log('Failed to check user logged in:', error)
      await handleLogout()
      return false
    }
  }, [accessTokens, smartAddress, setAuth, setAxiosAuthorization, setAddressInContext])

  const handleLogin = async (payload: LoginPayload, signature: string): Promise<void> => {
    try {
      const { token } = await apiServices.getToken(payload, signature)
      if (!token) {
        throw new Error('Failed to get authentication token')
      }

      const updatedTokens = { ...accessTokens, [smartAddress]: token }

      setAuth(token, true)
      setAxiosAuthorization(token)

      localStorage.setItem('accessTokens', JSON.stringify(updatedTokens))
      localStorage.setItem('lastAddressLoggedIn', smartAddress)
      localStorage.setItem('token', token)

      setTimeout(() => {
        window.location.reload()
      }, TIMEOUT_RELOAD_PAGE)
    } catch (error) {
      console.log('Login failed:', error)
      if (smartWallet) {
        await smartWallet.disconnect()
      }
      throw error
    }
  }

  const handleGetLoginPayload = async (): Promise<LoginPayload> => {
    if (isValid) {
      throw new Error('Already authenticated')
    }

    try {
      const loginPayload = await apiServices.generateLoginPayload(
        smartAddress,
        chain.id,
        DEFAULT_ACCESS_CODE,
        walletAddress,
      )

      if (!loginPayload?.address) {
        await handleLogout()
        throw new Error('Failed to generate login payload: Invalid address')
      }

      return loginPayload
    } catch (error: any) {
      await handleLogout()
      const errorMessage =
        error?.message || error?.response?.data?.message || 'Failed to generate login payload'
      throw new Error(errorMessage)
    }
  }

  const renderConnectedButton = useCallback(() => {
    if (!walletAddress) return <div />

    return (
      <Button className={clsx(BUTTON_CLASSNAMES, 'flex items-center !px-[8px]')}>
        <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-black-300">
          <img src={walletImage} alt="img-wallet" />
        </div>
        <label>{shortenAddress(walletAddress)}</label>
        <div>
          <img src={IconChevronDown} alt="ic-chevron-down" />
        </div>
      </Button>
    )
  }, [walletAddress, walletImage])

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
        onConnect={() => {}}
        onDisconnect={handleLogout}
        showAllWallets={false}
        auth={{
          isLoggedIn: async () => {
            if (!smartAddress) return false
            return await handleCheckLoggedIn()
          },
          getLoginPayload: handleGetLoginPayload,
          doLogin: async ({ payload, signature }) => handleLogin(payload, signature),
          doLogout: handleLogout,
        }}
      />
    </div>
  )
}

export default ConnectWalletButton
