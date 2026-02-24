import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const GeneralSettings = () => {
  const { user, updateUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [prefs, setPrefs] = useState({
    language: user?.language || 'English',
    timezone: user?.timezone || 'PST (UTC-8)',
    dateFormat: user?.settings?.general?.dateFormat || 'MM/DD/YYYY',
    timeFormat: user?.settings?.general?.timeFormat || '12-hour',
    startOfWeek: user?.settings?.general?.startOfWeek || 'Monday',
    autoSave: user?.settings?.general?.autoSave ?? true,
    showCompletedTasks: user?.settings?.general?.showCompletedTasks ?? true,
    defaultTaskView: user?.settings?.general?.defaultTaskView || 'List',
    projectSortBy: user?.settings?.general?.projectSortBy || 'Last Modified',
  })

  const handleChange = (key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUser({
        language: prefs.language,
        timezone: prefs.timezone,
        settings: {
          ...user?.settings,
          general: {
            dateFormat: prefs.dateFormat,
            timeFormat: prefs.timeFormat,
            startOfWeek: prefs.startOfWeek,
            autoSave: prefs.autoSave,
            showCompletedTasks: prefs.showCompletedTasks,
            defaultTaskView: prefs.defaultTaskView,
            projectSortBy: prefs.projectSortBy,
          },
        },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save settings:', err)
    } finally {
      setSaving(false)
    }
  }

  const selectFields = [
    { key: 'language', label: 'Language', options: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Hindi'] },
    { key: 'timezone', label: 'Timezone', options: ['PST (UTC-8)', 'MST (UTC-7)', 'CST (UTC-6)', 'EST (UTC-5)', 'GMT (UTC+0)', 'CET (UTC+1)', 'IST (UTC+5:30)', 'JST (UTC+9)'] },
    { key: 'dateFormat', label: 'Date Format', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
    { key: 'timeFormat', label: 'Time Format', options: ['12-hour', '24-hour'] },
    { key: 'startOfWeek', label: 'Start of Week', options: ['Sunday', 'Monday', 'Saturday'] },
    { key: 'defaultTaskView', label: 'Default Task View', options: ['List', 'Board', 'Calendar'] },
    { key: 'projectSortBy', label: 'Sort Projects By', options: ['Last Modified', 'Name', 'Date Created', 'Priority'] },
  ]

  const toggleFields = [
    { key: 'autoSave', label: 'Auto Save', description: 'Automatically save changes as you work' },
    { key: 'showCompletedTasks', label: 'Show Completed Tasks', description: 'Display completed tasks in task lists' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">General</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure your workspace preferences</p>
      </div>
      <div className="p-5 space-y-5">
        {/* Selects */}
        <div className="grid sm:grid-cols-2 gap-4">
          {selectFields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">{field.label}</label>
              <select
                value={prefs[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Toggles */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/40 space-y-4">
          {toggleFields.map((field) => (
            <div key={field.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{field.description}</p>
              </div>
              <button
                onClick={() => handleChange(field.key, !prefs[field.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                  ${prefs[field.key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${prefs[field.key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/40 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Settings saved!</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default GeneralSettings
