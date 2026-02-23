import React, { createContext, useContext, useState, useEffect } from 'react'

const MessageContext = createContext()

const defaultContacts = [
  { id: 'u1', name: 'Sarah Chen', avatar: 'SC', role: 'Lead Designer', status: 'online', email: 'sarah.chen@projecthub.com' },
  { id: 'u2', name: 'Marcus Johnson', avatar: 'MJ', role: 'Full Stack Developer', status: 'online', email: 'marcus.j@projecthub.com' },
  { id: 'u3', name: 'Emily Rodriguez', avatar: 'ER', role: 'Project Manager', status: 'away', email: 'emily.r@projecthub.com' },
  { id: 'u4', name: 'David Kim', avatar: 'DK', role: 'Backend Engineer', status: 'offline', email: 'david.kim@projecthub.com' },
  { id: 'u5', name: 'Lisa Wang', avatar: 'LW', role: 'UX Researcher', status: 'online', email: 'lisa.w@projecthub.com' },
  { id: 'u6', name: 'James Wilson', avatar: 'JW', role: 'DevOps Engineer', status: 'offline', email: 'james.w@projecthub.com' },
  { id: 'u7', name: 'Aisha Patel', avatar: 'AP', role: 'QA Lead', status: 'online', email: 'aisha.p@projecthub.com' },
  { id: 'u8', name: 'Tom Bennett', avatar: 'TB', role: 'Product Owner', status: 'away', email: 'tom.b@projecthub.com' },
]

