import ImgProtocolsBackground from '@/assets/images/img-coming-soon.png'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { formatDate, getTokenExpirationDate } from '@/utils/token'
import { apiServices, Workflow, WORKFLOW_TEMPLATES } from 'otomato-sdk'
import { memo, useEffect, useState, useCallback } from 'react'

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

interface UserInfoProps {
  token: string
  walletAddress: string
}

const UserInfo = memo(({ token, walletAddress }: UserInfoProps) => {
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
          className="text-blue-500 hover:text-red-100 transition-colors"
        >
          Link
        </a>
      </li>
    </ul>
  )
})

UserInfo.displayName = 'UserInfo'

const TEMPLATE_INDEX = 5

const Homepage = () => {
  const { id: userId, walletAddress } = useUserContext()
  const { token } = useAuthContext()
  const [userWorkflows, setUserWorkflows] = useState<Workflow[]>([])

  const handleLoadWorkflows = useCallback(async () => {
    const workflows = await apiServices.getWorkflowsOfUser()
    if (workflows?.data?.length > 0) {
      setUserWorkflows(workflows.data)
    }
  }, [])

  const handleCreateWorkflow = useCallback(async () => {
    const workflow = (await WORKFLOW_TEMPLATES[TEMPLATE_INDEX].createWorkflow()) as Workflow
    const result = await workflow.create()

    if (result.success) {
      alert('Successfully created the sample workflow')
      handleLoadWorkflows()
    }
  }, [handleLoadWorkflows])

  useEffect(() => {
    if (userId) {
      handleLoadWorkflows()
    }
  }, [userId, handleLoadWorkflows])

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
              transform: 'rotate(-20deg) scale(1)',
              transition: 'all 0.4s ease-in-out',
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center p-4 relative z-10">
          <h1 className="text-2xl font-bold text-center">Welcome to Otomato Starter app</h1>

          {userId ? (
            <>
              <h2 className="mt-[12px] font-[500] text-[18px]">The user is logged in</h2>
              <UserInfo token={token} walletAddress={walletAddress} />

              <div className="mt-[32px]">
                <Button
                  variant="default"
                  className={userWorkflows.length > 0 ? 'pointer-events-none' : ''}
                  onClick={handleCreateWorkflow}
                >
                  {userWorkflows.length > 0 ? (
                    <>
                      You created <span className="font-bold text-600">{userWorkflows.length}</span>{' '}
                      workflow
                      {userWorkflows.length > 1 ? 's' : ''}
                    </>
                  ) : (
                    'Create a sample workflow'
                  )}
                </Button>
              </div>
            </>
          ) : (
            <h2 className="mt-[12px] font-[500] text-[18px]">The user isn't logged in</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Homepage)
