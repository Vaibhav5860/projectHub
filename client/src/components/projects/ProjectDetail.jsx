import React, { useState } from 'react'

const statusColor = {
  'Todo': 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400',
  'In Progress': 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400',
  'On Hold': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Completed': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

const priorityDot = {
  'High': 'bg-red-500',
  'Medium': 'bg-amber-400',
  'Low': 'bg-slate-400',
}

const ProjectDetail = ({ project, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    priority: project.priority,
    category: project.category,
    dueDate: project.dueDate,
    budget: project.budget,
    lead: project.lead,
  })

  const budgetPercent = project.budget > 0 ? Math.round((project.spent / project.budget) * 100) : 0

  const handleSave = () => {
    onUpdate(project.id, editForm)
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-y-auto animate-slide-in">
        {/* Banner */}
        <div className={`h-28 bg-gradient-to-r ${project.color} relative`}>
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <button onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer" title="Edit project">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button onClick={() => { if (confirm('Delete this project?')) { onDelete(project.id); onClose() } }}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer" title="Delete project">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-4 left-6">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold">
              {project.name.charAt(0)}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 space-y-6">
          {/* Title & Status */}
          {isEditing ? (
            <div className="space-y-3">
              <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
              <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} rows={3}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer">
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
                <select value={editForm.priority} onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={editForm.dueDate} onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <input type="number" value={editForm.budget} onChange={(e) => setEditForm({ ...editForm, budget: Number(e.target.value) })} placeholder="Budget"
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSave} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h2>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[project.status]}`}>{project.status}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className={`h-2 w-2 rounded-full ${priorityDot[project.priority]}`} />
                  {project.priority} Priority
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">{project.category}</span>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{project.progress}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-500`} style={{ width: `${project.progress}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">{project.tasks.completed} of {project.tasks.total} tasks completed</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium mb-1">Project Lead</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{project.lead}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium mb-1">Start Date</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Budget</h3>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Spent</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${budgetPercent > 90 ? 'bg-red-500' : budgetPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(budgetPercent, 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-right">{budgetPercent}% used</p>
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Team ({project.team.length})</h3>
            <div className="space-y-2">
              {project.team.map((member) => (
                <div key={member} className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
                  <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-xs font-semibold`}>
                    {member.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{member}</span>
                  {member === project.lead && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Lead</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">{tag}</span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          {project.recentActivity.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {project.recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-medium">{item.by}</span>{' '}{item.action}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
