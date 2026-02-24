import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'
import RecentProjects from './RecentProjects'
import UpcomingTasks from './UpcomingTasks'
import ActivityFeed from './ActivityFeed'
import ProjectProgressChart from './charts/ProjectProgressChart'
import TaskStatusChart from './charts/TaskStatusChart'
import WeeklyActivityChart from './charts/WeeklyActivityChart'
import TaskCompletionChart from './charts/TaskCompletionChart'

const ManagerDashboard = () => {
  const { user } = useAuth()
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { members } = useTeam()

  // Manager-scoped stats
  const myProjects = projects.filter(p =>
    p.leadId === user?._id ||
    p.teamIds?.includes(user?._id) ||
    p.createdBy === user?._id
  )
  const myTasks = tasks.filter(t =>
    t.assigneeId === user?._id || t.createdBy === user?._id
  )
  const activeTasks = myTasks.filter(t => t.status !== 'Completed').length
  const completedTasks = myTasks.filter(t => t.status === 'Completed').length
  const completionRate = myTasks.length > 0 ? Math.round((completedTasks / myTasks.length) * 100) : 0
  const inProgressProjects = myProjects.filter(p => p.status === 'In Progress').length
  const teamMembers = new Set()
  myProjects.forEach(p => p.teamIds?.forEach(id => teamMembers.add(id)))

  return (
    <>
      {/* Manager Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl">📁</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{inProgressProjects} active</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{myProjects.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">My Projects</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">✅</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{completedTasks} done</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{activeTasks}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Active Tasks</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">👥</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">across projects</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{teamMembers.size}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Team Members</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl">📊</div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{completedTasks} tasks done</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Completion Rate</p>
        </div>
      </div>

      {/* Project & Task Analytics */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project Overview</h2>
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <WeeklyActivityChart />
          </div>
          <TaskStatusChart />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ProjectProgressChart />
          <TaskCompletionChart />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm mb-8">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a href="/projects" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 transition cursor-pointer">
            <span className="text-xl">➕</span>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">New Project</span>
          </a>
          <a href="/tasks" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-sky-50 dark:bg-sky-500/5 border border-sky-100 dark:border-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/10 transition cursor-pointer">
            <span className="text-xl">📝</span>
            <span className="text-xs font-medium text-sky-600 dark:text-sky-400">Assign Task</span>
          </a>
          <a href="/team" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 transition cursor-pointer">
            <span className="text-xl">👥</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Manage Team</span>
          </a>
          <a href="/messages" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-purple-50 dark:bg-purple-500/5 border border-purple-100 dark:border-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/10 transition cursor-pointer">
            <span className="text-xl">💬</span>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Messages</span>
          </a>
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

export default ManagerDashboard