const defaultConversations = [
  {
    id: 'c1',
    type: 'direct',
    contactId: 'u1',
    name: 'Sarah Chen',
    avatar: 'SC',
    status: 'online',
    unread: 2,
    pinned: true,
    lastMessage: { text: 'I just pushed the updated mockups to Figma. Can you take a look?', time: '2026-02-16T09:45:00', senderId: 'u1' },
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hey! How\'s the dashboard redesign going?', time: '2026-02-16T09:00:00', status: 'read' },
      { id: 'm2', senderId: 'me', text: 'Going well! Almost done with the stats grid and activity feed components.', time: '2026-02-16T09:05:00', status: 'read' },
      { id: 'm3', senderId: 'u1', text: 'Nice! I finished the updated color palette and typography. Want me to share?', time: '2026-02-16T09:10:00', status: 'read' },
      { id: 'm4', senderId: 'me', text: 'Yes please! That would be super helpful. Also, did you get feedback from the client on the wireframes?', time: '2026-02-16T09:15:00', status: 'read' },
      { id: 'm5', senderId: 'u1', text: 'They loved the overall direction. Just a few tweaks on the sidebar navigation. I\'ll send you the notes.', time: '2026-02-16T09:30:00', status: 'read' },
      { id: 'm6', senderId: 'u1', text: 'I just pushed the updated mockups to Figma. Can you take a look?', time: '2026-02-16T09:45:00', status: 'delivered' },
    ],
  },
  {
    id: 'c2',
    type: 'direct',
    contactId: 'u2',
    name: 'Marcus Johnson',
    avatar: 'MJ',
    status: 'online',
    unread: 0,
    pinned: true,
    lastMessage: { text: 'PR is approved. Merging now.', time: '2026-02-16T08:30:00', senderId: 'u2' },
    messages: [
      { id: 'm7', senderId: 'me', text: 'Hey Marcus, can you review my PR for the auth module?', time: '2026-02-15T16:00:00', status: 'read' },
      { id: 'm8', senderId: 'u2', text: 'Sure, I\'ll take a look after standup.', time: '2026-02-15T16:05:00', status: 'read' },
      { id: 'm9', senderId: 'u2', text: 'Left a few comments. Mostly minor stuff - naming conventions and a missing null check.', time: '2026-02-15T17:30:00', status: 'read' },
      { id: 'm10', senderId: 'me', text: 'Fixed everything. Updated the PR. Thanks for the quick review!', time: '2026-02-16T08:00:00', status: 'read' },
      { id: 'm11', senderId: 'u2', text: 'PR is approved. Merging now.', time: '2026-02-16T08:30:00', status: 'read' },
    ],
  },
  {
    id: 'c3',
    type: 'group',
    name: 'Frontend Team',
    avatar: 'FT',
    members: ['u1', 'u2', 'u5'],
    unread: 5,
    pinned: false,
    lastMessage: { text: 'Sprint planning tomorrow at 10am', time: '2026-02-16T10:15:00', senderId: 'u5', senderName: 'Lisa' },
    messages: [
      { id: 'm12', senderId: 'u1', senderName: 'Sarah', text: 'Team, we need to finalize the component library this week.', time: '2026-02-16T08:00:00', status: 'read' },
      { id: 'm13', senderId: 'u2', senderName: 'Marcus', text: 'I can handle the form components and validation logic.', time: '2026-02-16T08:15:00', status: 'read' },
      { id: 'm14', senderId: 'me', text: 'I\'ll work on the data display components - tables, charts, cards.', time: '2026-02-16T08:20:00', status: 'read' },
      { id: 'm15', senderId: 'u5', senderName: 'Lisa', text: 'I have the usability test results for the current components. Sharing the report now.', time: '2026-02-16T09:00:00', status: 'delivered' },
      { id: 'm16', senderId: 'u1', senderName: 'Sarah', text: 'Great, let\'s review everything in the sprint planning meeting.', time: '2026-02-16T09:30:00', status: 'delivered' },
      { id: 'm17', senderId: 'u5', senderName: 'Lisa', text: 'Sprint planning tomorrow at 10am', time: '2026-02-16T10:15:00', status: 'delivered' },
    ],
  },
  {
    id: 'c4',
    type: 'direct',
    contactId: 'u3',
    name: 'Emily Rodriguez',
    avatar: 'ER',
    status: 'away',
    unread: 1,
    pinned: false,
    lastMessage: { text: 'Can we reschedule the 1-on-1 to Thursday?', time: '2026-02-16T07:00:00', senderId: 'u3' },
    messages: [
      { id: 'm18', senderId: 'u3', text: 'Hi! Quick update on the project timeline - we\'re on track for the March deadline.', time: '2026-02-15T14:00:00', status: 'read' },
      { id: 'm19', senderId: 'me', text: 'That\'s great news! Any blockers I should know about?', time: '2026-02-15T14:10:00', status: 'read' },
      { id: 'm20', senderId: 'u3', text: 'The API integration is the main dependency. David is working on it.', time: '2026-02-15T14:15:00', status: 'read' },
      { id: 'm21', senderId: 'u3', text: 'Can we reschedule the 1-on-1 to Thursday?', time: '2026-02-16T07:00:00', status: 'delivered' },
    ],
  },
  {
    id: 'c5',
    type: 'group',
    name: 'Project Alpha',
    avatar: 'PA',
    members: ['u2', 'u3', 'u4', 'u7'],
    unread: 0,
    pinned: false,
    lastMessage: { text: 'Deployment was successful! 🎉', time: '2026-02-15T18:00:00', senderId: 'u4', senderName: 'David' },
    messages: [
      { id: 'm22', senderId: 'u3', senderName: 'Emily', text: 'Team, the staging environment is ready for testing.', time: '2026-02-15T15:00:00', status: 'read' },
      { id: 'm23', senderId: 'u7', senderName: 'Aisha', text: 'Running the full test suite now. Should be done in about an hour.', time: '2026-02-15T15:30:00', status: 'read' },
      { id: 'm24', senderId: 'u7', senderName: 'Aisha', text: 'All tests passed! ✅ 247 tests, 0 failures. Ready for prod.', time: '2026-02-15T16:45:00', status: 'read' },
      { id: 'm25', senderId: 'u4', senderName: 'David', text: 'Starting the production deployment...', time: '2026-02-15T17:30:00', status: 'read' },
      { id: 'm26', senderId: 'u4', senderName: 'David', text: 'Deployment was successful! 🎉', time: '2026-02-15T18:00:00', status: 'read' },
    ],
  },
  {
    id: 'c6',
    type: 'direct',
    contactId: 'u6',
    name: 'James Wilson',
    avatar: 'JW',
    status: 'offline',
    unread: 0,
    pinned: false,
    lastMessage: { text: 'CI/CD pipeline is configured. Check the docs I updated.', time: '2026-02-14T16:00:00', senderId: 'u6' },
    messages: [
      { id: 'm27', senderId: 'me', text: 'James, we need a new staging environment for the dashboard project.', time: '2026-02-14T14:00:00', status: 'read' },
      { id: 'm28', senderId: 'u6', text: 'On it. I\'ll set up docker containers and a CI/CD pipeline.', time: '2026-02-14T14:30:00', status: 'read' },
      { id: 'm29', senderId: 'u6', text: 'CI/CD pipeline is configured. Check the docs I updated.', time: '2026-02-14T16:00:00', status: 'read' },
    ],
  },
  {
    id: 'c7',
    type: 'direct',
    contactId: 'u8',
    name: 'Tom Bennett',
    avatar: 'TB',
    status: 'away',
    unread: 0,
    pinned: false,
    lastMessage: { text: 'Let\'s discuss the roadmap for Q2 next week.', time: '2026-02-13T11:00:00', senderId: 'u8' },
    messages: [
      { id: 'm30', senderId: 'u8', text: 'I\'ve been reviewing the user feedback from the latest release.', time: '2026-02-13T10:00:00', status: 'read' },
      { id: 'm31', senderId: 'u8', text: 'Overall positive! A few feature requests around notifications and reporting.', time: '2026-02-13T10:05:00', status: 'read' },
      { id: 'm32', senderId: 'me', text: 'Great to hear! I can start scoping those features.', time: '2026-02-13T10:30:00', status: 'read' },
      { id: 'm33', senderId: 'u8', text: 'Let\'s discuss the roadmap for Q2 next week.', time: '2026-02-13T11:00:00', status: 'read' },
    ],
  },
]

export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('projecthub_messages')
    return saved ? JSON.parse(saved) : defaultConversations
  })
  const [contacts] = useState(defaultContacts)

  useEffect(() => {
    localStorage.setItem('projecthub_messages', JSON.stringify(conversations))
  }, [conversations])

  const sendMessage = (conversationId, text) => {
    const msg = {
      id: 'msg_' + Date.now(),
      senderId: 'me',
      text,
      time: new Date().toISOString(),
      status: 'sent',
    }
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, msg], lastMessage: { text, time: msg.time, senderId: 'me' } }
          : c
      )
    )
  }

  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
    )
  }

  const deleteConversation = (conversationId) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId))
  }

  const togglePin = (conversationId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, pinned: !c.pinned } : c))
    )
  }

  const deleteMessage = (conversationId, messageId) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c
        const messages = c.messages.filter((m) => m.id !== messageId)
        const lastMessage = messages.length > 0 ? { text: messages[messages.length - 1].text, time: messages[messages.length - 1].time, senderId: messages[messages.length - 1].senderId } : null
        return { ...c, messages, lastMessage }
      })
    )
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <MessageContext.Provider value={{ conversations, contacts, sendMessage, markAsRead, deleteConversation, togglePin, deleteMessage, totalUnread }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessages = () => {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessages must be used within MessageProvider')
  return ctx
}
