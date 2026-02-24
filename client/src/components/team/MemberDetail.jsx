import React, { useState, useMemo } from 'react'
import { useProjects } from '../../context/ProjectContext'
import { useTasks } from '../../context/TaskContext'

const statusDot = {
  'Online': 'bg-emerald-500',
  'Away': 'bg-amber-400',
  'Offline': 'bg-slate-400 dark:bg-slate-500',
}

const statusText = {
  'Online': 'text-emerald-600 dark:text-emerald-400',
  'Away': 'text-amber-600 dark:text-amber-400',
  'Offline': 'text-slate-500 dark:text-slate-400',
}

const gradients = [
  'from-indigo-500 to-purple-500',
  'from-sky-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-fuchsia-500',
]

const MemberDetail = ({ member, onClose, onUpdate, onDelete }) => {
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: member.name,
    email: member.email,
    role: member.role,
    department: member.department,
    phone: member.phone,
    location: member.location,
    status: member.status,
  })

  const gradient = gradients[parseInt(member.id) % gradients.length]

  // Compute member's projects from ProjectContext
  const memberProjects = useMemo(() => {
    return projects.filter(p => {
      const ids = p.teamIds || []
      return ids.includes(member.id) || ids.includes(member._id) || p.leadId === member.id || p.leadId === member._id
    }).map(p => p.name)
  }, [projects, member.id, member._id])

  // Compute member's task stats from TaskContext
  const memberTasks = useMemo(() => {
    return tasks.filter(t => t.assigneeId === member.id || t.assigneeId === member._id)
  }, [tasks, member.id, member._id])
  const totalTasks = memberTasks.length
  const completedTasks = memberTasks.filter(t => t.status === 'Completed').length
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleSave = () => {
    onUpdate(member.id, {
      ...editForm,
      avatar: editForm.name.split(' ').map((n) => n[0]).join('').toUpperCase(),
    })
    setIsEditing(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700/50 shadow-2xl overflow-y-auto animate-slide-in">
        {/* Banner */}
        <div className={`h-32 bg-gradient-to-r ${gradient} relative`}>
          <div className="absolute top-4 right-4 flex items-center gap-1">
            {onDelete && (
              <button
                onClick={() => { if (confirm('Remove this team member?')) { onDelete(member.id); onClose() } }}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer"
                title="Remove member"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-slate-800 shadow-lg`}>
                {member.avatar}
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-3 border-white dark:border-slate-800 ${statusDot[member.status]}`} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-6 pb-6 space-y-6">
          {/* Name & Role */}
          {isEditing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Role</label>
                  <input
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Email</label>
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Department</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Phone</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Location</label>
                  <input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                >
                  <option value="Online">Online</option>
                  <option value="Away">Away</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={handleSave} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{member.role}</p>
                </div>
                {onUpdate && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition cursor-pointer"
                    title="Edit member"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusText[member.status]}`}>
                  <span className={`h-2 w-2 rounded-full ${statusDot[member.status]}`} />
                  {member.status}
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  {member.department}
                </span>
              </div>
            </div>
          )}

          {/* Contact & Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider font-medium">Email</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{member.email}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider font-medium">Phone</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{member.phone || '—'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider font-medium">Location</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{member.location || '—'}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider font-medium">Joined</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{member.joinedDate}</p>
            </div>
          </div>

          {/* Task Progress */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Task Progress</h3>
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Completed</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{completedTasks}/{totalTasks}</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-right">{progress}% complete</p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Projects ({memberProjects.length})</h3>
            <div className="space-y-2">
              {memberProjects.length > 0 ? memberProjects.map((project) => (
                <div key={project} className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
                  <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                    <svg className="h-4 w-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{project}</span>
                </div>
              )) : (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-3 text-center">No projects assigned</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDetail
