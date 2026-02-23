import React from 'react'

const stats = [
  { label: 'Total Projects', value: '12', icon: '📁', color: 'indigo', change: '+2 this week' },
  { label: 'Active Tasks', value: '34', icon: '✅', color: 'sky', change: '8 due today' },
  { label: 'Team Members', value: '9', icon: '👥', color: 'emerald', change: '+1 new' },
  { label: 'Completed', value: '87%', icon: '📊', color: 'amber', change: '+5% this month' },
]

const colorMap = {
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' },
  sky: { bg: 'bg-sky-100 dark:bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
}

const StatsGrid = () => {
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
