import { RouterProvider } from 'react-router'
import { ThirdwebProvider } from 'thirdweb/react'
import { ThemeProvider } from './components/providers'
import { AuthProvider } from './context/auth-context'
import { UserProvider } from './context/user-context'
import { router } from './routes/routes'

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
