import IcTelegramLogo from '@/assets/icons/ic-telegram-logo.svg'
import ImgOtomatoHyperswapBanner from '@/assets/images/img-otomato-hyperswap-banner@2x.png'
import IcWhiteOtomato from '@/assets/icons/ic-otomato-white-logo.svg'
import IcWhiteArrowRight from '@/assets/icons/ic-white-arrow-right.svg'
import Button from '@/components/ui/button/button'
import TelegramAssistant from '@/components/ui/modal/telegram-assistant'
import { Link } from 'react-router-dom'

const HyperEVMDeFiAssistant = () => {
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || ''

  return (
    <main data-page="hyperevm-defi-assistant" className="flex-grow-1 min-h-[calc(100vh-9.375rem)]">
      <div className="container-xl w-full h-full py-20 flex flex-col gap-6">
        <div className="h-38 rounded-3xl overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src={ImgOtomatoHyperswapBanner}
            alt="otomato-hyperswap-banner"
          />
          <div className="w-full h-full absolute top-0 left-0 flex flex-col gap-4 px-10 py-6">
            <h3 className="text-2xl font-semibold">Otomato HyperEVM DeFi Assistant</h3>
            <div className="flex items-center gap-4">
              <TelegramAssistant
                trigger={
                  <Button
                    variant="red"
                    className="w-max h-10"
                    leftIcon={
                      <img
                        width="20px"
                        height="20px"
                        src={IcWhiteOtomato}
                        alt="ic-white-otomato-logo"
                      />
                    }
                    rightIcon={
                      <img
                        width="24px"
                        height="24px"
                        src={IcWhiteArrowRight}
                        alt="ic-white-arrow-right"
                      />
                    }
                  >
                    Start DeFi Assistant (Via Popup)
                  </Button>
                }
              />

              <Link to={telegramBotUrl.replace('[address]', 'unknown')} target="_blank">
                <Button
                  variant="blue"
                  className="h-10"
                  leftIcon={<img src={IcTelegramLogo} alt="ic-telegram-logo" />}
                >
                  Start Defi Assistant (Now)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HyperEVMDeFiAssistant
