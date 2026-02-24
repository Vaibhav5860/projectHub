import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const AccountSettings = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' })
  const [deleteMsg, setDeleteMsg] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)
  const [deletingAccount, setDeletingAccount] = useState(false)

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPasswordMsg({ type: '', text: '' })

    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match!' })
      return
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }

    setSavingPassword(true)
    try {
      await authAPI.changePassword({
        currentPassword: passwordForm.current,
        newPassword: passwordForm.newPass,
      })
      setPasswordMsg({ type: 'success', text: 'Password updated! Logging out...' })
      setPasswordForm({ current: '', newPass: '', confirm: '' })
      setTimeout(() => {
        logout()
        navigate('/login')
      }, 1500)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update password.'
      setPasswordMsg({ type: 'error', text: msg })
    } finally {
      setSavingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteMsg('Please enter your password to confirm.')
      return
    }
    const confirmed = window.confirm(
      'WARNING: This will permanently delete your account and all associated data. This action cannot be undone.\n\nAre you absolutely sure you want to proceed?'
    )
    if (!confirmed) return
    setDeletingAccount(true)
    setDeleteMsg('')
    try {
      await authAPI.deleteAccount({ password: deletePassword })
      alert('Your account has been successfully deleted.')
      logout()
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete account.'
      setDeleteMsg(msg)
    } finally {
      setDeletingAccount(false)
    }
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
                disabled={savingPassword}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition cursor-pointer"
              >
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
              {passwordMsg.text && (
                <p className={`text-sm font-medium mt-2 ${passwordMsg.type === 'error' ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {passwordMsg.text}
                </p>
              )}
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
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Browser</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Active now · {user?.email}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
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
              <div className="mb-3">
                <label className="block text-xs font-medium text-red-600 dark:text-red-400 mb-1.5">Enter your password to confirm</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full max-w-sm px-3 py-2 bg-white dark:bg-slate-900/50 border border-red-300 dark:border-red-500/30 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>
              {deleteMsg && (
                <p className="text-sm text-red-500 font-medium mb-2">{deleteMsg}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deletingAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                >
                  {deletingAccount ? 'Deleting...' : 'Yes, Delete My Account'}
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
