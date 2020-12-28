import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback
} from 'react'
import {useQuery, useApolloClient} from "@apollo/client";
import {GET_ME} from "../../graphql/queries";
import Loader from "../common/Loader";


const AuthContext = createContext(null)

export default function AuthProvider({children}) {
  // TODO: Use Apollo cache instead of own user state here
  // Using cache.writeQuery instead to replace `setUser`
  const [user, setUser] = useState(undefined)
  const {loading, data, error} = useQuery(GET_ME)
  const client = useApolloClient()

  const onSignOut = useCallback(async () => {
    await client.clearStore()
    setUser(null)
  }, [client])

  // TODO: Need better error handling here
  // This reactive updates from useQuery isn't ideal
  useEffect(() => {
    if (typeof data !== 'undefined') {
      setUser(data.user ? data.user : null)
    } else if (error) {
      setUser(null)
    }
  }, [data, error])

  if (loading || typeof user === 'undefined') return <Loader/>

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