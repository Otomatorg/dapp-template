import { useAuthContext } from '@/context/auth-context'
import { usePrivy, useSubscribeToJwtAuthWithFlag } from '@privy-io/react-auth'

const StateSyncComponent = () => {
  const { getToken, isLoading } = useAuthContext()
  const { authenticated: privyAuthenticated } = usePrivy()

  const token = getToken()
  const combinedAuthenticated = !!token && !!privyAuthenticated

  useSubscribeToJwtAuthWithFlag({
    enabled: false,
    isLoading,
    isAuthenticated: combinedAuthenticated,
    getExternalJwt: async () => (combinedAuthenticated ? token : undefined),
  })

  return null
}

export default StateSyncComponent
