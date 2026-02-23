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
  Legend,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-sm" style={{ color: p.color }}>
            {p.name}: ${(p.value / 1000).toFixed(1)}k
          </p>
        ))}
      </div>
    )
  }
  return null
}

const BudgetOverviewChart = () => {
  const { theme } = useTheme()
  const { projects } = useProjects()
  const isDark = theme === 'dark'

  const data = projects
    .filter((p) => p.budget > 0)
    .map((p) => ({
      name: p.name.length > 12 ? p.name.slice(0, 12) + '…' : p.name,
      Budget: p.budget,
      Spent: p.spent,
    }))

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm p-5">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Budget Overview</h3>
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
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f1f5f9' }} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: isDark ? '#94a3b8' : '#64748b' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="Budget" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="Spent" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BudgetOverviewChart
