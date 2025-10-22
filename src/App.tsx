import { RouterProvider } from 'react-router'
import { PrivyProvider, ThemeProvider } from './components/providers'
import { AuthProvider } from './context/auth-context'
import { UserProvider } from './context/user-context'
import { router } from './routes/routes'

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <PrivyProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </PrivyProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
