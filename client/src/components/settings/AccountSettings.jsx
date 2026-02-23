import React, { useState } from 'react'

const AccountSettings = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert('Passwords do not match!')
      return
    }
    alert('Password updated successfully!')
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    setShowPasswordForm(false)
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Account</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage your account security and preferences</p>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
        {/* Password */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Last changed 30 days ago</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition cursor-pointer"
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  required
                  className="w-full max-w-sm px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  required
                  minLength={8}
                  className="w-full max-w-sm px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  required
                  minLength={8}
                  className="w-full max-w-sm px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition cursor-pointer"
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        {/* Two-Factor */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Add an extra layer of security to your account</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Not Enabled
            </span>
          </div>
          <button className="mt-3 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg transition cursor-pointer">
            Enable 2FA
          </button>
        </div>

        {/* Sessions */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Sessions</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Manage your logged-in devices</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { device: 'Chrome on Windows', location: 'San Francisco, CA', time: 'Current session', current: true },
              { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
              { device: 'Firefox on MacBook', location: 'New York, NY', time: '3 days ago', current: false },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${session.current ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{session.device}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{session.location} · {session.time}</p>
                  </div>
                </div>
                {session.current ? (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                ) : (
                  <button className="text-xs font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer">Revoke</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-5">
          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Danger Zone</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">Irreversible and destructive actions</p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition cursor-pointer"
            >
              Delete Account
            </button>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl">
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">Are you sure? This action is permanent and cannot be undone. All your data will be deleted.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Account deletion is not available in demo mode.')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
