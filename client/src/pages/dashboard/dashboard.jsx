import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import AdminDashboard from '../../components/dashboard/AdminDashboard'
import ManagerDashboard from '../../components/dashboard/ManagerDashboard'
import DeveloperDashboard from '../../components/dashboard/DeveloperDashboard'

const roleBadge = {
  admin: { label: 'Admin', color: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400' },
  manager: { label: 'Manager', color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  developer: { label: 'Developer', color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user } = useAuth()
  const userName = user?.name || 'User'
  const userRole = user?.role || 'developer'

  const badge = roleBadge[userRole] || roleBadge.developer

  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />
      case 'manager':
        return <ManagerDashboard />
      case 'developer':
      default:
        return <DeveloperDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Welcome */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {userName} 👋</h1>
                <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {userRole === 'admin' && "Here's your system-wide overview."}
                {userRole === 'manager' && "Here's what's happening with your projects and team."}
                {userRole === 'developer' && "Here's your task progress and assignments."}
              </p>
            </div>
          </div>

          {renderDashboard()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard