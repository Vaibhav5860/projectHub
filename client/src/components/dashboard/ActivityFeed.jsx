import React, { useEffect, useState } from 'react'
import { activitiesAPI } from '../../services/api'

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchActivities = async () => {
    try {
      const res = await activitiesAPI.getAll(8)
      setActivities(res.data.data)
    } catch (err) {
      console.error('Failed to fetch activities:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
        <button onClick={fetchActivities} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition cursor-pointer">Refresh</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {loading ? (
          <div className="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500">No recent activity yet</div>
        ) : (
          activities.map((activity) => {
            const userName = activity.user?.name || 'Unknown'
            const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase()
            return (
              <div key={activity._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium text-slate-900 dark:text-white">{userName}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium text-slate-900 dark:text-white">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{timeAgo(activity.createdAt)}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ActivityFeed
