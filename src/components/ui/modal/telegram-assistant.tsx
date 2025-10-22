import IcTelegramLogo from '@/assets/icons/ic-telegram-logo.svg'
import ImgTelegramAssistant from '@/assets/images/img-otomato-telegram-assistant.png'
import { useAuthContext } from '@/context/auth-context'
import Button from '../button/button'
import Modal from './modal'
import { useUserContext } from '@/context/user-context'

const telegramAssistantUrl = 'https://t.me/OtomatoStagingBot?start=agent_noti-hyperevm_w_[address]'

const TelegramAssistant = () => {
  const { isAuthenticated } = useAuthContext()
  const { walletAddress } = useUserContext()

  const handleLaunchAssistant = () => {
    if (!walletAddress) return

    const url = telegramAssistantUrl.replace('[address]', walletAddress)
    window.open(url, '_blank')
  }

  return (
    <Modal
      title=""
      trigger={
        <Button
          variant="secondary"
          className="h-12 bg-rgba137-140 rounded-lg"
          leftIcon={<img src={IcTelegramLogo} alt="ic-telegram-bot" />}
        >
          Telegram Bot
        </Button>
      }
      contentClassName="max-w-md px-6 py-9 font-manrope rounded-4xl bg-gray-300"
    >
      <div className="flex flex-col gap-4">
        <div className="shrink-0 w-full h-auto overflow-hidden">
          <img
            src={ImgTelegramAssistant}
            loading="lazy"
            className="w-full h-full object-cover"
            alt="telegram-assistant"
          />
        </div>
        <h2 className="text-xl text-center font-bold font-manrope">
          Stay informed without lifting a finger
        </h2>
        <p className="text-center text-md text-rgba255-600 font-manrope leading-9">
          The HyperEVM Assistant keeps an eye on your Hyperswap positions and alerts you when you're
          out of range or when major updates drop.
        </p>

        <Button
          variant="blue"
          disabled={!isAuthenticated}
          className="w-max h-12 rounded-full px-5 py-4 mx-auto font-manrope"
          rightIcon={<img src={IcTelegramLogo} alt="ic-telegram-bot" />}
          onClick={handleLaunchAssistant}
        >
          Launch Assistant
        </Button>
      </div>
    </Modal>
  )
}

export default TelegramAssistant
