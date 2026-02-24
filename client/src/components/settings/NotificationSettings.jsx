import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const NotificationSettings = () => {
  const { user, updateUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [prefs, setPrefs] = useState({
    emailNotifs: user?.notifications?.email ?? true,
    pushNotifs: user?.notifications?.push ?? true,
    desktopNotifs: user?.notifications?.desktop ?? false,
    soundEnabled: user?.notifications?.sound ?? true,
    weeklyReport: user?.notifications?.weeklyReport ?? false,
    monthlyReport: user?.notifications?.monthlyReport ?? true,
    reminderTime: user?.notifications?.reminderTime || '30 minutes before',
  })

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
    setSaved(false)
  }

  const handleChange = (key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUser({
        notifications: {
          email: prefs.emailNotifs,
          push: prefs.pushNotifs,
          desktop: prefs.desktopNotifs,
          sound: prefs.soundEnabled,
          weeklyReport: prefs.weeklyReport,
          monthlyReport: prefs.monthlyReport,
          reminderTime: prefs.reminderTime,
        },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save notification settings:', err)
    } finally {
      setSaving(false)
    }
  }

  const channels = [
    { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive updates via email', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { key: 'pushNotifs', label: 'Push Notifications', desc: 'Receive push alerts on your devices', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )},
    { key: 'desktopNotifs', label: 'Desktop Notifications', desc: 'Show desktop popups for alerts', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { key: 'soundEnabled', label: 'Sound', desc: 'Play a sound for new notifications', icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    )},
  ]

  const reports = [
    { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of your weekly activity' },
    { key: 'monthlyReport', label: 'Monthly Report', desc: 'Monthly performance overview' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Delivery & Reports</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure how you receive notifications and scheduled reports</p>
      </div>

      {/* Channels */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700/40">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Channels</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {channels.map((ch) => (
            <div key={ch.key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="text-slate-400 dark:text-slate-500">{ch.icon}</div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{ch.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{ch.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(ch.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none
                  ${prefs[ch.key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${prefs[ch.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Timing */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700/40">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Reminder Timing</p>
        <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">How early should you be reminded before deadlines?</label>
        <select
          value={prefs.reminderTime}
          onChange={(e) => handleChange('reminderTime', e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
        >
          <option value="15 minutes before">15 minutes before</option>
          <option value="30 minutes before">30 minutes before</option>
          <option value="1 hour before">1 hour before</option>
          <option value="1 day before">1 day before</option>
        </select>
      </div>

      {/* Reports */}
      <div className="p-5">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Reports & Digest</p>
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{r.label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{r.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(r.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none
                  ${prefs[r.key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${prefs[r.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/40 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Notifications saved!</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
