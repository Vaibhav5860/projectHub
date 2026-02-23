import React, { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

const defaultTasks = [
  {
    id: '1',
    title: 'Design homepage mockup',
    description: 'Create wireframes and high-fidelity mockups for the new homepage redesign.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-02-20',
    assignee: 'Sarah K.',
    project: 'Website Redesign',
    createdAt: '2026-02-10',
    subtasks: [
      { id: 's1', title: 'Research competitor designs', completed: true },
      { id: 's2', title: 'Create wireframe sketches', completed: true },
      { id: 's3', title: 'Build high-fidelity mockup', completed: false },
      { id: 's4', title: 'Get team feedback', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Fix login bug on mobile',
    description: 'Users are unable to log in on iOS Safari. Investigate and fix the issue.',
    status: 'Todo',
    priority: 'High',
    dueDate: '2026-02-17',
    assignee: 'Mike R.',
    project: 'Mobile App v2',
    createdAt: '2026-02-14',
    subtasks: [
      { id: 's5', title: 'Reproduce the bug', completed: true },
      { id: 's6', title: 'Identify root cause', completed: false },
    ],
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints including request/response schemas.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-02-22',
    assignee: 'Lisa T.',
    project: 'API Integration',
    createdAt: '2026-02-12',
    subtasks: [
      { id: 's7', title: 'Auth endpoints', completed: true },
      { id: 's8', title: 'User endpoints', completed: true },
      { id: 's9', title: 'Project endpoints', completed: false },
      { id: 's10', title: 'Task endpoints', completed: false },
    ],
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '2026-02-25',
    assignee: 'John D.',
    project: 'Dashboard Analytics',
    createdAt: '2026-02-15',
    subtasks: [],
  },
  {
    id: '5',
    title: 'User onboarding flow',
    description: 'Design and implement the new user onboarding experience with guided tour.',
    status: 'In Review',
    priority: 'High',
    dueDate: '2026-02-18',
    assignee: 'Amy W.',
    project: 'Website Redesign',
    createdAt: '2026-02-08',
    subtasks: [
      { id: 's11', title: 'Design onboarding screens', completed: true },
      { id: 's12', title: 'Implement step-by-step guide', completed: true },
      { id: 's13', title: 'Add tooltips and highlights', completed: true },
    ],
  },
  {
    id: '6',
    title: 'Database optimization',
    description: 'Optimize slow queries and add proper indexing for better performance.',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-02-15',
    assignee: 'Mike R.',
    project: 'API Integration',
    createdAt: '2026-02-05',
    subtasks: [
      { id: 's14', title: 'Identify slow queries', completed: true },
      { id: 's15', title: 'Add database indexes', completed: true },
      { id: 's16', title: 'Test performance improvements', completed: true },
    ],
  },
  {
    id: '7',
    title: 'Create team standup template',
    description: 'Design a reusable standup meeting template for daily team syncs.',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-02-12',
    assignee: 'Sarah K.',
    project: 'Dashboard Analytics',
    createdAt: '2026-02-10',
    subtasks: [],
  },
]

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('projecthub-tasks')
    return saved ? JSON.parse(saved) : defaultTasks
  })

  useEffect(() => {
    localStorage.setItem('projecthub-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      subtasks: [],
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const addSubtask = (taskId, title) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: [...t.subtasks, { id: `s${Date.now()}`, title, completed: false }] }
          : t
      )
    )
  }

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed: !s.completed } : s
              ),
            }
          : t
      )
    )
  }

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subtaskId) }
          : t
      )
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, addSubtask, toggleSubtask, deleteSubtask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}
