import React, { useState, useMemo } from 'react'
import { useTeam } from '../../context/TeamContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import TeamStatsBar from '../../components/team/TeamStatsBar'
import TeamFilters from '../../components/team/TeamFilters'
import MemberCard from '../../components/team/MemberCard'
import AddMemberModal from '../../components/team/AddMemberModal'
import MemberDetail from '../../components/team/MemberDetail'

const Team = () => {
  const { members, addMember, updateMember, deleteMember } = useTeam()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const departments = useMemo(() => [...new Set(members.map((m) => m.department))], [members])

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      const matchesDept = filterDepartment === 'All' || m.department === filterDepartment
      const matchesStatus = filterStatus === 'All' || m.status === filterStatus
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [members, search, filterDepartment, filterStatus])

  const handleAdd = (form) => {
    addMember({
      ...form,
      avatar: form.name.split(' ').map((n) => n[0]).join('').toUpperCase(),
      joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      projects: [],
      tasks: 0,
      completedTasks: 0,
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} activePage="Team" />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your team members and their roles</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-indigo-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Member
            </button>
          </div>

          <TeamStatsBar members={members} />
          <TeamFilters
            search={search}
            onSearchChange={setSearch}
            filterDepartment={filterDepartment}
            onFilterDepartmentChange={setFilterDepartment}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            departments={departments}
          />

          {/* Members Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} onSelect={setSelectedMember} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-4">
                <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No members found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">Showing {filtered.length} of {members.length} members</p>
        </main>
      </div>

      {/* Modals */}
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
      {selectedMember && (
        <MemberDetail
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onUpdate={(id, data) => { updateMember(id, data); setSelectedMember({ ...selectedMember, ...data }) }}
          onDelete={deleteMember}
        />
      )}
    </div>
  )
}

export default Team
