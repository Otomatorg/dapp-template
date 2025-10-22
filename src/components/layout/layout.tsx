import { PATHNAME } from '@/constants/pathname'
import { useAuthContext } from '@/context/auth-context'
import { useUserContext } from '@/context/user-context'
import { getUserDetails } from '@/services/user'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/footer'
import HyperSwapFooter from '../footer/hyperswap-footer'
import Header from '../header/header'

const Layout = () => {
  const { isAuthenticated } = useAuthContext()
  const { setUser } = useUserContext()
  const { pathname } = useLocation()

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

    if (isAuthenticated) {
      handleGetUserDetails()
    }
  }, [isAuthenticated])

  return (
    <div className="w-screen h-screen flex flex-col bg-rgba10-300 overflow-y-auto overflow-x-hidden">
      <Header />
      <Outlet />
      {pathname === PATHNAME.HOME ? <Footer /> : <HyperSwapFooter />}
    </div>
  )
}

export default Layout
