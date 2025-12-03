import IcTelegramLogo from '@/assets/icons/ic-telegram-logo.svg'
import ImgTelegramAssistant from '@/assets/images/img-otomato-telegram-assistant.png'
import { PATHNAME } from '@/constants/pathname'
import { cn } from '@/lib/utils'
import { memo, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../button/button'
import { Input } from '../input'
import { Label } from '../label'
import Modal from './modal'

const telegramAssistantUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || ''

interface ITelegramAssistantProps {
  trigger: React.ReactNode
}

const TelegramAssistant = ({ trigger }: ITelegramAssistantProps) => {
  const { pathname } = useLocation()

  const [inputWalletAddress, setInputWalletAddress] = useState('')
  const [validationState, setValidationState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const validateWalletAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  const OnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputWalletAddress(value)

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!value) {
      setValidationState('idle')
      return
    }

    // Set loading state immediately
    setValidationState('loading')

    // Set timeout for validation
    timeoutRef.current = setTimeout(() => {
      const isValid = validateWalletAddress(value)
      setValidationState(isValid ? 'success' : 'error')
    }, 400)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const resetForm = () => {
    setInputWalletAddress('')
    setValidationState('idle')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <Modal
      title=""
      trigger={trigger}
      contentClassName="max-w-md px-6 py-9 font-manrope rounded-4xl bg-gray-300"
      onOpenChange={(open) => {
        if (!open) {
          resetForm()
        }
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="shrink-0 w-full h-52 rounded-xl overflow-hidden">
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
        <p className="text-center text-sm text-rgba255-600 font-manrope leading-loose">
          {pathname === PATHNAME.HYPEREVM_DEFI_ASSISTANT
            ? "The HyperEVM Assistant keeps an eye on your Hyperswap positions and alerts you when you're out of range or when major updates drop."
            : 'The Otomato DeFi Assistant keeps an eye on your DeFi positions and alerts you when needed.'}
        </p>

        <div className="w-full max-w-xs flex flex-col mx-auto mt-4 mb-2 gap-3">
          <Label htmlFor="address" className="text-center">
            Input your wallet address
          </Label>
          <div className="relative w-full">
            <Input
              className="h-10 border-rgba255-300 rounded-xl pr-10"
              type="text"
              id="address"
              placeholder="Input here"
              value={inputWalletAddress}
              onChange={OnInputChange}
            />
            {validationState === 'loading' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {validationState === 'success' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
            {validationState === 'error' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 bg-red-100 flex items-center justify-center rounded-full">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {validationState === 'error' && inputWalletAddress && (
            <p className="text-red-100 text-xs">Please enter a valid wallet address</p>
          )}
        </div>

        <Link
          to={telegramAssistantUrl.replace('[address]', inputWalletAddress)}
          target="_blank"
          className={cn(
            'text-center pointer-events-auto',
            !validateWalletAddress(inputWalletAddress) && 'cursor-not-allowed pointer-events-none',
          )}
        >
          <Button
            variant="blue"
            disabled={!validateWalletAddress(inputWalletAddress)}
            className="w-max h-12 rounded-full px-5 py-4 mx-auto font-manrope"
            rightIcon={<img src={IcTelegramLogo} alt="ic-telegram-bot" />}
          >
            Launch Assistant
          </Button>
        </Link>
      </div>
    </Modal>
  )
}

export default memo(TelegramAssistant)
