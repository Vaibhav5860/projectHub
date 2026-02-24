import React from 'react'

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const statusColor = {
  'Todo': 'bg-slate-200 dark:bg-slate-600/30 text-slate-600 dark:text-slate-400',
  'In Progress': 'bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400',
  'In Review': 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Completed': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
}

const priorityColor = {
  'Low': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Medium': 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'High': 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400',
}

const priorityIcon = {
  'Low': (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  'Medium': (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
    </svg>
  ),
  'High': (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
}

const TaskRow = ({ task, onSelect, onToggleComplete }) => {
  const subtaskDone = task.subtasks.filter((s) => s.completed).length
  const subtaskTotal = task.subtasks.length

  return (
    <div
      onClick={() => onSelect(task)}
      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition cursor-pointer group"
    >
      {/* Title + subtask progress */}
      <div className="col-span-5 min-w-0">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleComplete(task.id, task.status)
            }}
            className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition cursor-pointer
              ${task.status === 'Completed'
                ? 'bg-indigo-500 border-indigo-500 text-white'
                : 'border-slate-300 dark:border-slate-600 group-hover:border-indigo-400'
              }`}
          >
            {task.status === 'Completed' && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div className="min-w-0">
            <p className={`text-sm font-medium truncate ${task.status === 'Completed' ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              {task.project && (
                <span className="text-xs text-slate-400 dark:text-slate-500">{task.project}</span>
              )}
              {subtaskTotal > 0 && (
                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  {subtaskDone}/{subtaskTotal}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="col-span-2 flex items-center">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Priority */}
      <div className="col-span-1 flex items-center">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${priorityColor[task.priority]}`}>
          {priorityIcon[task.priority]}
          <span className="hidden lg:inline">{task.priority}</span>
        </span>
      </div>

      {/* Assignee */}
      <div className="col-span-2 flex items-center">
        {task.assignee ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
              {task.assignee.split(' ').map((n) => n[0]).join('')}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{task.assignee}</span>
          </div>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
      </div>

      {/* Due Date */}
      <div className="col-span-2 flex items-center">
        <span className={`text-sm ${
          task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed'
            ? 'text-red-500 dark:text-red-400 font-medium'
            : 'text-slate-600 dark:text-slate-400'
        }`}>
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  )
}

export default TaskRow
