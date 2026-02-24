import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { activitiesAPI } from '../../../services/api'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const WeeklyActivityChart = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activityData, setActivityData] = useState([
    { day: 'Mon', tasks: 0, projects: 0, team: 0 },
    { day: 'Tue', tasks: 0, projects: 0, team: 0 },
    { day: 'Wed', tasks: 0, projects: 0, team: 0 },
    { day: 'Thu', tasks: 0, projects: 0, team: 0 },
    { day: 'Fri', tasks: 0, projects: 0, team: 0 },
    { day: 'Sat', tasks: 0, projects: 0, team: 0 },
    { day: 'Sun', tasks: 0, projects: 0, team: 0 },
  ])

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await activitiesAPI.getWeekly()
        if (res.data.data?.length) setActivityData(res.data.data)
      } catch (err) {
        console.error('Failed to fetch weekly activity:', err)
      }
    }
    fetchWeekly()
  }, [])

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">Weekly Activity</h3>
        <div className="flex gap-3">
          {[
            { label: 'Tasks', color: '#6366f1' },
            { label: 'Projects', color: '#10b981' },
            { label: 'Team', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#334155' : '#e2e8f0'}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
              axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="tasks"
              name="Tasks"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorTasks)"
            />
            <Area
              type="monotone"
              dataKey="projects"
              name="Projects"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorCommits)"
            />
            <Area
              type="monotone"
              dataKey="team"
              name="Team"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#colorReviews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default WeeklyActivityChart
