import React, { useState } from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import TaskStatsBar from '../../components/tasks/TaskStatsBar'
import TaskFilters from '../../components/tasks/TaskFilters'
import TaskList from '../../components/tasks/TaskList'
import AddTaskModal from '../../components/tasks/AddTaskModal'
import TaskDetail from '../../components/tasks/TaskDetail'
import { useTasks } from '../../context/TaskContext'
import { useAuth } from '../../context/AuthContext'

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, addSubtask, toggleSubtask, deleteSubtask } = useTasks()
  const { user } = useAuth()
  const userRole = user?.role
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  // Filtering
  let filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || t.status === filterStatus
    const matchPriority = filterPriority === 'All' || t.priority === filterPriority
    return matchSearch && matchStatus && matchPriority
  })

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'newest') return b.id.localeCompare(a.id)
    if (sortBy === 'oldest') return a.id.localeCompare(b.id)
    if (sortBy === 'priority') {
      const order = { High: 0, Medium: 1, Low: 2 }
      return order[a.priority] - order[b.priority]
    }
    if (sortBy === 'dueDate') return (a.dueDate || 'z').localeCompare(b.dueDate || 'z')
    return 0
  })

  const handleToggleComplete = (id, currentStatus) => {
    updateTask(id, { status: currentStatus === 'Completed' ? 'Todo' : 'Completed' })
  }

  // Sync selected task with latest data
  const activeTask = selectedTask ? tasks.find((t) => t.id === selectedTask.id) : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} activePage="Tasks" />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage and track all your tasks</p>
            </div>
            {(userRole === 'admin' || userRole === 'manager') && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-lg transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-sm"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            )}
          </div>

          <TaskStatsBar tasks={tasks} />

          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterPriority={filterPriority}
            onFilterPriorityChange={setFilterPriority}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <TaskList
            tasks={filtered}
            totalCount={tasks.length}
            onSelectTask={setSelectedTask}
            onToggleComplete={handleToggleComplete}
            onAddNew={() => setShowAddModal(true)}
          />
        </main>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (userRole === 'admin' || userRole === 'manager') && (
        <AddTaskModal onClose={() => setShowAddModal(false)} onAdd={addTask} />
      )}

      {/* Task Detail Panel */}
      {activeTask && (
        <TaskDetail
          task={activeTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTask}
          onDelete={(userRole === 'admin' || userRole === 'manager') ? deleteTask : undefined}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onDeleteSubtask={deleteSubtask}
        />
      )}
    </div>
  )
}

export default Tasks
