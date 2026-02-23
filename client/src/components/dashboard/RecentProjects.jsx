import React from 'react'

const recentProjects = [
  { name: 'Website Redesign', status: 'In Progress', progress: 65, members: 4 },
  { name: 'Mobile App v2', status: 'In Review', progress: 90, members: 3 },
  { name: 'API Integration', status: 'In Progress', progress: 40, members: 2 },
  { name: 'Dashboard Analytics', status: 'Planning', progress: 15, members: 5 },
]

const statusColor = {
  'In Progress': 'bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400',
  'In Review': 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Planning': 'bg-slate-200 dark:bg-slate-600/30 text-slate-600 dark:text-slate-400',
  'Completed': 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
}

const RecentProjects = () => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="font-semibold text-slate-900 dark:text-white">Recent Projects</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition cursor-pointer">View all</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {recentProjects.map((project) => (
          <div key={project.name} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{project.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{project.members} members</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[project.status]}`}>
              {project.status}
            </span>
            <div className="w-24 hidden sm:block">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{project.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentProjects
