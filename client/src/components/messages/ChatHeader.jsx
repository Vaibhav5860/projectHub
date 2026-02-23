import React from 'react'

const statusColor = { online: 'bg-green-500', away: 'bg-amber-400', offline: 'bg-slate-300 dark:bg-slate-600' }
const statusText = { online: 'Online', away: 'Away', offline: 'Offline' }

const ChatHeader = ({ conversation, onToggleInfo, showInfo, onBack }) => {
  return (
    <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Back button for mobile */}
        <button onClick={onBack} className="lg:hidden h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition cursor-pointer">
          <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
            conversation.type === 'group'
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300'
              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
          }`}>
            {conversation.avatar}
          </div>
          {conversation.type === 'direct' && conversation.status && (
            <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-slate-800 ${statusColor[conversation.status]}`} />
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{conversation.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {conversation.type === 'group'
              ? `${(conversation.members?.length || 0) + 1} members`
              : statusText[conversation.status] || 'Offline'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition cursor-pointer" title="Voice call">
          <svg className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition cursor-pointer" title="Video call">
          <svg className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={onToggleInfo}
          className={`h-8 w-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
            showInfo ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}
          title="Conversation info"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
