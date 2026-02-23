
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './context/TaskContext'
import { TeamProvider } from './context/TeamContext'
import { ProfileProvider } from './context/ProfileContext'
import { ProjectProvider } from './context/ProjectContext'
import { MessageProvider } from './context/MessageContext'
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
      <TaskProvider>
        <TeamProvider>
          <ProfileProvider>
            <ProjectProvider>
            <MessageProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/tasks" element={<Tasks />}></Route>
                <Route path="/team" element={<Team />}></Route>
                <Route path="/projects" element={<Projects />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/messages" element={<Messages />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/error" element={<Error />}></Route>
                <Route path="*" element={<Error />}></Route>
              </Routes>
            </BrowserRouter>
            </MessageProvider>
            </ProjectProvider>
          </ProfileProvider>
        </TeamProvider>
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App
