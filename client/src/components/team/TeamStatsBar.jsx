import React from 'react'

const statusDot = {
  'Online': 'bg-emerald-500',
  'Away': 'bg-amber-400',
  'Offline': 'bg-slate-400 dark:bg-slate-500',
}

const TeamStatsBar = ({ members }) => {
  const total = members.length
  const online = members.filter((m) => m.status === 'Online').length
  const departments = [...new Set(members.map((m) => m.department))].length
  const totalTasks = members.reduce((sum, m) => sum + m.tasks, 0)

  const stats = [
    { label: 'Total Members', value: total, icon: '👥' },
    { label: 'Online Now', value: online, icon: '🟢' },
    { label: 'Departments', value: departments, icon: '🏢' },
    { label: 'Active Tasks', value: totalTasks, icon: '📋' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
            <span className="text-base">{stat.icon}</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default TeamStatsBar
