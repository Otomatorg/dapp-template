import IcDiscordLogo from '@/assets/icons/ic-white-discord-logo.svg'
import IcDocumentation from '@/assets/icons/ic-white-documentation.svg'
import IcSettings from '@/assets/icons/ic-white-setting.svg'
import IcWebsiteLogo from '@/assets/icons/ic-white-website.svg'
import IcXLogo from '@/assets/icons/ic-white-x-logo.svg'
import { LINKS } from '@/constants/links'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/button/button'

const FOOTER_LINKS = [
  {
    name: 'X',
    icon: IcXLogo,
    url: LINKS.TWITTER,
  },
  {
    name: 'Discord',
    icon: IcDiscordLogo,
    url: LINKS.DISCORD,
  },
  {
    name: 'Defi Assistant',
    icon: IcWebsiteLogo,
    url: LINKS.DEFI_ASSISTANT_APP,
  },
  {
    name: 'Documentation',
    icon: IcDocumentation,
    url: LINKS.DOCUMENTATION,
  },
  {
    name: 'Tool',
    icon: IcSettings,
    url: LINKS.BUILDER_APP,
  },
]

const DefiAssistantFooter = () => {
  return (
    <footer className="container h-[4.375rem] shrink-0 mt-auto flex items-center justify-between px-4 py-3">
      <div className="grow-1">
        <ul className="flex items-center gap-1">
          {FOOTER_LINKS.map((link) => (
            <li key={link.name} className="flex-1 w-11 h-11 flex items-center justify-center">
              <Link to={link.url} target="_blank" rel="noopener noreferrer">
                <Button
                  size="icon"
                  className="border-0"
                  leftIcon={<img src={link.icon} alt="ic-x-logo" />}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="shrink-0 text-sm text-gray-200">© 2025 Otomato. All rights reserved.</div>
    </footer>
  )
}

export default memo(DefiAssistantFooter)
