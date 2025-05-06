import { RouterProvider } from 'react-router'
import { ThirdwebProvider } from 'thirdweb/react'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './context/auth-context'
import { UserProvider } from './context/user-context'
import { router } from './routes/routes'
import posthog from 'posthog-js'

posthog.init('phc_BqztwyidshV6a52EXDd1vIHxoSoQCfmuPnqa479n8Bz', { api_host: 'https://eu.i.posthog.com' })

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThirdwebProvider>
        <AuthProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </AuthProvider>
      </ThirdwebProvider>
    </ThemeProvider>
  )
}
