import ImgProtocolsBackground from '@/assets/images/img-coming-soon.png'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { formatDate, getTokenExpirationDate } from '@/utils/token'
import { useWallets } from '@privy-io/react-auth'
import { Loader2 } from 'lucide-react'
import { memo, useEffect, useMemo, useState } from 'react'
import { createPublicClient, defineChain, formatEther, formatUnits, http } from 'viem'

const styles = `
@keyframes backgroundScroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -2000px;
  }
}
`

const UserInfo = memo(() => {
  const { id: userId, walletAddress } = useUserContext()
  const { token } = useAuthContext()

  const expirationDate = getTokenExpirationDate(token)
  const formattedExpirationDate = expirationDate ? formatDate(expirationDate) : 'Unknown'

  if (!userId) return null

  return (
    <div className="flex flex-col gap-6 overflow-hidden max-w-[768px]">
      <h2 className="text-lg font-bold">User Info</h2>
      <ul className="flex flex-col gap-2">
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">Auth token expires on:</label>
          <p className="break-all flex-grow">{formattedExpirationDate}</p>
        </li>
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">Smart account address:</label>
          <p className="break-all flex-grow">{walletAddress}</p>
        </li>
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">See smart wallet on debank:</label>
          <a
            href={`https://debank.com/profile/${walletAddress}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-red-100 transition-colors"
          >
            Link
          </a>
        </li>
      </ul>
    </div>
  )
})

UserInfo.displayName = 'UserInfo'

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

const ASSETS_ON_BASE = [
  {
    id: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'ETH',
    decimals: 18,
    isNative: true,
    image: 'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
  },
  {
    id: 'USDC',
    name: 'USDC',
    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    symbol: 'USDC',
    decimals: 6,
    isNative: false,
    image:
      'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
  },
]
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const

const WalletInfo = memo(() => {
  const { wallets } = useWallets()
  const activeWallet = wallets?.[0]

  const { id: userId, walletAddress } = useUserContext()

  const [ownerBalance, setOwnerBalance] = useState<Record<string, string>[]>([])
  const [kernelBalance, setKernelBalance] = useState<Record<string, string>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const baseRpcConfig = {
    zerodev: import.meta.env.VITE_ZERODEV_BASE_RPC,
    custom: import.meta.env.VITE_BASE_HTTPS_PROVIDER,
    alchemy: import.meta.env.VITE_ALCHEMY_BASE_RPC,
    pimlicoBundler: import.meta.env.VITE_PIMLICO_BASE_BUNDLER_RPC,
  }

  const publicClient = useMemo(
    () =>
      createPublicClient({
        transport: http(baseRpcConfig.zerodev),
        chain: baseDefined,
      }),
    [],
  )

  const handleFetchOwnerBalance = async () => {
    const ownerAddress = activeWallet?.address as `0x${string}`
    const ownerBalance = await Promise.all(
      ASSETS_ON_BASE.map(async (asset) => {
        if (asset.isNative) {
          const balance = await publicClient.getBalance({
            address: ownerAddress,
          })
          return { key: asset.id, value: formatEther(balance) }
        }

        const contract = await publicClient.readContract({
          address: asset.address as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [ownerAddress],
        })
        return { key: asset.id, value: formatUnits(contract, asset.decimals) }
      }),
    )

    return ownerBalance
  }

  const handleFetchKernelBalance = async () => {
    const kernelAddress = walletAddress as `0x${string}`
    const kernelBalance = await Promise.all(
      ASSETS_ON_BASE.map(async (asset) => {
        if (asset.isNative) {
          const balance = await publicClient.getBalance({
            address: kernelAddress,
          })
          return { key: asset.id, value: formatEther(balance) }
        }

        const contract = await publicClient.readContract({
          address: asset.address as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [kernelAddress],
        })
        return { key: asset.id, value: formatUnits(contract, asset.decimals) }
      }),
    )

    return kernelBalance
  }

  const handleFetchBalances = async () => {
    setIsLoading(true)
    try {
      const [ownerBalances, kernelBalances] = await Promise.all([
        handleFetchOwnerBalance(),
        handleFetchKernelBalance(),
      ])

      setOwnerBalance(ownerBalances)
      setKernelBalance(kernelBalances)
    } catch (error) {
      console.log('Failed to fetch balances:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      handleFetchBalances()
    }
  }, [userId, walletAddress, activeWallet])

  if (!userId) return null

  return (
    <div className="flex flex-col gap-6 overflow-hidden max-w-[768px]">
      <h2 className="text-lg font-bold">Wallet Balances</h2>
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading balances</span>
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="font-medium">Owner Balance</h3>
              <ul className="flex flex-col gap-2">
                {ownerBalance.map((balance) => (
                  <li className="text-sm" key={balance.key}>
                    <span>{balance.key}: </span>
                    <span>{balance.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <h3 className="font-medium">Kernel Balance</h3>
              <ul className="flex flex-col gap-2">
                {kernelBalance.map((balance) => (
                  <li className="text-sm" key={balance.key}>
                    <span>{balance.key}: </span>
                    <span>{balance.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {ownerBalance.length > 0 && kernelBalance.length > 0 && (
            <div className="flex gap-2 items-center">
              <Button variant="default">
                <span>Deposit</span>
              </Button>

              <Button variant="red">
                <span>Withdraw</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
})

const Homepage = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>{styles}</style>
      <div className="w-full min-h-[600px]">
        <div className="w-full h-[60vh] min-h-[644px] absolute top-0 left-0 z-0 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-[linear-gradient(180deg,#111315_4.83%,rgba(17,19,21,0)_48.29%),linear-gradient(0deg,#111315_15.06%,rgba(17,19,21,0)_100%)]">
          <div
            className="w-[200%] h-[200%] object-contain absolute top-[-80%] left-[-25%] z-1"
            style={{
              backgroundImage: `url(${ImgProtocolsBackground})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center center',
              animation: 'backgroundScroll 34s linear infinite',
              transform: 'rotate(-20deg)',
              transition: 'all 0.4s ease-in-out',
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 p-4 relative z-10">
          <h1 className="text-4xl font-bold text-center">Welcome to Otomato Starter app</h1>

          {isAuthenticated ? (
            <div className="flex flex-col gap-6 mt-6">
              <UserInfo />

              <WalletInfo />
            </div>
          ) : (
            <h2 className="font-medium text-center text-lg text-gray-300">User isn't logged in</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Homepage)
