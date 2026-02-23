import React from 'react'

const statusColor = { online: 'bg-green-500', away: 'bg-amber-400', offline: 'bg-slate-300 dark:bg-slate-600' }
const statusText = { online: 'Online', away: 'Away', offline: 'Offline' }

const ContactInfo = ({ conversation, contacts, onClose, onPin, onDelete }) => {
  const isGroup = conversation.type === 'group'
  const contact = !isGroup ? contacts.find((c) => c.id === conversation.contactId) : null

  const memberContacts = isGroup
    ? (conversation.members || []).map((id) => contacts.find((c) => c.id === id)).filter(Boolean)
    : []

  const sharedFiles = [
    { name: 'design-specs-v2.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'mockup-dashboard.fig', size: '8.1 MB', type: 'fig' },
    { name: 'meeting-notes.docx', size: '145 KB', type: 'doc' },
  ]

  const fileIcon = (type) => {
    const colors = { pdf: 'text-red-500 bg-red-50 dark:bg-red-500/10', fig: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10', doc: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' }
    return colors[type] || 'text-slate-500 bg-slate-50 dark:bg-slate-500/10'
  }

  return (
    <div className="w-72 border-l border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {isGroup ? 'Group Info' : 'Contact Info'}
        </h3>
        <button onClick={onClose} className="h-7 w-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition cursor-pointer">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Profile */}
      <div className="p-5 text-center border-b border-slate-200 dark:border-slate-700/50">
        <div className={`h-16 w-16 rounded-full mx-auto flex items-center justify-center text-xl font-bold ${
          isGroup
            ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300'
            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
        }`}>
          {conversation.avatar}
        </div>
        <h4 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{conversation.name}</h4>
        {contact && (
          <>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{contact.role}</p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <span className={`h-2 w-2 rounded-full ${statusColor[contact.status]}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{statusText[contact.status]}</span>
            </div>
          </>
        )}
        {isGroup && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{(conversation.members?.length || 0) + 1} members</p>
        )}
      </div>

      {/* Contact details */}
      {contact && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 space-y-3">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Email</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{contact.email}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Role</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{contact.role}</p>
          </div>
        </div>
      )}

      {/* Group members */}
      {isGroup && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Members</p>
          <div className="space-y-2.5">
            {/* Yourself */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">You</div>
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white dark:border-slate-800 bg-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">You</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Online</p>
              </div>
            </div>
            {memberContacts.map((mc) => (
              <div key={mc.id} className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">{mc.avatar}</div>
                  <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white dark:border-slate-800 ${statusColor[mc.status]}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{mc.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">{mc.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shared Files */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Shared Files</p>
        <div className="space-y-2">
          {sharedFiles.map((file) => (
            <div key={file.name} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${fileIcon(file.type)}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{file.name}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        <button
          onClick={() => onPin(conversation.id)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/40 transition text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
        >
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {conversation.pinned ? 'Unpin conversation' : 'Pin conversation'}
        </button>
        <button
          onClick={() => onDelete(conversation.id)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition text-sm text-red-600 dark:text-red-400 cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete conversation
        </button>
      </div>
    </div>
  )
}

export default ContactInfo
