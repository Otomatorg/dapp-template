import { setAxiosAuthorization } from '@/services/axios.config'
import { apiServices } from 'otomato-sdk'
import { createContext, useContext, useEffect, useReducer } from 'react'

type TypeAuthContext = {
  token: string
  lastAddressLoggedIn: string
  isLoading: boolean
  isAuthenticated: boolean
  getToken: () => string
  setAuth: (token: string, isValid: boolean) => void
  setLastAddressLoggedIn: (address: string) => void
  onLogout: () => void
}

type TypeProps = {
  children: React.ReactNode
}

type TypeAction = {
  type: string
  payload: any
}

const decodeJWTAndCheckValidity = (token: string) => {
  try {
    // Decode the token payload (middle part of the JWT)
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = JSON.parse(atob(base64))

    // Extract the `exp` field
    const exp = jsonPayload.exp

    // Check if current time is before expiration
    const currentTime = Date.now()
    const expirationTime = exp * 1000
    const isValid = currentTime < expirationTime

    return isValid
  } catch (error) {
    return false // Return false if decoding fails
  }
}

// Get values from localStorage
const lastAddressLoggedIn = localStorage.getItem('lastAddressLoggedIn') || ''
const storedToken = localStorage.getItem('token') || ''

// Define the initial state - we'll validate the token in the provider
const initialState = {
  isLoading: false,
  token: storedToken,
  isAuthenticated: false, // Start as false, validate in provider
  lastAddressLoggedIn: lastAddressLoggedIn,
  getToken: () => '',
  setLastAddressLoggedIn: () => {},
  setAuth: () => {},
  onLogout: () => {},
}

const AuthContext = createContext<TypeAuthContext>(initialState)

const reducer = (state: TypeAuthContext, { type, payload }: TypeAction) => {
  switch (type) {
    case 'SET_TOKEN': {
      const newState = {
        ...state,
        token: payload.token,
        isAuthenticated: payload.isValid,
      }

      // Update localStorage
      if (payload.token && payload.isValid) {
        localStorage.setItem('token', payload.token)
        apiServices.setAuth(payload.token)
        setAxiosAuthorization(payload.token)
      } else {
        localStorage.removeItem('token')
        apiServices.setAuth('')
        setAxiosAuthorization('')
      }

      return newState
    }

    case 'SET_LAST_ADDRESS_LOGGED_IN': {
      const newState = { ...state, lastAddressLoggedIn: payload || '' }
      localStorage.setItem('lastAddressLoggedIn', payload || '')
      return newState
    }

    default:
      return state
  }
}

const AuthProvider = ({ children }: TypeProps) => {
  // Uses `isLoggedIn` prop to determine whether or not to render a user
  const [auth, dispatch] = useReducer(reducer, initialState)

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('lastAddressLoggedIn')

    apiServices.setAuth('')
    setAxiosAuthorization('')

    dispatch({ type: 'SET_TOKEN', payload: { token: '', isValid: false } })
    dispatch({ type: 'SET_LAST_ADDRESS_LOGGED_IN', payload: '' })
  }

  // Validate stored token on component mount
  useEffect(() => {
    if (storedToken) {
      const isValid = decodeJWTAndCheckValidity(storedToken)

      if (isValid) {
        apiServices.setAuth(storedToken)
        setAxiosAuthorization(storedToken)
        dispatch({ type: 'SET_TOKEN', payload: { token: storedToken, isValid } })
      } else {
        handleLogout()
      }
    }
  }, [])

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.token) return

    const checkTokenExpiration = () => {
      const isValid = decodeJWTAndCheckValidity(auth.token)
      if (!isValid) {
        handleLogout()
      }
    }

    // Check every 30 seconds
    const interval = setInterval(checkTokenExpiration, 30000)

    return () => clearInterval(interval)
  }, [auth.isAuthenticated, auth.token])

  const handleGetToken = () => {
    return auth.token
  }

  const handleSetAuth = (token: string, isValid: boolean) => {
    dispatch({ type: 'SET_TOKEN', payload: { token, isValid } })
  }

  const handleSetAddressLoggedIn = (address: string) => {
    dispatch({ type: 'SET_LAST_ADDRESS_LOGGED_IN', payload: address })
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        getToken: handleGetToken,
        setAuth: handleSetAuth,
        setLastAddressLoggedIn: handleSetAddressLoggedIn,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)
export { AuthContext, AuthProvider, decodeJWTAndCheckValidity, useAuthContext }
