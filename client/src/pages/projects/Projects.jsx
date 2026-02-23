import React, { useState, useMemo } from 'react'
import { useProjects } from '../../context/ProjectContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import ProjectStatsBar from '../../components/projects/ProjectStatsBar'
import ProjectFilters from '../../components/projects/ProjectFilters'
import ProjectCard from '../../components/projects/ProjectCard'
import ProjectListItem from '../../components/projects/ProjectListItem'
import AddProjectModal from '../../components/projects/AddProjectModal'
import ProjectDetail from '../../components/projects/ProjectDetail'

const Projects = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      const matchesStatus = filterStatus === 'All' || p.status === filterStatus
      const matchesCategory = filterCategory === 'All' || p.category === filterCategory
      const matchesPriority = filterPriority === 'All' || p.priority === filterPriority
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority
    })
  }, [projects, search, filterStatus, filterCategory, filterPriority])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} activePage="Projects" />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage and track all your projects</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-indigo-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>

          <ProjectStatsBar projects={projects} />

          <ProjectFilters
            search={search}
            onSearchChange={setSearch}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterCategory={filterCategory}
            onFilterCategoryChange={setFilterCategory}
            filterPriority={filterPriority}
            onFilterPriorityChange={setFilterPriority}
            categories={categories}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Projects list */}
          {filtered.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((project) => (
                  <ProjectListItem key={project.id} project={project} onSelect={setSelectedProject} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-4">
                <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No projects found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">Showing {filtered.length} of {projects.length} projects</p>
        </main>
      </div>

      {/* Modals */}
      {showAddModal && <AddProjectModal onClose={() => setShowAddModal(false)} onAdd={addProject} />}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={(id, data) => { updateProject(id, data); setSelectedProject({ ...selectedProject, ...data }) }}
          onDelete={deleteProject}
        />
      )}
    </div>
  )
}

export default Projects
