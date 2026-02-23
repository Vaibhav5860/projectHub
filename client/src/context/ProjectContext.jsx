import React, { createContext, useContext, useState, useEffect } from 'react'

const ProjectContext = createContext()

const defaultProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern UI/UX, improved performance, and mobile-first approach.',
    status: 'In Progress',
    priority: 'High',
    category: 'Design',
    startDate: '2026-01-10',
    dueDate: '2026-03-15',
    progress: 65,
    budget: 25000,
    spent: 16250,
    lead: 'Sarah Kim',
    team: ['Sarah Kim', 'Mike Robinson', 'Nina Patel'],
    tasks: { total: 24, completed: 16 },
    color: 'from-indigo-500 to-purple-500',
    tags: ['UI/UX', 'Frontend', 'Responsive'],
    recentActivity: [
      { action: 'Updated homepage mockup', by: 'Sarah Kim', time: '2 hours ago' },
      { action: 'Merged feature branch', by: 'Mike Robinson', time: '5 hours ago' },
      { action: 'Added mobile breakpoints', by: 'Nina Patel', time: '1 day ago' },
    ],
  },
  {
    id: '2',
    name: 'Mobile App v2',
    description: 'Version 2 of the mobile application with new features, performance improvements, and cross-platform support.',
    status: 'In Progress',
    priority: 'High',
    category: 'Development',
    startDate: '2026-01-20',
    dueDate: '2026-04-01',
    progress: 40,
    budget: 45000,
    spent: 18000,
    lead: 'David Chen',
    team: ['David Chen', 'Mike Robinson', 'Emma Davis', 'Ryan Foster'],
    tasks: { total: 38, completed: 15 },
    color: 'from-sky-500 to-cyan-500',
    tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    recentActivity: [
      { action: 'Fixed login bug on iOS', by: 'Mike Robinson', time: '3 hours ago' },
      { action: 'Added push notifications', by: 'David Chen', time: '1 day ago' },
      { action: 'Completed QA testing', by: 'Emma Davis', time: '2 days ago' },
    ],
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Build and document REST API endpoints for third-party integrations and internal services.',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Backend',
    startDate: '2026-02-01',
    dueDate: '2026-03-20',
    progress: 55,
    budget: 15000,
    spent: 8250,
    lead: 'Lisa Turner',
    team: ['Lisa Turner', 'David Chen'],
    tasks: { total: 18, completed: 10 },
    color: 'from-emerald-500 to-teal-500',
    tags: ['API', 'REST', 'Documentation'],
    recentActivity: [
      { action: 'Documented auth endpoints', by: 'Lisa Turner', time: '4 hours ago' },
      { action: 'Added rate limiting', by: 'David Chen', time: '1 day ago' },
    ],
  },
  {
    id: '4',
    name: 'Marketing Campaign Q1',
    description: 'Plan and execute the Q1 digital marketing campaign across all channels.',
    status: 'Completed',
    priority: 'Medium',
    category: 'Marketing',
    startDate: '2025-12-15',
    dueDate: '2026-02-10',
    progress: 100,
    budget: 12000,
    spent: 11200,
    lead: 'Amy Wang',
    team: ['Amy Wang', 'John Doe'],
    tasks: { total: 14, completed: 14 },
    color: 'from-amber-500 to-orange-500',
    tags: ['Marketing', 'Social Media', 'SEO'],
    recentActivity: [
      { action: 'Finalized campaign report', by: 'Amy Wang', time: '3 days ago' },
      { action: 'Published results', by: 'John Doe', time: '4 days ago' },
    ],
  },
  {
    id: '5',
    name: 'DevOps Infrastructure',
    description: 'Set up CI/CD pipelines, monitoring, and cloud infrastructure for all environments.',
    status: 'In Progress',
    priority: 'High',
    category: 'Infrastructure',
    startDate: '2026-01-15',
    dueDate: '2026-03-01',
    progress: 75,
    budget: 20000,
    spent: 15000,
    lead: 'Ryan Foster',
    team: ['Ryan Foster', 'David Chen'],
    tasks: { total: 12, completed: 9 },
    color: 'from-rose-500 to-pink-500',
    tags: ['DevOps', 'CI/CD', 'AWS', 'Docker'],
    recentActivity: [
      { action: 'Configured auto-scaling', by: 'Ryan Foster', time: '6 hours ago' },
      { action: 'Set up monitoring alerts', by: 'David Chen', time: '2 days ago' },
    ],
  },
  {
    id: '6',
    name: 'User Research Study',
    description: 'Conduct user interviews, surveys, and usability tests to inform product decisions.',
    status: 'On Hold',
    priority: 'Low',
    category: 'Research',
    startDate: '2026-02-05',
    dueDate: '2026-04-15',
    progress: 20,
    budget: 8000,
    spent: 1600,
    lead: 'Amy Wang',
    team: ['Amy Wang', 'Nina Patel', 'Sarah Kim'],
    tasks: { total: 10, completed: 2 },
    color: 'from-violet-500 to-fuchsia-500',
    tags: ['UX Research', 'Interviews', 'Analytics'],
    recentActivity: [
      { action: 'Created survey template', by: 'Amy Wang', time: '3 days ago' },
      { action: 'Drafted interview questions', by: 'Nina Patel', time: '5 days ago' },
    ],
  },
  {
    id: '7',
    name: 'Security Audit',
    description: 'Comprehensive security review of all systems including penetration testing and vulnerability assessment.',
    status: 'Todo',
    priority: 'High',
    category: 'Security',
    startDate: '2026-03-01',
    dueDate: '2026-03-30',
    progress: 0,
    budget: 18000,
    spent: 0,
    lead: 'Emma Davis',
    team: ['Emma Davis', 'Ryan Foster'],
    tasks: { total: 16, completed: 0 },
    color: 'from-red-500 to-rose-600',
    tags: ['Security', 'Audit', 'Compliance'],
    recentActivity: [],
  },
  {
    id: '8',
    name: 'Data Analytics Dashboard',
    description: 'Build an internal analytics dashboard for tracking KPIs, user metrics, and business performance.',
    status: 'Todo',
    priority: 'Medium',
    category: 'Development',
    startDate: '2026-03-10',
    dueDate: '2026-05-01',
    progress: 0,
    budget: 22000,
    spent: 0,
    lead: 'John Doe',
    team: ['John Doe', 'David Chen', 'Lisa Turner'],
    tasks: { total: 20, completed: 0 },
    color: 'from-teal-500 to-emerald-600',
    tags: ['Analytics', 'Charts', 'Reporting'],
    recentActivity: [],
  },
]

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projecthub_projects')
    return saved ? JSON.parse(saved) : defaultProjects
  })

  useEffect(() => {
    localStorage.setItem('projecthub_projects', JSON.stringify(projects))
  }, [projects])

  const addProject = (project) => {
    setProjects((prev) => [...prev, { ...project, id: Date.now().toString() }])
  }

  const updateProject = (id, updates) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => useContext(ProjectContext)
