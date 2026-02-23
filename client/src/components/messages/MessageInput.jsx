import React, { useState } from 'react'

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)

  const emojis = ['😀', '😂', '😍', '🔥', '👍', '👏', '🎉', '💪', '🤔', '😊', '❤️', '✅', '🚀', '💯', '⭐', '🙌']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
    setShowEmoji(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative">
      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-full left-4 mb-2 p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg grid grid-cols-8 gap-1.5 z-10">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => { setText((t) => t + emoji); setShowEmoji(false) }}
              className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center text-lg transition cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Left actions */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="h-9 w-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition cursor-pointer"
            title="Attach file"
          >
            <svg className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className={`h-9 w-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
              showEmoji ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500'
            }`}
            title="Emoji"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Input */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none resize-none transition max-h-32"
            style={{ minHeight: '42px' }}
          />
        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={!text.trim()}
          className={`h-10 w-10 rounded-xl flex items-center justify-center transition shrink-0 cursor-pointer ${
            text.trim()
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
              : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default MessageInput
