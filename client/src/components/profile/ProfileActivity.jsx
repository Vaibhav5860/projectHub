import React from 'react'

const ProfileActivity = ({ activity }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
      </div>
      <div className="p-5">
        <div className="space-y-1">
          {activity.map((item, i) => (
            <div key={item.id} className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition group">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <span className="text-lg">{item.icon}</span>
                {i < activity.length - 1 && (
                  <div className="w-px h-full min-h-[20px] bg-slate-200 dark:bg-slate-700/50 mt-1" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{item.action}</span>{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{item.target}</span>
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileActivity
