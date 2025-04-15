import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { formatDate, getTokenExpirationDate } from '@/utils/token'
import { apiServices, Workflow, WORKFLOW_TEMPLATES } from 'otomato-sdk'
import { memo, useEffect, useState } from 'react'

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
  const [userWorkflows, setUserWorkflows] = useState<Workflow[]>([])

  const handleLoadWorkflows = async () => {
    const workflows = await apiServices.getWorkflowsOfUser()
    if (workflows?.data?.length > 0) {
      setUserWorkflows(workflows.data)
    }
  }

  const handleCreateWorkflow = async () => {
    const TEMPLATE_INDEX = 5
    const workflow = (await WORKFLOW_TEMPLATES[TEMPLATE_INDEX].createWorkflow()) as Workflow
    const result = await workflow.create()

    if (result.success) {
      alert('Successfully created the sample workflow')
      handleLoadWorkflows()
    }
  }

  useEffect(() => {
    if (userId) {
      handleLoadWorkflows()
    }
  }, [userId])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-center">Welcome to otomato starter app</h1>

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
  )
}

export default Homepage
