import React from 'react'

const statusColor = { online: 'bg-green-500', away: 'bg-amber-400', offline: 'bg-slate-300 dark:bg-slate-600' }

const ConversationList = ({ conversations, activeId, onSelect, search, onSearchChange, onNewChat }) => {
  const pinned = conversations.filter((c) => c.pinned)
  const unpinned = conversations.filter((c) => !c.pinned)

  const formatTime = (iso) => {
    const d = new Date(iso)
    const now = new Date()
    const diff = now - d
    if (diff < 86400000 && d.getDate() === now.getDate()) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }
    if (diff < 172800000) return 'Yesterday'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const renderItem = (conv) => (
    <button
      key={conv.id}
      onClick={() => onSelect(conv.id)}
      className={`w-full flex items-start gap-3 p-3 rounded-xl transition cursor-pointer text-left ${
        activeId === conv.id
          ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20'
          : 'hover:bg-slate-50 dark:hover:bg-slate-700/40 border border-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold ${
          conv.type === 'group'
            ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300'
            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
        }`}>
          {conv.avatar}
        </div>
        {conv.type === 'direct' && conv.status && (
          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 ${statusColor[conv.status]}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-sm truncate ${conv.unread > 0 ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
            {conv.name}
          </h4>
          {conv.lastMessage && (
            <span className={`text-[11px] shrink-0 ${conv.unread > 0 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
              {formatTime(conv.lastMessage.time)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={`text-xs truncate ${conv.unread > 0 ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
            {conv.lastMessage ? (
              <>
                {conv.type === 'group' && conv.lastMessage.senderId === 'me' && <span className="text-indigo-500 dark:text-indigo-400">You: </span>}
                {conv.type === 'group' && conv.lastMessage.senderId !== 'me' && conv.lastMessage.senderName && (
                  <span className="text-slate-600 dark:text-slate-400">{conv.lastMessage.senderName}: </span>
                )}
                {conv.lastMessage.text}
              </>
            ) : 'No messages yet'}
          </p>
          {conv.unread > 0 && (
            <span className="shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-indigo-600 text-[10px] font-bold text-white flex items-center justify-center">
              {conv.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Messages</h2>
          <button
            onClick={onNewChat}
            className="h-8 w-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition cursor-pointer"
            title="New message"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {pinned.length > 0 && (
          <>
            <div className="flex items-center gap-1.5 px-3 py-2">
              <svg className="h-3 w-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zm5-5a.75.75 0 01.75.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0115 10zM2.75 10a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5h-1.5z" />
              </svg>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Pinned</span>
            </div>
            {pinned.map(renderItem)}
          </>
        )}

        {unpinned.length > 0 && (
          <>
            {pinned.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-2 mt-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">All Messages</span>
              </div>
            )}
            {unpinned.map(renderItem)}
          </>
        )}

        {conversations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400 dark:text-slate-500">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationList
