// landing page for the project

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import ThemeToggle from '../components/ThemeToggle'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-200">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 dark:from-indigo-900/20 via-transparent to-transparent" />

        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10 p-1" />
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              Project<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Link to="/login" className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition">Get Started</Link>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Manage Projects with<br />
            <span className="text-indigo-600 dark:text-indigo-400">Clarity & Speed</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Plan, track, and deliver projects effortlessly. Organize tasks, collaborate with your team, and hit every deadline — all from one powerful dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition flex items-center gap-2">
              Start Free Today →
            </Link>
            <Link to="/error" className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition">
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-slate-100/60 dark:bg-slate-800/40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Everything Your Team Needs</h2>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-indigo-500/5 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-2xl mb-4">
                ✅
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Task Management</h3>
              <p className="text-slate-500 dark:text-slate-400">Create, assign, and track tasks with priorities, deadlines, and status updates in real time.</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-indigo-500/5 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-2xl mb-4">
                🫂
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Team Collaboration</h3>
              <p className="text-slate-500 dark:text-slate-400">Invite team members, assign roles, and keep everyone aligned with shared boards and comments.</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 p-6 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-indigo-500/5 transition-all hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-2xl mb-4">
                📊
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Progress Tracking</h3>
              <p className="text-slate-500 dark:text-slate-400">Visualize project progress with dashboards, charts, and milestone tracking at a glance.</p>
            </div>

          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/25">1</div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Create a Project</h3>
              <p className="text-slate-500 dark:text-slate-400">Set up your project in seconds with a name, description, and team members.</p>
            </div>

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/25">2</div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Add Tasks & Assign</h3>
              <p className="text-slate-500 dark:text-slate-400">Break work into tasks, set priorities and deadlines, and assign to the right people.</p>
            </div>

            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/25">3</div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Track & Deliver</h3>
              <p className="text-slate-500 dark:text-slate-400">Monitor progress in real time and deliver projects on schedule, every single time.</p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-indigo-50 dark:bg-indigo-600/20 border-y border-indigo-200 dark:border-indigo-500/20 text-center transition-colors duration-200">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to Ship Projects Faster?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of teams using ProjectHub to stay organized, hit deadlines, and build better together.</p>
        <Link to="/signup" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition">
          Get Started Free
        </Link>
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-700/50 py-8 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors duration-200">
        <p>© 2026 ProjectHub. Built for teams that ship.</p>
      </footer>

    </div>
  )
}

export default Index
