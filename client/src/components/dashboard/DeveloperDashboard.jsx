import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'
import UpcomingTasks from './UpcomingTasks'
import ActivityFeed from './ActivityFeed'
import TaskStatusChart from './charts/TaskStatusChart'
import PriorityDistributionChart from './charts/PriorityDistributionChart'

const priorityColor = {
  High: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10',
  Medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10',
  Low: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
}

const statusColor = {
  'Todo': 'bg-slate-200 dark:bg-slate-600',
  'In Progress': 'bg-blue-500',
  'In Review': 'bg-amber-500',
  'Completed': 'bg-emerald-500',
}

const DeveloperDashboard = () => {
  const { user } = useAuth()
  const { projects } = useProjects()
  const { tasks } = useTasks()

  // Developer-scoped data
  const myTasks = tasks.filter(t =>
    t.assigneeId === user?._id
  )
  const myProjects = projects.filter(p =>
    p.teamIds?.includes(user?._id) ||
    p.leadId === user?._id
  )

  const todoTasks = myTasks.filter(t => t.status === 'Todo').length
  const inProgressTasks = myTasks.filter(t => t.status === 'In Progress').length
  const inReviewTasks = myTasks.filter(t => t.status === 'In Review').length
  const completedTasks = myTasks.filter(t => t.status === 'Completed').length
  const completionRate = myTasks.length > 0 ? Math.round((completedTasks / myTasks.length) * 100) : 0

  const overdueTasks = myTasks.filter(t => t.status !== 'Completed' && new Date(t.dueDate) < new Date())
  const highPriorityTasks = myTasks.filter(t => t.priority === 'High' && t.status !== 'Completed')

  return (
    <>
      {/* Developer Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">📋</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{todoTasks} todo</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{myTasks.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">My Tasks</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">🔧</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{inReviewTasks} in review</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{inProgressTasks}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">In Progress</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">🎯</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{completedTasks} done</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Completion Rate</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl">📁</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">assigned to me</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{myProjects.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">My Projects</p>
        </div>
      </div>

      {/* Alerts */}
      {(overdueTasks.length > 0 || highPriorityTasks.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {overdueTasks.length > 0 && (
            <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">Overdue Tasks ({overdueTasks.length})</h3>
              </div>
              <div className="space-y-2">
                {overdueTasks.slice(0, 3).map(t => (
                  <div key={t._id} className="flex items-center justify-between">
                    <span className="text-sm text-red-600 dark:text-red-400 truncate">{t.title}</span>
                    <span className="text-xs text-red-500 dark:text-red-400/70 shrink-0 ml-2">
                      {new Date(t.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {highPriorityTasks.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔥</span>
                <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400">High Priority ({highPriorityTasks.length})</h3>
              </div>
              <div className="space-y-2">
                {highPriorityTasks.slice(0, 3).map(t => (
                  <div key={t._id} className="flex items-center justify-between">
                    <span className="text-sm text-amber-600 dark:text-amber-400 truncate">{t.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[t.status]} text-white`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Pipeline */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm mb-8">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">My Task Pipeline</h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600/30">
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300">{todoTasks}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Todo</p>
            <div className="h-1 w-full bg-slate-200 dark:bg-slate-600 rounded-full mt-2" />
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{inProgressTasks}</p>
            <p className="text-xs text-blue-500 dark:text-blue-400/70 mt-1">In Progress</p>
            <div className="h-1 w-full bg-blue-500 rounded-full mt-2" />
          </div>
          <div className="text-center p-3 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20">
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{inReviewTasks}</p>
            <p className="text-xs text-amber-500 dark:text-amber-400/70 mt-1">In Review</p>
            <div className="h-1 w-full bg-amber-500 rounded-full mt-2" />
          </div>
          <div className="text-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{completedTasks}</p>
            <p className="text-xs text-emerald-500 dark:text-emerald-400/70 mt-1">Completed</p>
            <div className="h-1 w-full bg-emerald-500 rounded-full mt-2" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <TaskStatusChart />
        <PriorityDistributionChart />
      </div>

      {/* My Projects */}
      {myProjects.length > 0 && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm mb-8">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">My Projects</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
            {myProjects.slice(0, 5).map(p => (
              <div key={p._id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center text-sm" style={{ backgroundColor: p.color || '#6366f1' }}>
                    {p.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{p.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${p.progress || 0}%` }} />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-8 text-right">{p.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <UpcomingTasks />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </>
  )
}

export default DeveloperDashboard
