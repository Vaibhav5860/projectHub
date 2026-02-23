import React from 'react'

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

const ProjectListItem = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group px-5 py-4"
    >
      <div className="flex items-center gap-5">
        {/* Color indicator */}
        <div className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${project.color} shrink-0`} />

        {/* Name & Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">{project.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{project.description}</p>
        </div>

        {/* Status */}
        <span className={`hidden sm:inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 ${statusColor[project.status]}`}>
          {project.status}
        </span>

        {/* Priority */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <span className={`h-2 w-2 rounded-full ${priorityDot[project.priority]}`} />
          <span className="text-xs text-slate-500 dark:text-slate-400">{project.priority}</span>
        </div>

        {/* Progress */}
        <div className="hidden lg:flex items-center gap-2 w-32 shrink-0">
          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${project.color} rounded-full`} style={{ width: `${project.progress}%` }} />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-8 text-right">{project.progress}%</span>
        </div>

        {/* Team */}
        <div className="hidden xl:flex -space-x-1.5 shrink-0">
          {project.team.slice(0, 3).map((member) => (
            <div key={member} className={`h-6 w-6 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-[9px] font-semibold border-2 border-white dark:border-slate-800`}>
              {member.split(' ').map((n) => n[0]).join('')}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium text-slate-500 dark:text-slate-400 border-2 border-white dark:border-slate-800">
              +{project.team.length - 3}
            </div>
          )}
        </div>

        {/* Due Date */}
        <span className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 shrink-0 w-16 text-right">
          {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>

        {/* Arrow */}
        <svg className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

export default ProjectListItem
