import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useProjects } from '../../../context/ProjectContext'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#ef4444', '#14b8a6']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{payload[0].payload.name}</p>
        <p className="text-sm text-indigo-600 dark:text-indigo-400">
          {payload[0].payload.completed}/{payload[0].payload.total} tasks
        </p>
      </div>
    )
  }
  return null
}

const TaskCompletionChart = () => {
  const { theme } = useTheme()
  const { projects } = useProjects()
  const isDark = theme === 'dark'

  const data = projects
    .filter((p) => p.tasks.total > 0)
    .map((p, i) => ({
      name: p.name,
      value: Math.round((p.tasks.completed / p.tasks.total) * 100),
      completed: p.tasks.completed,
      total: p.tasks.total,
      fill: COLORS[i % COLORS.length],
    }))
    .sort((a, b) => a.value - b.value)

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Task Completion by Project</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background={{ fill: isDark ? '#1e293b' : '#f1f5f9' }}
              dataKey="value"
              cornerRadius={6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5 min-w-0">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {entry.name} ({entry.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskCompletionChart
