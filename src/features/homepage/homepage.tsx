import ImgProtocolsBackground from '@/assets/images/img-coming-soon.png'
import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { formatDate, getTokenExpirationDate } from '@/utils/token'
import { memo } from 'react'
import { useAdminWallet } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'

const styles = `
@keyframes backgroundScroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -2000px;
  }
}
`

const UserInfo = memo(() => {
  const { id: userId, walletAddress } = useUserContext()
  const { token } = useAuthContext()
  const adminWallet = useAdminWallet()
  const adminAccount = adminWallet?.getAccount() as Account

  const expirationDate = getTokenExpirationDate(token)
  const formattedExpirationDate = expirationDate ? formatDate(expirationDate) : 'Unknown'

  if (!userId) return null

  return (
    <div className="flex flex-col gap-6 overflow-hidden max-w-[768px]">
      <h2 className="text-lg font-bold">User Info</h2>
      <ul className="flex flex-col gap-2">
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">Auth token expires on:</label>
          <p className="break-all flex-grow">{formattedExpirationDate}</p>
        </li>
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">Wallet address:</label>
          <p className="break-all flex-grow">{adminAccount?.address}</p>
        </li>
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">Smart address:</label>
          <p className="break-all flex-grow">{walletAddress}</p>
        </li>
        <li className="flex items-baseline gap-2">
          <label className="flex-shrink-0 font-[500]">See smart wallet on debank:</label>
          <a
            href={`https://debank.com/profile/${walletAddress}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-red-100 transition-colors"
          >
            Link
          </a>
        </li>
      </ul>
    </div>
  )
})

UserInfo.displayName = 'UserInfo'

const Homepage = () => {
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="w-full h-full flex items-center justify-center">
      <style>{styles}</style>
      <div className="w-full min-h-[600px]">
        <div className="w-full h-[60vh] min-h-[644px] absolute top-0 left-0 z-0 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-[linear-gradient(180deg,#111315_4.83%,rgba(17,19,21,0)_48.29%),linear-gradient(0deg,#111315_15.06%,rgba(17,19,21,0)_100%)]">
          <div
            className="w-[200%] h-[200%] object-contain absolute top-[-80%] left-[-25%] z-1"
            style={{
              backgroundImage: `url(${ImgProtocolsBackground})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center center',
              animation: 'backgroundScroll 34s linear infinite',
              transform: 'rotate(-20deg)',
              transition: 'all 0.4s ease-in-out',
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 p-4 relative z-10">
          <h1 className="text-4xl font-bold text-center">Welcome to Otomato Starter app</h1>

          {isAuthenticated ? (
            <div className="flex flex-col gap-6 mt-6">
              <UserInfo />
            </div>
          ) : (
            <h2 className="font-medium text-center text-xl">User isn't logged in</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Homepage)
