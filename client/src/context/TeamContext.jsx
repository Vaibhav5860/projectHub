import React, { createContext, useContext, useState, useEffect } from 'react'

const TeamContext = createContext()

const defaultMembers = [
  {
    id: '1',
    name: 'Sarah Kim',
    email: 'sarah.kim@example.com',
    role: 'Lead Designer',
    department: 'Design',
    status: 'Online',
    avatar: 'SK',
    joinedDate: '2024-06-15',
    projects: ['Website Redesign', 'Mobile App v2'],
    tasks: 8,
    completedTasks: 5,
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Mike Robinson',
    email: 'mike.r@example.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'Online',
    avatar: 'MR',
    joinedDate: '2024-03-20',
    projects: ['API Integration', 'Mobile App v2'],
    tasks: 12,
    completedTasks: 9,
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
  },
  {
    id: '3',
    name: 'Lisa Turner',
    email: 'lisa.t@example.com',
    role: 'Technical Writer',
    department: 'Engineering',
    status: 'Away',
    avatar: 'LT',
    joinedDate: '2024-09-01',
    projects: ['API Integration', 'Dashboard Analytics'],
    tasks: 6,
    completedTasks: 4,
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Project Manager',
    department: 'Management',
    status: 'Online',
    avatar: 'JD',
    joinedDate: '2024-01-10',
    projects: ['Dashboard Analytics', 'Website Redesign'],
    tasks: 5,
    completedTasks: 3,
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
  },
  {
    id: '5',
    name: 'Amy Wang',
    email: 'amy.w@example.com',
    role: 'UX Researcher',
    department: 'Design',
    status: 'Offline',
    avatar: 'AW',
    joinedDate: '2025-01-05',
    projects: ['Website Redesign'],
    tasks: 4,
    completedTasks: 2,
    phone: '+1 (555) 567-8901',
    location: 'Seattle, WA',
  },
  {
    id: '6',
    name: 'David Chen',
    email: 'david.c@example.com',
    role: 'Full Stack Developer',
    department: 'Engineering',
    status: 'Online',
    avatar: 'DC',
    joinedDate: '2024-07-22',
    projects: ['Mobile App v2', 'API Integration'],
    tasks: 10,
    completedTasks: 7,
    phone: '+1 (555) 678-9012',
    location: 'Los Angeles, CA',
  },
  {
    id: '7',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'Away',
    avatar: 'ED',
    joinedDate: '2024-11-18',
    projects: ['Mobile App v2', 'Dashboard Analytics'],
    tasks: 7,
    completedTasks: 6,
    phone: '+1 (555) 789-0123',
    location: 'Denver, CO',
  },
  {
    id: '8',
    name: 'Ryan Foster',
    email: 'ryan.f@example.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Online',
    avatar: 'RF',
    joinedDate: '2025-02-01',
    projects: ['Dashboard Analytics'],
    tasks: 3,
    completedTasks: 1,
    phone: '+1 (555) 890-1234',
    location: 'Portland, OR',
  },
  {
    id: '9',
    name: 'Nina Patel',
    email: 'nina.p@example.com',
    role: 'Product Designer',
    department: 'Design',
    status: 'Online',
    avatar: 'NP',
    joinedDate: '2024-05-12',
    projects: ['Website Redesign', 'Mobile App v2'],
    tasks: 9,
    completedTasks: 8,
    phone: '+1 (555) 901-2345',
    location: 'Boston, MA',
  },
]

export const TeamProvider = ({ children }) => {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('projecthub-team')
    return saved ? JSON.parse(saved) : defaultMembers
  })

  useEffect(() => {
    localStorage.setItem('projecthub-team', JSON.stringify(members))
  }, [members])

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
      avatar: member.name.split(' ').map((n) => n[0]).join('').toUpperCase(),
      joinedDate: new Date().toISOString().split('T')[0],
      projects: [],
      tasks: 0,
      completedTasks: 0,
    }
    setMembers((prev) => [newMember, ...prev])
    return newMember
  }

  const updateMember = (id, updates) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <TeamContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useTeam = () => {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam must be used within TeamProvider')
  return ctx
}
