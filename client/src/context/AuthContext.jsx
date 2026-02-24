import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI, usersAPI } from '../services/api'
import { connectSocket, disconnectSocket } from '../services/socket'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('projecthub_token'))
  const [loading, setLoading] = useState(true)

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await authAPI.getMe()
          setUser(res.data.data)
          connectSocket(res.data.data._id)
        } catch (err) {
          console.error('Failed to load user:', err)
          localStorage.removeItem('projecthub_token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [token])

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password })
    const { token: newToken } = res.data
    localStorage.setItem('projecthub_token', newToken)
    setToken(newToken)
    // Fetch user data
    const userRes = await authAPI.getMe()
    setUser(userRes.data.data)
    connectSocket(userRes.data.data._id)
    return userRes.data.data
  }

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password })
    const { token: newToken } = res.data
    localStorage.setItem('projecthub_token', newToken)
    setToken(newToken)
    // Fetch user data
    const userRes = await authAPI.getMe()
    setUser(userRes.data.data)
    connectSocket(userRes.data.data._id)
    return userRes.data.data
  }

  const logout = useCallback(() => {
    localStorage.removeItem('projecthub_token')
    setToken(null)
    setUser(null)
    disconnectSocket()
  }, [])

  const updateUser = async (updates) => {
    if (!user) return
    const res = await usersAPI.update(user._id, updates)
    setUser(res.data.data)
    return res.data.data
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
