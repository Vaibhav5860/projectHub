import React, { useState } from 'react'

const statusOptions = ['Todo', 'In Progress', 'In Review', 'Completed']
const priorityOptions = ['Low', 'Medium', 'High']

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

const TaskDetail = ({ task, onClose, onUpdate, onAddSubtask, onToggleSubtask, onDeleteSubtask, onDelete }) => {
  const [newSubtask, setNewSubtask] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    dueDate: task.dueDate,
    project: task.project,
  })

  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (!newSubtask.trim()) return
    onAddSubtask(task.id, newSubtask.trim())
    setNewSubtask('')
  }

  const handleSaveEdit = () => {
    onUpdate(task.id, editForm)
    setIsEditing(false)
  }

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length
  const totalSubtasks = task.subtasks.length
  const progress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[task.status]}`}>
                {task.status}
              </span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColor[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { if (confirm('Delete this task?')) { onDelete(task.id); onClose() } }}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition cursor-pointer"
                title="Delete task"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Title & Description */}
          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-lg font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={editForm.assignee}
                  onChange={(e) => setEditForm({ ...editForm, assignee: e.target.value })}
                  placeholder="Assignee"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSaveEdit} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{task.title}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition cursor-pointer shrink-0"
                  title="Edit task"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{task.description || 'No description provided.'}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Status</p>
              <select
                value={task.status}
                onChange={(e) => onUpdate(task.id, { status: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s} className="bg-white dark:bg-slate-800">{s}</option>
                ))}
              </select>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Priority</p>
              <select
                value={task.priority}
                onChange={(e) => onUpdate(task.id, { priority: e.target.value })}
                className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                {priorityOptions.map((p) => (
                  <option key={p} value={p} className="bg-white dark:bg-slate-800">{p}</option>
                ))}
              </select>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Assignee</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{task.assignee || '—'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Due Date</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{task.dueDate || '—'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Project</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{task.project || '—'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider font-medium">Created</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{task.createdAt}</p>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Subtasks
                {totalSubtasks > 0 && (
                  <span className="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500">
                    {completedSubtasks}/{totalSubtasks}
                  </span>
                )}
              </h3>
            </div>

            {/* Progress bar */}
            {totalSubtasks > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-9 text-right">{progress}%</span>
                </div>
              </div>
            )}

            {/* Subtask list */}
            <div className="space-y-1.5 mb-3">
              {task.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 group px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/20 transition">
                  <button
                    onClick={() => onToggleSubtask(task.id, sub.id)}
                    className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition cursor-pointer
                      ${sub.completed
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
                      }`}
                  >
                    {sub.completed && (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <span className={`flex-1 text-sm ${sub.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {sub.title}
                  </span>
                  <button
                    onClick={() => onDeleteSubtask(task.id, sub.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add subtask */}
            <form onSubmit={handleAddSubtask} className="flex items-center gap-2">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <input
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Add a subtask..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer shrink-0"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
