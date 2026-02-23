import React from 'react'

const ProjectStatsBar = ({ projects }) => {
  const total = projects.length
  const inProgress = projects.filter((p) => p.status === 'In Progress').length
  const completed = projects.filter((p) => p.status === 'Completed').length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)

  const stats = [
    { label: 'Total Projects', value: total, icon: '📁', accent: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'In Progress', value: inProgress, icon: '🔄', accent: 'text-sky-600 dark:text-sky-400' },
    { label: 'Completed', value: completed, icon: '✅', accent: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Budget Used', value: `${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%`, icon: '💰', accent: 'text-amber-600 dark:text-amber-400' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
            <span className="text-base">{stat.icon}</span>
          </div>
          <p className={`text-xl font-bold ${stat.accent}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default ProjectStatsBar
