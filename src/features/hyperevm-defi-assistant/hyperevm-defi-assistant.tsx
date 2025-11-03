// import ImgHyperswapBanner from '@/assets/images/img-hyperswap-banner@2x.png'
import ImgOtomatoHyperswapBanner from '@/assets/images/img-otomato-hyperswap-banner@2x.png'
import IcWhiteOtomato from '@/assets/icons/ic-otomato-white-logo.svg'
import IcWhiteArrowRight from '@/assets/icons/ic-white-arrow-right.svg'
import Button from '@/components/ui/button/button'
import TelegramAssistant from '@/components/ui/modal/telegram-assistant'

const HyperEVMDeFiAssistant = () => {
  return (
    <main data-page="hyperevm-defi-assistant-page" className="container py-20">
      <div className="container-xl flex flex-col gap-6">
        <div className="shrink-0 rounded-3xl overflow-hidden relative">
          <img src={ImgOtomatoHyperswapBanner} alt="otomato-hyperswap-banner" />
          <div className="w-full h-full absolute top-0 left-0 flex flex-col gap-4 px-10 py-6">
            <h3 className="text-2xl font-semibold">Otomato HyperEVM DeFi Assistant</h3>
            <TelegramAssistant
              trigger={
                <Button
                  variant="red"
                  className="w-max"
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
                      width="20px"
                      height="20px"
                      src={IcWhiteArrowRight}
                      alt="ic-white-arrow-right"
                    />
                  }
                >
                  Try Now
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default HyperEVMDeFiAssistant
