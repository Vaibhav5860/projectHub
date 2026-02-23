import React, { useState, useMemo } from 'react'
import { useMessages } from '../../context/MessageContext'
import Sidebar from '../../components/dashboard/Sidebar'
import TopBar from '../../components/dashboard/TopBar'
import ConversationList from '../../components/messages/ConversationList'
import ChatHeader from '../../components/messages/ChatHeader'
import ChatWindow from '../../components/messages/ChatWindow'
import MessageInput from '../../components/messages/MessageInput'
import ContactInfo from '../../components/messages/ContactInfo'

const Messages = () => {
  const { conversations, contacts, sendMessage, markAsRead, deleteConversation, togglePin, deleteMessage } = useMessages()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null)
  const [search, setSearch] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)

  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations
    const q = search.toLowerCase()
    return conversations.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.lastMessage?.text?.toLowerCase().includes(q))
    )
  }, [conversations, search])

  const activeConv = conversations.find((c) => c.id === activeConvId) || null

  const handleSelectConv = (id) => {
    setActiveConvId(id)
    markAsRead(id)
    setShowMobileChat(true)
  }

  const handleSend = (text) => {
    if (activeConvId) sendMessage(activeConvId, text)
  }

  const handleDelete = (id) => {
    deleteConversation(id)
    if (activeConvId === id) {
      const remaining = conversations.filter((c) => c.id !== id)
      setActiveConvId(remaining[0]?.id || null)
    }
    setShowInfo(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex">
      <Sidebar sidebarOpen={sidebarOpen} activePage="Messages" />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex flex-col`}>
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Chat layout */}
        <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Conversation List Panel */}
          <div className={`w-80 shrink-0 border-r border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800 ${showMobileChat ? 'hidden lg:flex' : 'flex'} flex-col`}>
            <ConversationList
              conversations={filteredConversations}
              activeId={activeConvId}
              onSelect={handleSelectConv}
              search={search}
              onSearchChange={setSearch}
              onNewChat={() => {}}
            />
          </div>

          {/* Chat Panel */}
          {activeConv ? (
            <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 ${showMobileChat ? 'flex' : 'hidden lg:flex'}`}>
              <ChatHeader
                conversation={activeConv}
                onToggleInfo={() => setShowInfo(!showInfo)}
                showInfo={showInfo}
                onBack={() => setShowMobileChat(false)}
              />
              <ChatWindow
                messages={activeConv.messages}
                onDeleteMessage={deleteMessage}
                conversationId={activeConv.id}
              />
              <MessageInput onSend={handleSend} />
            </div>
          ) : (
            <div className={`flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900 ${showMobileChat ? 'flex' : 'hidden lg:flex'}`}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-4">
                  <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">No conversation selected</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}

          {/* Contact Info Panel */}
          {showInfo && activeConv && (
            <ContactInfo
              conversation={activeConv}
              contacts={contacts}
              onClose={() => setShowInfo(false)}
              onPin={togglePin}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
