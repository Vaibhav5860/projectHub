import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { projectsAPI } from '../services/api'
import { useAuth } from './AuthContext'
import { getSocket, emitDataChanged } from '../services/socket'

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchProjects = useCallback(async () => {
    if (!token) {
      setProjects([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await projectsAPI.getAll()
      setProjects(res.data.data.map(p => ({
        ...p,
        id: p._id,
        lead: typeof p.lead === 'object' ? p.lead?.name : (p.lead || ''),
        leadId: typeof p.lead === 'object' ? p.lead?._id : p.lead,
        team: (p.team || []).map(m => typeof m === 'object' ? m.name : m),
        teamIds: (p.team || []).map(m => typeof m === 'object' ? m._id : m),
        teamMembers: (p.team || []).map(m => typeof m === 'object' ? { _id: m._id, name: m.name, avatar: m.avatar } : { _id: m, name: m }),
        tags: p.tags || [],
        tasks: p.tasks || { total: 0, completed: 0 },
        recentActivity: p.recentActivity || [],
      })))
      setError(null)
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      setError(err.response?.data?.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Listen for real-time updates
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handleDataUpdate = (data) => {
      if (data.type === 'project') {
        fetchProjects()
      }
    }

    socket.on('data_updated', handleDataUpdate)
    return () => socket.off('data_updated', handleDataUpdate)
  }, [fetchProjects])

  const addProject = async (projectData) => {
    try {
      const res = await projectsAPI.create(projectData)
      const project = { ...res.data.data, id: res.data.data._id }
      setProjects((prev) => [...prev, project])
      emitDataChanged({ type: 'project', action: 'create' })
      return project
    } catch (err) {
      throw err
    }
  }

  const updateProject = async (id, updates) => {
    try {
      const res = await projectsAPI.update(id, updates)
      const project = { ...res.data.data, id: res.data.data._id }
      setProjects((prev) => prev.map((p) => (p._id === id || p.id === id ? project : p)))
      emitDataChanged({ type: 'project', action: 'update' })
      return project
    } catch (err) {
      throw err
    }
  }

  const deleteProject = async (id) => {
    try {
      await projectsAPI.delete(id)
      setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id))
      emitDataChanged({ type: 'project', action: 'delete' })
    } catch (err) {
      throw err
    }
  }

  return (
    <ProjectContext.Provider value={{ projects, loading, error, addProject, updateProject, deleteProject, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)
