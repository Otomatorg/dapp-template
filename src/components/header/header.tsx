import ImgHyperswapLogo from '@/assets/images/img-hyperswap-logo@2x.png'
import ImgOtomatoLogo from '@/assets/images/img-otomato-logo-v2@2x.png'
import { PATHNAME } from '@/constants/pathname'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import WalletConnection from './components/wallet-connection'

const Header = () => {
  const { pathname } = useLocation()

  const headerLogo = useMemo(() => {
    return pathname === PATHNAME.HOME ? ImgOtomatoLogo : ImgOtomatoLogo
  }, [pathname])

  return (
    <header className="w-full h-20 shrink-0bg-rgba10-150 sticky top-0 left-0 z-10 px-9 py-4 backdrop-blur-[2.34375rem]">
      <div className="container grid grid-cols-3 items-center ">
        <div className="flex justify-start">
          <Link to={PATHNAME.HOME}>
            <img srcSet={`${headerLogo} 2x`} alt="otomato-logo" />
          </Link>
        </div>

        <div className="flex justify-center">
          {/* <ul className="flex items-center gap-2 rounded-[1.125rem] border border-rgba255-100">
            <li className="flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300">
              <span className="text-sm font-medium">Trade</span>
            </li>
            <li className="flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300">
              <span className="text-sm font-medium">Explore</span>
            </li>
            <li
              className={cn(
                'flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300 relative',
                {
                  'text-white-100': pathname === PATHNAME.HOME,
                  'before:content-["_"] before:absolute before:left-[50%] before:translate-x-[-50%] before:-bottom-0.5 before:w-10 before:h-[3px] before:bg-[linear-gradient(90deg,rgba(250,250,250,0.00)_0%,rgba(250,250,250,0.60)_50%,rgba(250,250,250,0.00)_100%)] backdrop-blur-[0.015625rem]':
                    pathname === PATHNAME.HOME,
                },
              )}
            >
              <span className="text-sm font-medium">Positions</span>
            </li>
            <li className="flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300 flex items-center gap-0.5">
              <span className="text-sm font-medium">Earn</span>
              <span className="shrink-0 w-4 h-4">
                <img src={IcChevronDown} alt="chevron-down" />
              </span>
            </li>
            <li className="flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300">
              <span className="text-sm font-medium">Points</span>
            </li>
            <li className="flex-1 px-4 py-3 text-rgba255-400 cursor-pointer hover:text-white-100 transition-colors duration-300">
              <span className="text-sm font-medium">Bridge</span>
            </li>
          </ul> */}
        </div>

        <div className="flex justify-end">
          <WalletConnection />
        </div>
      </div>
    </header>
  )
}

export default Header
