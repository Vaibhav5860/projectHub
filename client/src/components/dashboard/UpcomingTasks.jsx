import React from 'react'
import { useTasks } from '../../context/TaskContext'

const priorityTag = {
  High: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400',
  Medium: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Low: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

const UpcomingTasks = () => {
  const { tasks } = useTasks()
  const upcomingTasks = tasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999'))
    .slice(0, 4)
    .map(t => {
      const due = t.dueDate ? new Date(t.dueDate) : null
      const today = new Date()
      let dueLabel = 'No date'
      if (due) {
        const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
        if (diff <= 0) dueLabel = 'Today'
        else if (diff === 1) dueLabel = 'Tomorrow'
        else dueLabel = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }
      return {
        title: t.title,
        priority: t.priority,
        due: dueLabel,
        tag: priorityTag[t.priority] || priorityTag.Medium,
      }
    })

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
