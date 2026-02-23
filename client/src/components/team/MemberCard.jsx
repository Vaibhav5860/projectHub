import React from 'react'

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

const MemberCard = ({ member, index, onSelect }) => {
  const gradient = gradients[index % gradients.length]
  const progress = member.tasks > 0 ? Math.round((member.completedTasks / member.tasks) * 100) : 0

  return (
    <div
      onClick={() => onSelect(member)}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Gradient banner */}
      <div className={`h-20 rounded-t-xl bg-gradient-to-r ${gradient} relative`}>
        <div className="absolute -bottom-8 left-5">
          <div className="relative">
            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg font-bold border-4 border-white dark:border-slate-800 shadow-sm`}>
              {member.avatar}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-800 ${statusDot[member.status]}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-11 px-5 pb-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">{member.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
          </div>
          <span className={`text-[11px] font-medium ${statusText[member.status]}`}>{member.status}</span>
        </div>

        {/* Department */}
        <div className="mt-3 mb-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            {member.department}
          </span>
        </div>

        {/* Task progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400">Tasks</span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{member.completedTasks}/{member.tasks}</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Projects */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {member.projects.slice(0, 2).map((project) => (
            <span key={project} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400">
              {project}
            </span>
          ))}
          {member.projects.length > 2 && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">+{member.projects.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberCard
