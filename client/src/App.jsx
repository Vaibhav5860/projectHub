
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import { TeamProvider } from './context/TeamContext'
import { ProfileProvider } from './context/ProfileContext'
import { ProjectProvider } from './context/ProjectContext'
import { MessageProvider } from './context/MessageContext'
import ProtectedRoute from './components/ProtectedRoute'
import Index from './pages/Index.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Tasks from './pages/tasks/Tasks.jsx'
import Team from './pages/team/Team.jsx'
import Profile from './pages/profile/Profile.jsx'
import Settings from './pages/settings/Settings.jsx'
import Projects from './pages/projects/Projects.jsx'
import Messages from './pages/messages/Messages.jsx'
import Error from './pages/Error.jsx'

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <TaskProvider>
            <TeamProvider>
              <ProfileProvider>
                <ProjectProvider>
                  <MessageProvider>
                    <Routes>
                      <Route path="/" element={<Index />}></Route>
                      <Route path="/login" element={<Login />}></Route>
                      <Route path="/signup" element={<Signup />}></Route>
                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
                      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>}></Route>
                      <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>}></Route>
                      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>}></Route>
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
                      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>}></Route>
                      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
                      <Route path="/error" element={<Error />}></Route>
                      <Route path="*" element={<Error />}></Route>
                    </Routes>
                  </MessageProvider>
                </ProjectProvider>
              </ProfileProvider>
            </TeamProvider>
          </TaskProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
