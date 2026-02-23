import React, { useRef, useEffect } from 'react'

const ChatWindow = ({ messages, onDeleteMessage, conversationId }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const formatDateSep = (iso) => {
    const d = new Date(iso)
    const now = new Date()
    const diff = now - d
    if (diff < 86400000 && d.getDate() === now.getDate()) return 'Today'
    if (diff < 172800000) return 'Yesterday'
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  // Group messages by date
  const grouped = []
  let lastDate = ''
  messages.forEach((msg) => {
    const date = new Date(msg.time).toDateString()
    if (date !== lastDate) {
      grouped.push({ type: 'date', date: formatDateSep(msg.time), key: 'date_' + date })
      lastDate = date
    }
    grouped.push({ type: 'message', data: msg, key: msg.id })
  })

  const statusIcon = (status) => {
    if (status === 'sent') return (
      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
    if (status === 'delivered') return (
      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M5 8l4 4L19 2" />
      </svg>
    )
    if (status === 'read') return (
      <svg className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M5 8l4 4L19 2" />
      </svg>
    )
    return null
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {grouped.map((item) => {
        if (item.type === 'date') {
          return (
            <div key={item.key} className="flex items-center justify-center py-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.date}
              </span>
            </div>
          )
        }

        const msg = item.data
        const isMe = msg.senderId === 'me'

        return (
          <div key={item.key} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
            <div className={`max-w-[70%] ${isMe ? 'order-1' : ''}`}>
              {/* Sender name for group chats */}
              {!isMe && msg.senderName && (
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-0.5 ml-1">{msg.senderName}</p>
              )}

              <div className="flex items-end gap-1.5">
                {isMe && (
                  <button
                    onClick={() => onDeleteMessage(conversationId, msg.id)}
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center transition cursor-pointer mb-1"
                    title="Delete message"
                  >
                    <svg className="h-3.5 w-3.5 text-slate-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}

                <div className={`px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-white dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-600/30 rounded-bl-md'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>

                {!isMe && (
                  <button
                    onClick={() => onDeleteMessage(conversationId, msg.id)}
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center transition cursor-pointer mb-1"
                    title="Delete message"
                  >
                    <svg className="h-3.5 w-3.5 text-slate-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Time + Status */}
              <div className={`flex items-center gap-1 mt-0.5 ${isMe ? 'justify-end mr-1' : 'ml-1'}`}>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{formatTime(msg.time)}</span>
                {isMe && statusIcon(msg.status)}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow
