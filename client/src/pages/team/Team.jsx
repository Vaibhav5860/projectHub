import React, { useState, useMemo } from 'react'
import { useTeam } from '../../context/TeamContext'
import { useAuth } from '../../context/AuthContext'
import { useProjects } from '../../context/ProjectContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import TeamStatsBar from '../../components/team/TeamStatsBar'
import TeamFilters from '../../components/team/TeamFilters'
import MemberCard from '../../components/team/MemberCard'
import AddMemberModal from '../../components/team/AddMemberModal'
import MemberDetail from '../../components/team/MemberDetail'

// ─── Developer Teammates View ────────────────────────────────────────────────
const TeammateCard = ({ member, sharedProjects, onChat }) => {
  const initials = member.avatar || member.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??'
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{member.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{member.role || member.department}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{member.email}</p>
        </div>
        <span className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'Away' ? 'bg-amber-400' : 'bg-slate-400'}`} />
      </div>
      {/* Shared projects */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {sharedProjects.map(p => (
          <span key={p.id} className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${p.color || 'from-blue-500 to-cyan-400'} text-white`}>
            {p.name}
          </span>
        ))}
      </div>
    </div>
  )
}

const ProjectTeamGroup = ({ project, teammates, currentUserId, onOpenChat }) => {
  const otherMembers = teammates.filter(m => m._id !== currentUserId && m.id !== currentUserId)
  if (otherMembers.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${project.color || 'from-blue-500 to-cyan-400'}`} />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{project.name}</h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">({otherMembers.length} teammate{otherMembers.length !== 1 ? 's' : ''})</span>
        </div>
        <button
          onClick={() => onOpenChat(project)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition cursor-pointer"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Project Chat
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {otherMembers.map(member => (
          <TeammateCard key={member._id || member.id} member={member} sharedProjects={[project]} />
        ))}
      </div>
    </div>
  )
}

// ─── Project Chat Modal ──────────────────────────────────────────────────────
const ProjectChatModal = ({ project, onClose }) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [members, setMembers] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [conversationId, setConversationId] = useState(null)

  React.useEffect(() => {
    const fetchChat = async () => {
      try {
        const { messagesAPI } = await import('../../services/api')
        const res = await messagesAPI.getProjectChat(project.id || project._id)
        const conv = res.data.data
        setConversationId(conv._id)
        setMembers(conv.members || [])
        setMessages((conv.messages || []).map(m => ({
          id: m._id,
          senderId: m.sender?._id === user?._id ? 'me' : m.sender?._id,
          senderName: m.sender?.name || 'Unknown',
          senderAvatar: m.sender?.avatar || m.sender?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          text: m.text,
          time: m.createdAt,
        })))
      } catch (err) {
        console.error('Failed to load project chat:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchChat()
  }, [project, user])

  const handleSend = async () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    // Optimistic add
    const tempMsg = { id: 'temp_' + Date.now(), senderId: 'me', senderName: user?.name, senderAvatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2), text, time: new Date().toISOString() }
    setMessages(prev => [...prev, tempMsg])
    try {
      const { messagesAPI } = await import('../../services/api')
      await messagesAPI.sendProjectMessage(project.id || project._id, { text })
    } catch (err) {
      console.error('Failed to send:', err)
    }
  }

  const formatTime = (t) => {
    if (!t) return ''
    const d = new Date(t)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (t) => {
    if (!t) return ''
    const d = new Date(t)
    const now = new Date()
    if (d.toDateString() === now.toDateString()) return 'Today'
    const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  // Group messages by date
  const grouped = messages.reduce((acc, msg) => {
    const day = formatDate(msg.time)
    if (!acc.length || acc[acc.length - 1].day !== day) acc.push({ day, msgs: [] })
    acc[acc.length - 1].msgs.push(msg)
    return acc
  }, [])

  const chatEndRef = React.useRef(null)
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl h-[80vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`px-5 py-4 bg-gradient-to-r ${project.color || 'from-blue-500 to-cyan-400'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">{project.name}</h3>
              <p className="text-white/70 text-xs">{members.length} members</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Member avatars */}
            <div className="flex -space-x-2 mr-2">
              {members.slice(0, 5).map(m => (
                <div key={m._id} className="h-7 w-7 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-[10px] font-bold" title={m.name}>
                  {m.avatar || m.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
              ))}
              {members.length > 5 && <div className="h-7 w-7 rounded-full bg-white/30 border-2 border-white/30 flex items-center justify-center text-white text-[10px] font-bold">+{members.length - 5}</div>}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition cursor-pointer">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">No messages yet</p>
              <p className="text-xs text-slate-400 mt-1">Start a conversation about this project</p>
            </div>
          ) : (
            grouped.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/50" />
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">{group.day}</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/50" />
                </div>
                {group.msgs.map(msg => (
                  <div key={msg.id} className={`flex gap-2.5 mb-3 ${msg.senderId === 'me' ? 'flex-row-reverse' : ''}`}>
                    <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold ${msg.senderId === 'me' ? 'bg-indigo-500' : 'bg-slate-400 dark:bg-slate-600'}`}>
                      {msg.senderAvatar || '??'}
                    </div>
                    <div className={`max-w-[70%] ${msg.senderId === 'me' ? 'text-right' : ''}`}>
                      <p className={`text-[11px] font-medium mb-0.5 ${msg.senderId === 'me' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {msg.senderId === 'me' ? 'You' : msg.senderName}
                      </p>
                      <div className={`inline-block px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${msg.senderId === 'me' ? 'bg-indigo-600 text-white rounded-tr-md' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-900 dark:text-white rounded-tl-md'}`}>
                        {msg.text}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{formatTime(msg.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition cursor-pointer"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Team Component ─────────────────────────────────────────────────────
const Team = () => {
  const { members, addMember, updateMember, deleteMember } = useTeam()
  const { user } = useAuth()
  const { projects } = useProjects()
  const userRole = user?.role
  const isDeveloper = userRole === 'developer'
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [chatProject, setChatProject] = useState(null)
  const [devView, setDevView] = useState('byProject') // 'byProject' | 'all'

  const departments = useMemo(() => [...new Set(members.map((m) => m.department))], [members])

  // For developers: get projects they're on and the team members on those projects
  const myProjects = useMemo(() => {
    if (!isDeveloper) return []
    return projects.filter(p => {
      const uid = user?._id || user?.id
      return p.leadId === uid ||
        (p.teamIds || []).includes(uid) ||
        (p.team || []).some(t => t === user?.name) ||
        p.createdBy === uid
    })
  }, [projects, user, isDeveloper])

  // Build a map of member ids to member objects
  const memberMap = useMemo(() => {
    const map = {}
    members.forEach(m => { map[m._id || m.id] = m })
    return map
  }, [members])

  // For developer all-teammates view: unique teammates across all my projects
  const allTeammates = useMemo(() => {
    if (!isDeveloper) return []
    const uid = user?._id || user?.id
    const seen = new Set()
    const result = []
    myProjects.forEach(p => {
      // Add lead
      if (p.leadId && p.leadId !== uid && !seen.has(p.leadId)) {
        seen.add(p.leadId)
        const m = memberMap[p.leadId]
        if (m) result.push({ ...m, sharedProjects: [p] })
      }
      // Add team members
      ;(p.teamIds || []).forEach(tid => {
        if (tid !== uid && !seen.has(tid)) {
          seen.add(tid)
          const m = memberMap[tid]
          if (m) result.push({ ...m, sharedProjects: [p] })
        } else if (tid !== uid && seen.has(tid)) {
          // Add this project to the shared list
          const existing = result.find(r => (r._id || r.id) === tid)
          if (existing) existing.sharedProjects.push(p)
        }
      })
    })
    return result
  }, [myProjects, memberMap, user, isDeveloper])

  // Filter for developer views
  const filteredTeammates = useMemo(() => {
    if (!search.trim()) return allTeammates
    const q = search.toLowerCase()
    return allTeammates.filter(m =>
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.role?.toLowerCase().includes(q) ||
      m.sharedProjects?.some(p => p.name?.toLowerCase().includes(q))
    )
  }, [allTeammates, search])

  // Admin/manager filter
  const filtered = useMemo(() => {
    if (isDeveloper) return []
    return members.filter((m) => {
      const q = search.toLowerCase()
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      const matchesDept = filterDepartment === 'All' || m.department === filterDepartment
      const matchesStatus = filterStatus === 'All' || m.status === filterStatus
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [members, search, filterDepartment, filterStatus, isDeveloper])

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
          {isDeveloper ? (
            /* ─── Developer View ────────────────────────────────────── */
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Teammates</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    People you work with across your projects
                  </p>
                </div>
                {/* View toggle */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setDevView('byProject')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${devView === 'byProject' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                  >
                    By Project
                  </button>
                  <button
                    onClick={() => setDevView('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${devView === 'all' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
                  >
                    All Teammates
                  </button>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">My Projects</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{myProjects.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Teammates</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{allTeammates.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Online Now</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{allTeammates.filter(m => m.status === 'Online').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Project Chats</p>
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{myProjects.length}</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search teammates or projects..."
                  className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {devView === 'byProject' ? (
                /* By Project view */
                myProjects.length > 0 ? (
                  myProjects.map(project => {
                    // Get team members for this project from members list
                    const projectTeam = [
                      ...(project.leadId && memberMap[project.leadId] ? [memberMap[project.leadId]] : []),
                      ...(project.teamIds || []).filter(tid => tid !== project.leadId).map(tid => memberMap[tid]).filter(Boolean),
                    ]
                    // Dedup
                    const seen = new Set()
                    const uniqueTeam = projectTeam.filter(m => {
                      const id = m._id || m.id
                      if (seen.has(id)) return false
                      seen.add(id)
                      return true
                    })

                    return (
                      <ProjectTeamGroup
                        key={project.id}
                        project={project}
                        teammates={uniqueTeam}
                        currentUserId={user?._id || user?.id}
                        onOpenChat={(p) => setChatProject(p)}
                      />
                    )
                  })
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-4">
                      <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No projects yet</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">You&apos;ll see teammates once you&apos;re assigned to projects</p>
                  </div>
                )
              ) : (
                /* All Teammates view */
                filteredTeammates.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTeammates.map(member => (
                      <TeammateCard
                        key={member._id || member.id}
                        member={member}
                        sharedProjects={member.sharedProjects || []}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-4">
                      <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No teammates found</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search</p>
                  </div>
                )
              )}
            </>
          ) : (
            /* ─── Admin / Manager View (existing) ───────────────────── */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your team members and their roles</p>
                </div>
                {(userRole === 'admin' || userRole === 'manager') && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-indigo-500/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Member
                  </button>
                )}
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
            </>
          )}
        </main>
      </div>

      {/* Admin/Manager Modals */}
      {showAddModal && (userRole === 'admin' || userRole === 'manager') && <AddMemberModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
      {selectedMember && (
        <MemberDetail
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onDelete={userRole === 'admin' ? deleteMember : undefined}
        />
      )}

      {/* Project Chat Modal (developer) */}
      {chatProject && <ProjectChatModal project={chatProject} onClose={() => setChatProject(null)} />}
    </div>
  )
}

export default Team
