import React, { createContext, useContext, useState, useEffect } from 'react'

const ProfileContext = createContext()

const defaultProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Full Stack Developer',
  department: 'Engineering',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate developer with 5+ years of experience building web applications. Love working with React, Node.js, and cloud technologies.',
  avatar: 'JD',
  status: 'Online',
  joinedDate: 'Jan 15, 2024',
  timezone: 'PST (UTC-8)',
  language: 'English',
  website: 'https://johndoe.dev',
  github: 'johndoe',
  linkedin: 'johndoe',
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL'],
  notifications: {
    email: true,
    push: true,
    taskUpdates: true,
    teamMessages: true,
    projectAlerts: true,
    weeklyDigest: false,
  },
  stats: {
    projectsCompleted: 24,
    tasksFinished: 187,
    teamCollaborations: 12,
    codeReviews: 56,
  },
  activity: [
    { id: 1, action: 'Completed task', target: 'Update API documentation', time: '2 hours ago', icon: '✅' },
    { id: 2, action: 'Pushed code to', target: 'feature/auth-module', time: '4 hours ago', icon: '🔀' },
    { id: 3, action: 'Commented on', target: 'Dashboard redesign', time: '6 hours ago', icon: '💬' },
    { id: 4, action: 'Joined project', target: 'Mobile App v2.0', time: '1 day ago', icon: '📁' },
    { id: 5, action: 'Reviewed PR for', target: 'Payment integration', time: '1 day ago', icon: '👀' },
    { id: 6, action: 'Created task', target: 'Setup CI/CD pipeline', time: '2 days ago', icon: '📋' },
    { id: 7, action: 'Updated profile', target: 'Added new skills', time: '3 days ago', icon: '✏️' },
    { id: 8, action: 'Completed milestone', target: 'Sprint 14 delivery', time: '4 days ago', icon: '🎯' },
  ],
}

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('projecthub_profile')
    return saved ? JSON.parse(saved) : defaultProfile
  })

  useEffect(() => {
    localStorage.setItem('projecthub_profile', JSON.stringify(profile))
  }, [profile])

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const updateNotifications = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const addSkill = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
    }
  }

  const removeSkill = (skill) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updateNotifications, addSkill, removeSkill }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
