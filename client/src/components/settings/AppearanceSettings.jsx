import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, updateUser } = useAuth()
  const [fontSize, setFontSize] = useState(user?.settings?.appearance?.fontSize || 14)
  const [density, setDensity] = useState(user?.settings?.appearance?.density || 'Default')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const themes = [
    { id: 'light', label: 'Light', icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ), description: 'Clean and bright interface for well-lit environments' },
    { id: 'dark', label: 'Dark', icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ), description: 'Easier on the eyes in low-light environments' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customize how ProjectHub looks on your device</p>
      </div>
      <div className="p-5">
        {/* Theme selection */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Theme</label>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { if (theme !== t.id) toggleTheme() }}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition cursor-pointer
                  ${theme === t.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
              >
                {theme === t.id && (
                  <div className="absolute top-2 right-2">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className={`p-3 rounded-xl ${theme === t.id ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {t.icon}
                </div>
                <div className="text-center">
                  <p className={`text-sm font-semibold ${theme === t.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{t.label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Font Size — {fontSize}px</label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">A</span>
            <input
              type="range"
              min="12"
              max="18"
              value={fontSize}
              onChange={(e) => { setFontSize(Number(e.target.value)); setSaved(false); }}
              className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-lg text-slate-400 font-bold">A</span>
          </div>
        </div>

        {/* Density */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Content Density</label>
          <div className="flex gap-3">
            {['Compact', 'Default', 'Comfortable'].map((d) => (
              <button
                key={d}
                onClick={() => { setDensity(d); setSaved(false); }}
                className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition cursor-pointer
                  ${density === d
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/40 flex items-center gap-3">
          <button
            onClick={async () => {
              setSaving(true)
              try {
                document.documentElement.style.fontSize = `${fontSize}px`
                await updateUser({
                  settings: {
                    ...user?.settings,
                    appearance: { fontSize, density },
                  },
                })
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
              } catch (err) {
                console.error('Failed to save appearance settings:', err)
              } finally {
                setSaving(false)
              }
            }}
            disabled={saving}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Appearance saved!</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppearanceSettings
