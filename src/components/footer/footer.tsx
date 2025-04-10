import { Button } from '../ui/button'
import IconFeedback from '@/assets/icons/ic-feedback.svg'
import IconDocumentation from '@/assets/icons/ic-documentation.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  const feedbackUrl = 'https://otomato.canny.io/feature-requests'
  const documentationUrl = 'https://otomato.gitbook.io/v1'

  return (
    <footer className="w-full flex-shrink-0 mt-auto flex items-center justify-between px-[20px] pt-[16px] pb-[20px]">
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500">© 2025 otomato</p>
      </div>

      <div className="flex items-center gap-2">
        <Link to={feedbackUrl} target="_blank">
          <Button variant="outline" className="font-size-14 rounded-[100px]">
            <img src={IconFeedback} alt="ic-feedback" />
            <span>Feedback</span>
          </Button>
        </Link>

        <Link to={documentationUrl} target="_blank">
          <Button variant="outline" className="font-size-14 rounded-[100px]">
            <img src={IconDocumentation} alt="ic-documentation" />
            <span>Docs</span>
          </Button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
