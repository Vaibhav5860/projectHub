import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { teamsAPI, usersAPI } from '../services/api'
import { useAuth } from './AuthContext'
import { getSocket, emitDataChanged } from '../services/socket'

const TeamContext = createContext()

export const TeamProvider = ({ children }) => {
  const [members, setMembers] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchMembers = useCallback(async () => {
    if (!token) {
      setMembers([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await usersAPI.getAll()
      setMembers(res.data.data.map((u) => ({
        ...u,
        id: u._id,
        avatar: u.avatar || u.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??',
        joinedDate: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '',
        projects: [],
        tasks: 0,
        completedTasks: 0,
      })))
      setError(null)
    } catch (err) {
      console.error('Failed to fetch members:', err)
      setError(err.response?.data?.message || 'Failed to load team members')
    } finally {
      setLoading(false)
    }
  }, [token])

  const fetchTeams = useCallback(async () => {
    if (!token) {
      setTeams([])
      return
    }
    try {
      const res = await teamsAPI.getAll()
      setTeams(res.data.data)
    } catch (err) {
      console.error('Failed to fetch teams:', err)
    }
  }, [token])

  useEffect(() => {
    fetchMembers()
    fetchTeams()
  }, [fetchMembers, fetchTeams])

  // Listen for real-time updates
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handleDataUpdate = (data) => {
      if (data.type === 'team' || data.type === 'user') {
        fetchMembers()
        fetchTeams()
      }
    }

    socket.on('data_updated', handleDataUpdate)
    return () => socket.off('data_updated', handleDataUpdate)
  }, [fetchMembers, fetchTeams])

  const addMember = async (memberData) => {
    // This registers a new user conceptually - for team we use usersAPI
    // In a real app you'd invite members. For now, we'll just refresh the list.
    emitDataChanged({ type: 'team', action: 'create' })
    await fetchMembers()
  }

  const updateMember = async (id, updates) => {
    try {
      const res = await usersAPI.update(id, updates)
      setMembers((prev) => prev.map((m) => (m._id === id ? { ...m, ...res.data.data } : m)))
      emitDataChanged({ type: 'user', action: 'update' })
      return res.data.data
    } catch (err) {
      throw err
    }
  }

  const deleteMember = async (id) => {
    try {
      await usersAPI.delete(id)
      setMembers((prev) => prev.filter((m) => m._id !== id))
      emitDataChanged({ type: 'user', action: 'delete' })
    } catch (err) {
      throw err
    }
  }

  return (
    <TeamContext.Provider value={{ members, teams, loading, error, addMember, updateMember, deleteMember, fetchMembers, fetchTeams }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useTeam = () => {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam must be used within TeamProvider')
  return ctx
}
