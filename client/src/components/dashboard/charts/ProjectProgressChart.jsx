import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useProjects } from '../../../context/ProjectContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#ef4444', '#14b8a6']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
        <p className="text-sm text-indigo-600 dark:text-indigo-400">
          Progress: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

const ProjectProgressChart = () => {
  const { theme } = useTheme()
  const { projects } = useProjects()
  const isDark = theme === 'dark'

  const data = projects.map((p) => ({
    name: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name,
    progress: p.progress,
  }))

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Project Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#334155' : '#e2e8f0'}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
              axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
              tickLine={false}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9' }} />
            <Bar dataKey="progress" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProjectProgressChart
