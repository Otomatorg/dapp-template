import { createContext, useContext, useReducer } from 'react'

type TypeUserContext = {
  id: string
  walletAddress: string
  referralCode: string
  dateCreated: string
  dateModified: string
  hasAcceptedTerm?: boolean
  email?: string
  name?: string | null
  refCount: number
  setUser: (payload: TypeUserContext) => void
}

const initialState = {
  id: '',
  walletAddress: '',
  referralCode: '',
  dateCreated: '',
  dateModified: '',
  refCount: 0,
  setUser: () => {},
}

const UserContext = createContext<TypeUserContext>(initialState)

const reducer = (state: TypeUserContext, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(reducer, initialState)

  const handleSetUser = (payload: TypeUserContext) => {
    dispatch({ type: 'SET_USER', payload })
  }

  return (
    <UserContext.Provider value={{ ...user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)
export { UserContext, UserProvider, useUserContext }
