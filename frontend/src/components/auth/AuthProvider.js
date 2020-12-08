import React, {
  useState,
  createContext,
  useEffect,
  useContext,
} from 'react'


const AuthContext = createContext(null)

export default function AuthProvider({children}) {
  const [{user, isLoading}, setState] = useState({
    user: null,
    isLoading: false,
  })

  useEffect(() => {
    // TODO: try to fetch user profile on first page load
  }, [])

  // TODO: Replace loader with a proper component
  return isLoading ? (
    'loading...'
  ) : (
    <AuthContext.Provider value={{user}}>
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