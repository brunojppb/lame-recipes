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
  // TODO: Use Apollo cache instead of own user state here
  // Using cache.writeQuery instead to replace `setUser`
  const [user, setUser] = useState(undefined)
  const {loading, data} = useQuery(GET_ME)

  const onSignOut = useCallback(() => {
    setUser(null)
  }, [])

  useEffect(() => {
    setUser((data && data.user) ? data.user : null)
  }, [data])

  // TODO: Replace loader with a proper component
  if (loading || typeof user === 'undefined') return 'Loading...'

  return (
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