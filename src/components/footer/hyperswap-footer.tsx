
import IcDiscordLogo from '@/assets/icons/ic-white-discord-logo.svg'
import IcDocumentation from '@/assets/icons/ic-white-documentation.svg'
import IcSettings from '@/assets/icons/ic-white-setting.svg'
import IcWebsiteLogo from '@/assets/icons/ic-white-website.svg'
import IcXLogo from '@/assets/icons/ic-white-x-logo.svg'
import { memo } from 'react'

const HyperswapFooter = () => {
  return (
    <footer className="container h-[4.375rem] shrink-0 mt-auto flex items-center justify-between px-4 py-3">
          <div className="grow-1">
        <ul className="flex items-center gap-1">
          <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcXLogo} alt="ic-x-logo" />
          </li>
          <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcDiscordLogo} alt="ic-discord-logo" />
          </li>
          <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcWebsiteLogo} alt="ic-website-logo" />
          </li>
          <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcDocumentation} alt="ic-documentation" />
          </li>
          <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcSettings} alt="ic-settings" />
          </li>
          {/* <li className="flex-1 w-11 h-11 flex items-center justify-center">
            <img src={IcLiquidScan} alt="ic-liquid-scan" />
          </li> */}
        </ul>
      </div>
      <div className="shrink-0 text-sm text-gray-200">
        © 2025 Otomato. All rights reserved.
      </div>
    </footer>
  )
}

export default memo(HyperswapFooter)
