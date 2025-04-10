import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { getUserDetails } from '@/services/user'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer'
import Header from '../header/header'

const Layout = () => {
  const { isValid, token } = useAuthContext()
  const { setUser } = useUserContext()

  useEffect(() => {
    const handleGetUserDetails = async () => {
      try {
        const response = await getUserDetails()
        if (response.data.id) {
          setUser(response.data)
        }
      } catch (error) {
        console.log('Failed to get user details: ', error)
      }
    }

    if (isValid) {
      console.log(isValid)

      handleGetUserDetails()
    }
  }, [isValid])

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
