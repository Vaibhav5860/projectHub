import React from 'react'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'
import { useTeam } from '../../context/TeamContext'

const colorMap = {
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
  sky: { bg: 'bg-sky-100 dark:bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
}

const StatsGrid = () => {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const { members } = useTeam()

  const activeTasks = tasks.filter(t => t.status !== 'Completed').length
  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const stats = [
    { label: 'Total Projects', value: String(projects.length), icon: '📁', color: 'indigo', change: `${projects.filter(p => p.status === 'In Progress').length} active` },
    { label: 'Active Tasks', value: String(activeTasks), icon: '✅', color: 'sky', change: `${completedTasks} completed` },
    { label: 'Team Members', value: String(members.length), icon: '👥', color: 'emerald', change: 'total members' },
    { label: 'Completed', value: `${completionRate}%`, icon: '📊', color: 'amber', change: `${completedTasks} tasks done` },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`h-10 w-10 rounded-lg ${colorMap[stat.color].bg} ${colorMap[stat.color].text} flex items-center justify-center text-xl`}>
              {stat.icon}
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">{stat.change}</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
