import React, { useState } from 'react'
import { useProfile } from '../../context/ProfileContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import ProfileHeader from '../../components/profile/ProfileHeader'
import ProfileStats from '../../components/profile/ProfileStats'
import ProfileInfo from '../../components/profile/ProfileInfo'
import ProfileActivity from '../../components/profile/ProfileActivity'
import ProfileNotifications from '../../components/profile/ProfileNotifications'

const Profile = () => {
  const { profile, updateProfile, updateNotifications, addSkill, removeSkill } = useProfile()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'notifications', label: 'Notifications' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} activePage="Profile" />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your account and preferences</p>
          </div>

          <ProfileHeader profile={profile} onUpdate={updateProfile} />

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-1 w-fit shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer
                  ${activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              <ProfileStats stats={profile.stats} />
              <ProfileInfo
                profile={profile}
                onUpdate={updateProfile}
                onAddSkill={addSkill}
                onRemoveSkill={removeSkill}
              />
            </>
          )}

          {activeTab === 'activity' && (
            <ProfileActivity activity={profile.activity} />
          )}

          {activeTab === 'notifications' && (
            <ProfileNotifications
              notifications={profile.notifications}
              onToggle={updateNotifications}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Profile
