import React, { useState } from 'react'

const defaultPrefs = {
  language: 'English',
  timezone: 'PST (UTC-8)',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12-hour',
  startOfWeek: 'Monday',
  autoSave: true,
  showCompletedTasks: true,
  defaultTaskView: 'List',
  projectSortBy: 'Last Modified',
}

const GeneralSettings = () => {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('projecthub_general_settings')
    return saved ? JSON.parse(saved) : defaultPrefs
  })

  const handleChange = (key, value) => {
    const updated = { ...prefs, [key]: value }
    setPrefs(updated)
    localStorage.setItem('projecthub_general_settings', JSON.stringify(updated))
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
      </div>
    </div>
  )
}

export default GeneralSettings
