import IcRedOtomato from '@/assets/icons/ic-otomato-red-logo.svg'
import IcTelegramLogo from '@/assets/icons/ic-telegram-logo.svg'
import Button from '@/components/ui/button/button'
import TelegramAssistant from '@/components/ui/modal/telegram-assistant'
import { Link } from 'react-router-dom'

const LaunchAssistant = () => {
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || ''

  return (
    <div className="flex items-center gap-2">
      <TelegramAssistant
        trigger={
          <Button
            variant="secondary"
            className="h-12 bg-rgba137-140 rounded-lg"
            leftIcon={<img width="24px" height="24px" src={IcRedOtomato} alt="ic-telegram-bot" />}
          >
            Start DeFi Assistant (Via Popup)
          </Button>
        }
      />

      <Link to={telegramBotUrl.replace('[address]', 'unknown')} target="_blank">
        <Button
          variant="blue"
          className="h-12 rounded-lg"
          leftIcon={<img src={IcTelegramLogo} alt="ic-telegram-logo" />}
        >
          Start Defi Assistant (Now)
        </Button>
      </Link>
    </div>
  )
}

export default LaunchAssistant
