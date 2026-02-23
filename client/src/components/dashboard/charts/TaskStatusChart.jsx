import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useTasks } from '../../../context/TaskContext'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const STATUS_COLORS = {
  'Todo': '#64748b',
  'In Progress': '#0ea5e9',
  'In Review': '#f59e0b',
  'Completed': '#10b981',
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{payload[0].name}</p>
        <p className="text-sm" style={{ color: payload[0].payload.fill }}>
          {payload[0].value} tasks
        </p>
      </div>
    )
  }
  return null
}

const TaskStatusChart = () => {
  const { theme } = useTheme()
  const { tasks } = useTasks()
  const isDark = theme === 'dark'

  const statusCounts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }))

  const total = tasks.length

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Task Status</h3>
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#6366f1'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{total}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[entry.name] || '#6366f1' }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskStatusChart
