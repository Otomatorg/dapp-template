import ImgOtomatoLogo from '@/assets/images/img-otomato-logo-v2@2x.png'
import { PATHNAME } from '@/constants/pathname'
import { PrivyProvider } from '@privy-io/react-auth'
import { base } from 'viem/chains'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = window.location.pathname

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: { ethereum: { createOnLogin: 'users-without-wallets' } },
        loginMethods: ['google', 'wallet'],
        defaultChain: base,
        supportedChains: [base],
        appearance: {
          theme: '#1A1D1F',
          accentColor: '#181818',
          landingHeader: 'Login',
          logo: pathname === PATHNAME.HOME ? ImgOtomatoLogo : ImgOtomatoLogo,
          walletList: ['metamask', 'rabby_wallet'],
          showWalletLoginFirst: true,
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
