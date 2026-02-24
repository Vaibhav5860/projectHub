import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const { user, updateUser: authUpdateUser } = useAuth()

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'Member',
    department: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '',
    status: 'Online',
    joinedDate: '',
    timezone: '',
    language: 'English',
    website: '',
    github: '',
    linkedin: '',
    skills: [],
    notifications: {
      email: true,
      push: true,
      taskUpdates: true,
      teamMessages: true,
      projectAlerts: true,
      weeklyDigest: false,
    },
    stats: {
      projectsCompleted: 0,
      tasksFinished: 0,
      teamCollaborations: 0,
      codeReviews: 0,
    },
    activity: [],
  })

  // Sync profile from auth user
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role || prev.role,
        department: user.department || prev.department,
        phone: user.phone || prev.phone,
        location: user.location || prev.location,
        bio: user.bio || prev.bio,
        avatar: user.avatar || user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || prev.avatar,
        status: user.status || prev.status,
        joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : prev.joinedDate,
        timezone: user.timezone || prev.timezone,
        language: user.language || prev.language,
        website: user.website || prev.website,
        github: user.github || prev.github,
        linkedin: user.linkedin || prev.linkedin,
        skills: user.skills?.length > 0 ? user.skills : prev.skills,
        notifications: user.notifications || prev.notifications,
      }))
    }
  }, [user])

  const updateProfile = async (updates) => {
    try {
      await authUpdateUser(updates)
      setProfile((prev) => ({ ...prev, ...updates }))
    } catch (err) {
      console.error('Failed to update profile:', err)
      throw err
    }
  }

  const updateNotifications = async (key, value) => {
    try {
      const newNotifications = { ...profile.notifications, [key]: value }
      await authUpdateUser({ notifications: newNotifications })
      setProfile((prev) => ({
        ...prev,
        notifications: newNotifications,
      }))
    } catch (err) {
      console.error('Failed to update notifications:', err)
      throw err
    }
  }

  const addSkill = async (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      const newSkills = [...profile.skills, skill]
      try {
        await authUpdateUser({ skills: newSkills })
        setProfile((prev) => ({ ...prev, skills: newSkills }))
      } catch (err) {
        console.error('Failed to add skill:', err)
        throw err
      }
    }
  }

  const removeSkill = async (skill) => {
    const newSkills = profile.skills.filter((s) => s !== skill)
    try {
      await authUpdateUser({ skills: newSkills })
      setProfile((prev) => ({ ...prev, skills: newSkills }))
    } catch (err) {
      console.error('Failed to remove skill:', err)
      throw err
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updateNotifications, addSkill, removeSkill }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
