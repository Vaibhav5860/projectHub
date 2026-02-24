import React from 'react'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'
import StatsGrid from './StatsGrid'
import RecentProjects from './RecentProjects'
import UpcomingTasks from './UpcomingTasks'
import ActivityFeed from './ActivityFeed'
import ProjectProgressChart from './charts/ProjectProgressChart'
import TaskStatusChart from './charts/TaskStatusChart'
import BudgetOverviewChart from './charts/BudgetOverviewChart'
import WeeklyActivityChart from './charts/WeeklyActivityChart'
import PriorityDistributionChart from './charts/PriorityDistributionChart'
import TaskCompletionChart from './charts/TaskCompletionChart'

const AdminDashboard = () => {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { members } = useTeam()

  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0)
  const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0)
  const adminCount = members.filter(m => m.role === 'admin').length
  const managerCount = members.filter(m => m.role === 'manager').length
  const developerCount = members.filter(m => m.role === 'developer').length
  const overdueTaskCount = tasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date()).length

  return (
    <>
      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">👥</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">All users</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{members.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Total Users</p>
          <div className="flex gap-3 mt-2 text-xs text-slate-400">
            <span>🛡️ {adminCount}</span>
            <span>📋 {managerCount}</span>
            <span>💻 {developerCount}</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">📁</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{projects.filter(p => p.status === 'In Progress').length} active</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{projects.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Total Projects</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">💰</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% utilized</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">${totalBudget.toLocaleString()}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Total Budget</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center text-xl">⚠️</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">needs attention</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{overdueTaskCount}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Overdue Tasks</p>
        </div>
      </div>

      {/* System Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Analytics</h2>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <WeeklyActivityChart />
          </div>
          <TaskStatusChart />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <ProjectProgressChart />
          <BudgetOverviewChart />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <PriorityDistributionChart />
          <TaskCompletionChart />
        </div>
      </div>

      {/* Role Distribution Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm mb-8">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Team Role Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{adminCount}</p>
            <p className="text-xs text-red-500 dark:text-red-400/70 mt-1">🛡️ Admins</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{managerCount}</p>
            <p className="text-xs text-amber-500 dark:text-amber-400/70 mt-1">📋 Managers</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{developerCount}</p>
            <p className="text-xs text-emerald-500 dark:text-emerald-400/70 mt-1">💻 Developers</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <RecentProjects />
        <UpcomingTasks />
      </div>

      <ActivityFeed />
    </>
  )
}

export default AdminDashboard
