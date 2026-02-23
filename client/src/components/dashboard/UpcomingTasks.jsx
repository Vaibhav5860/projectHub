import React from 'react'

const upcomingTasks = [
  { title: 'Review PR #142', priority: 'High', due: 'Today', tag: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400' },
  { title: 'Update user docs', priority: 'Medium', due: 'Tomorrow', tag: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { title: 'Team standup notes', priority: 'Low', due: 'Wed', tag: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { title: 'Deploy staging build', priority: 'High', due: 'Thu', tag: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400' },
]

const UpcomingTasks = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="font-semibold text-slate-900 dark:text-white">Upcoming Tasks</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition cursor-pointer">View all</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {upcomingTasks.map((task) => (
          <div key={task.title} className="px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{task.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${task.tag}`}>{task.priority}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">Due {task.due}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingTasks
