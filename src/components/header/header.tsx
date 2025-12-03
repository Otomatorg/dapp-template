import ImgOtomatoLogo from '@/assets/images/img-otomato-logo-v2@2x.png'
import { PATHNAME } from '@/constants/pathname'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LaunchAssistant from './components/launch-assistant'
import WalletConnection from './components/wallet-connection'

const Header = () => {
  const { pathname } = useLocation()

  const headerLogo = useMemo(() => {
    return pathname === PATHNAME.HOME ? ImgOtomatoLogo : ImgOtomatoLogo
  }, [pathname])

  return (
    <header className="w-full h-20 shrink-0 bg-rgba10-150 sticky top-0 left-0 z-10 py-4 backdrop-blur-[2.34375rem]">
      <div className="container-2xl flex items-center justify-between">
        <div className="flex justify-start">
          <Link to={PATHNAME.HOME}>
            <img srcSet={`${headerLogo} 2x`} alt="otomato-logo" />
          </Link>
        </div>

        <div className="grow flex justify-end gap-2">
          {pathname !== PATHNAME.HOME ? <LaunchAssistant /> : <WalletConnection />}
        </div>
      </div>
    </header>
  )
}

export default Header
