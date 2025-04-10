import { setAxiosAuthorization } from '@/services/axios.config'
import { apiServices } from 'otomato-sdk'
import { createContext, useContext, useReducer } from 'react'

type TypeAuthContext = {
  token: string
  isValid: boolean
  lastAddressLoggedIn: string
  setAuth: (token: string, isValid: boolean) => void
  setLastAddressLoggedIn: (address: string) => void
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
    const isValid = Date.now() < exp * 1000

    return isValid
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return false // Return false if decoding fails
  }
}

// Get values from localStorage
const lastAddressLoggedIn = localStorage.getItem('lastAddressLoggedIn') || ''
const storedToken = localStorage.getItem('token') || ''

// Determine token validity
const isValidToken = storedToken ? decodeJWTAndCheckValidity(storedToken) : false

// Define the initial state
const initialState = {
  token: storedToken,
  lastAddressLoggedIn: lastAddressLoggedIn,
  isValid: isValidToken,
  setAuth: () => {},
  setLastAddressLoggedIn: () => {},
}

if (isValidToken) {
  apiServices.setAuth(storedToken)
  setAxiosAuthorization(storedToken)
}

const AuthContext = createContext<TypeAuthContext>(initialState)

const reducer = (state: TypeAuthContext, { type, payload }: TypeAction) => {
  switch (type) {
    case 'SET_TOKEN': {
      return { ...state, token: payload.token, isValid: payload.isValid }
    }

    case 'SET_LAST_ADDRESS_LOGGED_IN': {
      return { ...state, lastAddressLoggedIn: payload || '' }
    }

    default:
      return state
  }
}

const AuthProvider = ({ children }: TypeProps) => {
  // Uses `isLoggedIn` prop to determine whether or not to render a user
  const [auth, dispatch] = useReducer(reducer, initialState)

  const handleSetAuth = (token: string, isValid: boolean) => {
    if (token && isValid) apiServices.setAuth(token)

    dispatch({ type: 'SET_TOKEN', payload: { token, isValid } })
  }

  const handleSetAddressLoggedIn = (address: string) => {
    dispatch({ type: 'SET_LAST_ADDRESS_LOGGED_IN', payload: address })
  }

  return (
    <AuthContext.Provider
      value={{ ...auth, setAuth: handleSetAuth, setLastAddressLoggedIn: handleSetAddressLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)
export { AuthContext, AuthProvider, useAuthContext, decodeJWTAndCheckValidity }
