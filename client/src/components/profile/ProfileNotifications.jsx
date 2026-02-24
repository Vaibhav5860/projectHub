import React from 'react'

const activityTriggers = [
  { key: 'taskAssigned', label: 'Task Assigned', description: 'Get notified when a task is assigned to you', icon: '📋' },
  { key: 'taskCompleted', label: 'Task Completed', description: 'Get notified when a task is marked as completed', icon: '✅' },
  { key: 'taskComment', label: 'Task Comments', description: 'Get notified when someone comments on your task', icon: '💬' },
  { key: 'projectUpdate', label: 'Project Updates', description: 'Get alerts about project milestones and changes', icon: '📁' },
  { key: 'teamJoin', label: 'Team Activity', description: 'Get notified when someone joins your team', icon: '👥' },
  { key: 'mentionAlert', label: 'Mentions', description: 'Get notified when someone mentions you', icon: '🔔' },
  { key: 'deadlineReminder', label: 'Deadline Reminders', description: 'Get reminders about upcoming deadlines', icon: '⏰' },
]

const ProfileNotifications = ({ notifications, onToggle }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Activity Notifications</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose which activities you want to be notified about</p>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
        {activityTriggers.map((item) => (
          <div key={item.key} className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>
            <button
              onClick={() => onToggle(item.key, !notifications[item.key])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                ${notifications[item.key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileNotifications
