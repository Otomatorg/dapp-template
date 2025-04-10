import ImgOtomatoLogo from '@/assets/images/img-otomato-logo.png'
import { Link } from 'react-router-dom'
import ConnectButton from '../connect-button/connect-button'

const Header = () => {
  return (
    <header className="w-full flex-shrink-0 flex items-center justify-between gap-2 pt-[16px] px-[20px] pb-[20px]">
      <div className="flex-shrink-0 w-[40px] h-[40px]">
        <Link to="/">
          <img src={ImgOtomatoLogo} alt="otomato-logo" />
        </Link>
      </div>
      <div className="flex-shrink-0">
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header
