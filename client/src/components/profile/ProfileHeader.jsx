import React, { useState } from 'react'

const statusDot = {
  'Online': 'bg-emerald-500',
  'Away': 'bg-amber-400',
  'Offline': 'bg-slate-400 dark:bg-slate-500',
}

const ProfileHeader = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ name: profile.name, role: profile.role, bio: profile.bio })

  const handleSave = () => {
    onUpdate({
      ...form,
      avatar: form.name.split(' ').map((n) => n[0]).join('').toUpperCase(),
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden mb-6">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        {/* Edit button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      {/* Profile info */}
      <div className="px-6 pb-6 -mt-12 relative">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-slate-800 shadow-lg">
              {profile.avatar}
            </div>
            <span className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-3 border-white dark:border-slate-800 ${statusDot[profile.status]}`} />
          </div>

          {/* Name & Role */}
          <div className="flex-1 pb-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full max-w-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full max-w-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer">Save</button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">{profile.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{profile.role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">{profile.bio}</p>
              </>
            )}
          </div>

          {/* Quick details */}
          {!isEditing && (
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-1">
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {profile.joinedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
