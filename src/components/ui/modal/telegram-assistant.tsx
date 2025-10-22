import IcTelegramLogo from '@/assets/icons/ic-telegram-logo.svg'
import ImgTelegramAssistant from '@/assets/images/img-otomato-telegram-assistant.png'
import { useAuthContext } from '@/context/auth-context'
import Button from '../button/button'
import Modal from './modal'
import { useUserContext } from '@/context/user-context'
import { useEffect, useState, useRef } from 'react'
import { Label } from '../label'
import { Input } from '../input'

const telegramAssistantUrl = 'https://t.me/OtomatoStagingBot?start=agent_noti-hyperevm_w_[address]'
interface ITelegramAssistantProps {
  trigger: React.ReactNode
}

const TelegramAssistant = ({ trigger }: ITelegramAssistantProps) => {
  const { isAuthenticated } = useAuthContext()
  const { walletAddress } = useUserContext()

  const [inputWalletAddress, setInputWalletAddress] = useState('')
  const [validationState, setValidationState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleLaunchAssistant = () => {
    if (!inputWalletAddress) return

    const url = telegramAssistantUrl.replace('[address]', inputWalletAddress)
    window.open(url, '_blank')
  }

  const validateWalletAddress = (address: string): boolean => {
    // Basic Ethereum address validation (0x followed by 40 hex characters)
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

  useEffect(() => {
    if (isAuthenticated) {
      setInputWalletAddress(walletAddress)
    }
  }, [isAuthenticated])

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
          The HyperEVM Assistant keeps an eye on your Hyperswap positions and alerts you when you're
          out of range or when major updates drop.
        </p>

        <div className="w-full max-w-xs flex flex-col mx-auto mt-4 mb-2 gap-3">
          <Label htmlFor="address" className="text-center">
            Connect your wallet or input your address
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

        <Button
          variant="blue"
          disabled={!inputWalletAddress}
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
