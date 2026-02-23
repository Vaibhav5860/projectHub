import React, { useState } from 'react'

const ProfileInfo = ({ profile, onUpdate, onAddSkill, onRemoveSkill }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [form, setForm] = useState({
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    department: profile.department,
    timezone: profile.timezone,
    language: profile.language,
    website: profile.website,
    github: profile.github,
    linkedin: profile.linkedin,
  })

  const handleSave = () => {
    onUpdate(form)
    setIsEditing(false)
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim())
      setNewSkill('')
    }
  }

  const infoFields = [
    { label: 'Email', key: 'email', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) },
    { label: 'Phone', key: 'phone', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ) },
    { label: 'Location', key: 'location', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) },
    { label: 'Department', key: 'department', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ) },
    { label: 'Timezone', key: 'timezone', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) },
    { label: 'Language', key: 'language', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ) },
  ]

  const socialFields = [
    { label: 'Website', key: 'website', prefix: '', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ) },
    { label: 'GitHub', key: 'github', prefix: 'github.com/', icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ) },
    { label: 'LinkedIn', key: 'linkedin', prefix: 'linkedin.com/in/', icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ) },
  ]

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      {/* Personal Info */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Personal Information</h2>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition cursor-pointer">Edit</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition cursor-pointer">Save</button>
              <button onClick={() => setIsEditing(false)} className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer">Cancel</button>
            </div>
          )}
        </div>
        <div className="p-5 space-y-4">
          {infoFields.map((field) => (
            <div key={field.key} className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400 dark:text-slate-500">{field.icon}</div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{field.label}</p>
                {isEditing ? (
                  <input
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{profile[field.key]}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/40">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium mb-3">Links & Social</p>
            <div className="space-y-3">
              {socialFields.map((field) => (
                <div key={field.key} className="flex items-center gap-3">
                  <div className="text-slate-400 dark:text-slate-500">{field.icon}</div>
                  {isEditing ? (
                    <input
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  ) : (
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{field.prefix}{profile[field.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm h-fit">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Skills & Expertise</h2>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.map((skill) => (
              <span key={skill} className="group inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                {skill}
                <button
                  onClick={() => onRemoveSkill(skill)}
                  className="hidden group-hover:inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition cursor-pointer"
                >
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
