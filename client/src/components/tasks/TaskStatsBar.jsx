import React from 'react'

const TaskStatsBar = ({ tasks }) => {
  const totalTasks = tasks.length
  const todoCount = tasks.filter((t) => t.status === 'Todo').length
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length
  const completedCount = tasks.filter((t) => t.status === 'Completed').length

  const stats = [
    { label: 'Total', value: totalTasks, color: 'text-slate-900 dark:text-white' },
    { label: 'Todo', value: todoCount, color: 'text-slate-600 dark:text-slate-400' },
    { label: 'In Progress', value: inProgressCount, color: 'text-sky-600 dark:text-sky-400' },
    { label: 'Completed', value: completedCount, color: 'text-emerald-600 dark:text-emerald-400' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default TaskStatsBar
