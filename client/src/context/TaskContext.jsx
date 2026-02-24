import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { tasksAPI } from '../services/api'
import { useAuth } from './AuthContext'
import { getSocket, emitDataChanged } from '../services/socket'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchTasks = useCallback(async () => {
    if (!token) {
      setTasks([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await tasksAPI.getAll()
      setTasks(res.data.data.map(t => ({
        ...t,
        id: t._id,
        assignee: typeof t.assignee === 'object' ? t.assignee?.name : (t.assignee || ''),
        assigneeId: typeof t.assignee === 'object' ? t.assignee?._id : t.assignee,
        project: typeof t.project === 'object' ? t.project?.name : (t.project || ''),
        projectId: typeof t.project === 'object' ? t.project?._id : t.project,
        subtasks: (t.subtasks || []).map(s => ({ ...s, id: s._id })),
      })))
      setError(null)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      setError(err.response?.data?.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Listen for real-time updates
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handleDataUpdate = (data) => {
      if (data.type === 'task') {
        fetchTasks()
      }
    }

    socket.on('data_updated', handleDataUpdate)
    return () => socket.off('data_updated', handleDataUpdate)
  }, [fetchTasks])

  const addTask = async (taskData) => {
    try {
      // Clean data for API - remove text assignee (backend expects ObjectId or empty)
      const apiData = { ...taskData }
      if (apiData.assignee && typeof apiData.assignee === 'string' && !apiData.assignee.match(/^[0-9a-fA-F]{24}$/)) {
        delete apiData.assignee
      }
      if (apiData.project && typeof apiData.project === 'string' && !apiData.project.match(/^[0-9a-fA-F]{24}$/)) {
        delete apiData.project
      }
      const res = await tasksAPI.create(apiData)
      const task = { ...res.data.data, id: res.data.data._id, subtasks: (res.data.data.subtasks || []).map(s => ({ ...s, id: s._id })) }
      setTasks((prev) => [task, ...prev])
      emitDataChanged({ type: 'task', action: 'create' })
      return task
    } catch (err) {
      throw err
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const res = await tasksAPI.update(id, updates)
      const task = { ...res.data.data, id: res.data.data._id, subtasks: (res.data.data.subtasks || []).map(s => ({ ...s, id: s._id })) }
      setTasks((prev) => prev.map((t) => (t._id === id || t.id === id ? task : t)))
      emitDataChanged({ type: 'task', action: 'update' })
      return task
    } catch (err) {
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await tasksAPI.delete(id)
      setTasks((prev) => prev.filter((t) => t._id !== id && t.id !== id))
      emitDataChanged({ type: 'task', action: 'delete' })
    } catch (err) {
      throw err
    }
  }

  const addSubtask = async (taskId, title) => {
    try {
      const task = tasks.find((t) => t._id === taskId || t.id === taskId)
      if (!task) return
      const subtasks = [...(task.subtasks || []), { title, completed: false }]
      const res = await tasksAPI.update(task._id || taskId, { subtasks })
      const updated = { ...res.data.data, id: res.data.data._id, subtasks: (res.data.data.subtasks || []).map(s => ({ ...s, id: s._id })) }
      setTasks((prev) => prev.map((t) => (t._id === taskId || t.id === taskId ? updated : t)))
      emitDataChanged({ type: 'task', action: 'update' })
    } catch (err) {
      throw err
    }
  }

  const toggleSubtask = async (taskId, subtaskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId || t.id === taskId)
      if (!task) return
      const subtasks = task.subtasks.map((s) =>
        (s._id === subtaskId || s.id === subtaskId) ? { ...s, completed: !s.completed } : s
      )
      const res = await tasksAPI.update(task._id || taskId, { subtasks })
      const updated = { ...res.data.data, id: res.data.data._id, subtasks: (res.data.data.subtasks || []).map(s => ({ ...s, id: s._id })) }
      setTasks((prev) => prev.map((t) => (t._id === taskId || t.id === taskId ? updated : t)))
      emitDataChanged({ type: 'task', action: 'update' })
    } catch (err) {
      throw err
    }
  }

  const deleteSubtask = async (taskId, subtaskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId || t.id === taskId)
      if (!task) return
      const subtasks = task.subtasks.filter((s) => s._id !== subtaskId && s.id !== subtaskId)
      const res = await tasksAPI.update(task._id || taskId, { subtasks })
      const updated = { ...res.data.data, id: res.data.data._id, subtasks: (res.data.data.subtasks || []).map(s => ({ ...s, id: s._id })) }
      setTasks((prev) => prev.map((t) => (t._id === taskId || t.id === taskId ? updated : t)))
      emitDataChanged({ type: 'task', action: 'update' })
    } catch (err) {
      throw err
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask, addSubtask, toggleSubtask, deleteSubtask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
