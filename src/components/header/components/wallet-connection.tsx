import Button from '@/components/ui/button/button'
import Dropdown from '@/components/ui/dropdown-menu/dropdown-menu'
import { useAuthContext } from '@/context/auth-context'
import * as authService from '@/services/auth'
import { useLogin, useLogout, usePrivy, useWallets } from '@privy-io/react-auth'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator'
import { createKernelAccount } from '@zerodev/sdk'
import { getEntryPoint } from '@zerodev/sdk/constants'
import { Signer } from '@zerodev/sdk/types'
import { Loader2Icon, LogOut } from 'lucide-react'
import { shortenAddress } from 'otomato-sdk'
import { memo, useCallback, useMemo, useState } from 'react'
import { createPublicClient, defineChain, http } from 'viem'

const baseChainId = 8453

const baseRpcConfig = {
  zerodev: import.meta.env.VITE_ZERODEV_BASE_RPC,
  custom: import.meta.env.VITE_BASE_HTTPS_PROVIDER,
  alchemy: import.meta.env.VITE_ALCHEMY_BASE_RPC,
  pimlicoBundler: import.meta.env.VITE_PIMLICO_BASE_BUNDLER_RPC,
}

const baseDefined = defineChain({
  id: baseChainId,
  name: 'Base',
  network: 'base',
  nativeCurrency: {
    name: 'Base',
    symbol: 'BASE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [baseRpcConfig.zerodev],
    },
  },
  blockExplorers: {
    default: { name: 'Base Scan', url: 'https://basescan.org' },
  },
  testnet: false,
})

const WalletConnection = () => {
  const { ready, getAccessToken } = usePrivy()
  const { wallets } = useWallets()

  const {
    isAuthenticated,
    setAuth,
    setLastAddressLoggedIn: setAddressInContext,
    onLogout,
  } = useAuthContext()
  const [isConnecting, setIsConnecting] = useState(false)

  const createKernelAccountFromZeroDev = useCallback(async (signer: Signer) => {
    const publicClient = createPublicClient({
      transport: http(baseRpcConfig.zerodev),
      chain: baseDefined,
    })

    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      entryPoint: getEntryPoint('0.7'),
      signer,
      kernelVersion: '0.3.1',
    })

    const account = await createKernelAccount(publicClient, {
      entryPoint: getEntryPoint('0.7'),
      kernelVersion: '0.3.1',
      plugins: {
        sudo: ecdsaValidator,
      },
    })

    return account
  }, [])

  const handleConnectSuccess = useCallback(async () => {
    try {
      setIsConnecting(true)

      // Step 1: Get Privy access token
      const privyAccessToken = await getAccessToken()
      if (!privyAccessToken) {
        throw new Error('Failed to get Privy access token')
      }

      // Step 2: Get wallet address
      const wallet = wallets[0]
      if (!wallet) {
        throw new Error('No wallet found')
      }

      // Step 3: Create kernel account (smart wallet) using ZeroDev
      const signer = (await wallet.getEthereumProvider()) as Signer
      const kernelAccount = await createKernelAccountFromZeroDev(signer)
      const smartWalletAddress = kernelAccount.address

      // Step 4: Call your API to get JWT token
      const response = await authService.getToken({
        walletAddress: smartWalletAddress,
        ownerWalletAddress: wallet.address,
        accessToken: privyAccessToken,
      })

      if (!response?.data?.token) {
        throw new Error('Failed to get authentication token')
      }

      // Step 5: Update auth context
      setAuth(response.data.token, true)
      setAddressInContext(wallet.address)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed'
      console.error('Failed to login:', errorMessage)
    } finally {
      setIsConnecting(false)
    }
  }, [wallets, getAccessToken, setAuth, setAddressInContext, createKernelAccountFromZeroDev])

  const { login } = useLogin({
    onComplete: handleConnectSuccess,
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      console.log(errorMessage)
      setIsConnecting(false)
    },
  })

  const { logout } = useLogout({
    onSuccess: () => {
      onLogout()
    },
  })

  const walletConnected = useMemo(() => {
    if (isAuthenticated && wallets.length) {
      return wallets[0]
    }

    return null
  }, [isAuthenticated, wallets])

  return (
    <div className="shrink-0 flex items-center gap-2">
      {isAuthenticated ? (
        <Dropdown
          alignment="end"
          trigger={
            <Button
              className="h-12 rounded-xl"
              disabled={!ready}
              leftIcon={
                ready ? (
                  <img
                    width="20px"
                    height="20px"
                    src={walletConnected?.meta?.icon}
                    alt={walletConnected?.meta?.name}
                  />
                ) : (
                  <Loader2Icon className="w-4 h-4 animate-spin text-white-100" />
                )
              }
            >
              {ready ? shortenAddress(walletConnected?.address || '') : 'Connecting...'}
            </Button>
          }
          menuContentClassName="max-w-[10rem] px-2.5 py-2 rounded-xl"
        >
          <DropdownMenuItem className="w-full p-0">
            <Button
              variant="secondary"
              className="rounded-md border-0"
              leftIcon={<LogOut className="w-5 h-5" />}
              onClick={logout}
            >
              Disconnect
            </Button>
          </DropdownMenuItem>
        </Dropdown>
      ) : (
        <div className="flex flex-col gap-1">
          <Button disabled={isConnecting} className="h-12 rounded-xl" onClick={login}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default memo(WalletConnection)
