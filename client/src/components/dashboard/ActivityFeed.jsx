import React from 'react'

const recentActivity = [
  { user: 'Sarah K.', action: 'completed task', target: 'Design homepage mockup', time: '5 min ago' },
  { user: 'Mike R.', action: 'commented on', target: 'API endpoint spec', time: '12 min ago' },
  { user: 'Lisa T.', action: 'created project', target: 'Dashboard Analytics', time: '1 hr ago' },
  { user: 'John D.', action: 'moved task', target: 'Fix login bug → Done', time: '2 hr ago' },
  { user: 'Amy W.', action: 'uploaded file to', target: 'Brand Assets', time: '3 hr ago' },
]

const ActivityFeed = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition cursor-pointer">View all</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {recentActivity.map((activity, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
              {activity.user.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium text-slate-900 dark:text-white">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium text-slate-900 dark:text-white">{activity.target}</span>
              </p>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed
