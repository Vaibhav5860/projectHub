import React from 'react'

const ProfileStats = ({ stats }) => {
  const items = [
    { label: 'Projects Completed', value: stats.projectsCompleted, icon: '📁', color: 'from-indigo-500 to-purple-500' },
    { label: 'Tasks Finished', value: stats.tasksFinished, icon: '✅', color: 'from-emerald-500 to-teal-500' },
    { label: 'Team Collaborations', value: stats.teamCollaborations, icon: '👥', color: 'from-sky-500 to-cyan-500' },
    { label: 'Code Reviews', value: stats.codeReviews, icon: '👀', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item) => (
        <div key={item.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{item.icon}</span>
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${item.color} opacity-10`} />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfileStats
