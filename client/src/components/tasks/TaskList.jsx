import React from 'react'
import TaskRow from './TaskRow'

const TaskList = ({ tasks, totalCount, onSelectTask, onToggleComplete, onAddNew }) => {
  return (
    <>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-5 py-3 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
          <div className="col-span-5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Task</div>
          <div className="col-span-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</div>
          <div className="col-span-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Priority</div>
          <div className="col-span-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assignee</div>
          <div className="col-span-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Due Date</div>
        </div>

        {/* Task Rows */}
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm text-slate-500 dark:text-slate-400">No tasks found</p>
            <button
              onClick={onAddNew}
              className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium cursor-pointer"
            >
              Create your first task
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onSelect={onSelectTask}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 px-1">
        Showing {tasks.length} of {totalCount} tasks
      </p>
    </>
  )
}

export default TaskList
