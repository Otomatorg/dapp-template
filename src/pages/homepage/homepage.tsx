import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { getTokenExpirationDate, formatDate } from '@/utils/token'
import { memo } from 'react'

const UserInfo = memo(({ token, walletAddress }: { token: string; walletAddress: string }) => {
  const expirationDate = getTokenExpirationDate(token)
  const formattedExpirationDate = expirationDate ? formatDate(expirationDate) : 'Unknown'

  return (
    <ul className="flex flex-col mt-[24px] gap-2 overflow-hidden max-w-[520px]">
      <li className="text-[14px] flex items-baseline gap-2">
        <label className="flex-shrink-0 font-[500]">Auth token:</label>
        <p className="break-all flex-grow">{token}</p>
      </li>
      <li className="text-[14px] flex items-baseline gap-2">
        <label className="flex-shrink-0 font-[500]">Auth token expires on:</label>
        <p className="break-all flex-grow">{formattedExpirationDate}</p>
      </li>
      <li className="text-[14px] flex items-baseline gap-2">
        <label className="flex-shrink-0 font-[500]">Smart account address:</label>
        <p className="break-all flex-grow">{walletAddress}</p>
      </li>
      <li className="text-[14px] flex items-baseline gap-2">
        <label className="flex-shrink-0 font-[500]">See smart wallet on debank:</label>
        <a
          href={`https://debank.com/profile/${walletAddress}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Link
        </a>
      </li>
    </ul>
  )
})

UserInfo.displayName = 'UserInfo'

const Homepage = () => {
  const { id: userId, walletAddress } = useUserContext()
  const { token } = useAuthContext()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-center">Welcome to otomato starter app</h1>

      {userId ? (
        <>
          <h2 className="mt-[12px] font-[500] text-[18px]">The user is logged in</h2>
          <UserInfo token={token} walletAddress={walletAddress} />
        </>
      ) : (
        <h2 className="mt-[12px] font-[500] text-[18px]">The user isn't logged in</h2>
      )}
    </div>
  )
}

export default Homepage
