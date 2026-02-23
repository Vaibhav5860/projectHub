import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import StatsGrid from '../../components/dashboard/StatsGrid'
import RecentProjects from '../../components/dashboard/RecentProjects'
import UpcomingTasks from '../../components/dashboard/UpcomingTasks'
import ActivityFeed from '../../components/dashboard/ActivityFeed'
import ProjectProgressChart from '../../components/dashboard/charts/ProjectProgressChart'
import TaskStatusChart from '../../components/dashboard/charts/TaskStatusChart'
import BudgetOverviewChart from '../../components/dashboard/charts/BudgetOverviewChart'
import WeeklyActivityChart from '../../components/dashboard/charts/WeeklyActivityChart'
import PriorityDistributionChart from '../../components/dashboard/charts/PriorityDistributionChart'
import TaskCompletionChart from '../../components/dashboard/charts/TaskCompletionChart'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const userName = location.state?.name || 'User'
  const userRole = location.state?.role || 'developer'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {userName} 👋</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your projects today.</p>
          </div>

          <StatsGrid />

          {/* Analytics Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Analytics Overview</h2>

            {/* Row 1: Weekly Activity (wide) + Task Status (donut) */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <WeeklyActivityChart />
              </div>
              <TaskStatusChart />
            </div>

            {/* Row 2: Project Progress + Budget Overview */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ProjectProgressChart />
              <BudgetOverviewChart />
            </div>

            {/* Row 3: Priority Distribution + Task Completion */}
            <div className="grid lg:grid-cols-2 gap-6">
              <PriorityDistributionChart />
              <TaskCompletionChart />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <RecentProjects />
            <UpcomingTasks />
          </div>

          <ActivityFeed />
        </main>
      </div>
    </div>
  )
}

export default Dashboard