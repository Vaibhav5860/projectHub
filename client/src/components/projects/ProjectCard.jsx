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

const ProjectCard = ({ project, onSelect }) => {
  const budgetPercent = project.budget > 0 ? Math.round((project.spent / project.budget) * 100) : 0

  return (
    <div
      onClick={() => onSelect(project)}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Color bar */}
      <div className={`h-1.5 rounded-t-xl bg-gradient-to-r ${project.color}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">{project.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{project.description}</p>
          </div>
          <span className={`inline-flex items-center gap-1 ml-3 shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${statusColor[project.status]}`}>
            {project.status}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400">Progress</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-500`} style={{ width: `${project.progress}%` }} />
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${priorityDot[project.priority]}`} />
            <span className="text-xs text-slate-500 dark:text-slate-400">{project.priority}</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {project.tasks.completed}/{project.tasks.total} tasks
          </span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/40">
          {/* Team avatars */}
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, i) => (
              <div key={member} className={`h-7 w-7 rounded-full bg-gradient-to-br ${project.color} flex items-center justify-center text-white text-[10px] font-semibold border-2 border-white dark:border-slate-800`}>
                {member.split(' ').map((n) => n[0]).join('')}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-medium text-slate-500 dark:text-slate-400 border-2 border-white dark:border-slate-800">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
