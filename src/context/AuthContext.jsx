import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEFAULT_USERNAME = 'user'
const DEFAULT_PASSWORD = 'password'

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedAuth = localStorage.getItem('isLoggedIn')
    if (storedAuth === 'true') {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
