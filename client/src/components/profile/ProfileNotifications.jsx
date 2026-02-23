import React from 'react'

const notificationItems = [
  { key: 'email', label: 'Email Notifications', description: 'Receive email updates about your account activity' },
  { key: 'push', label: 'Push Notifications', description: 'Get push notifications on your devices' },
  { key: 'taskUpdates', label: 'Task Updates', description: 'Get notified when tasks are assigned or updated' },
  { key: 'teamMessages', label: 'Team Messages', description: 'Receive notifications for team messages' },
  { key: 'projectAlerts', label: 'Project Alerts', description: 'Get alerts about project milestones and deadlines' },
  { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Receive a weekly summary of your activity' },
]

const ProfileNotifications = ({ notifications, onToggle }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Notification Preferences</h2>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
        {notificationItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.description}</p>
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
