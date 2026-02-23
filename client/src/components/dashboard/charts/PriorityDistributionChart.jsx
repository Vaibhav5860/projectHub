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

const PRIORITY_COLORS = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#10b981',
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

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null
}

const PriorityDistributionChart = () => {
  const { theme } = useTheme()
  const { tasks } = useTasks()

  const priorityCounts = tasks.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(priorityCounts).map(([name, value]) => ({
    name: `${name} Priority`,
    value,
  }))

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Priority Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={85}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              stroke="none"
            >
              {data.map((entry) => {
                const key = entry.name.replace(' Priority', '')
                return <Cell key={entry.name} fill={PRIORITY_COLORS[key] || '#6366f1'} />
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
        {data.map((entry) => {
          const key = entry.name.replace(' Priority', '')
          return (
            <div key={entry.name} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: PRIORITY_COLORS[key] || '#6366f1' }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">{entry.name} ({entry.value})</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PriorityDistributionChart
