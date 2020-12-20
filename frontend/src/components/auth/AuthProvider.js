import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback
} from 'react'
import {gql, useQuery} from "@apollo/client";


const AuthContext = createContext(null)

const GET_ME = gql`
    {
        user: getMe {
            name
            email
        }
    }
`

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const {loading, data} = useQuery(GET_ME)

  const onSignOut = useCallback(() => {
    setUser(null)
  }, [])

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user)
    }
  }, [data])

  // TODO: Replace loader with a proper component
  return loading ? (
    'loading...'
  ) : (
    <AuthContext.Provider value={{user, setUser, onSignOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error(`
      useAuth must be used within <AuthProvider>.
      Make sure to put <AuthProvider> on top of you component tree.
    `
    )
  }
  return context
}