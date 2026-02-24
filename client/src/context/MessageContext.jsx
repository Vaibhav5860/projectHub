import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { messagesAPI, usersAPI } from '../services/api'
import { useAuth } from './AuthContext'
import { getSocket, joinConversation, leaveConversation, emitMessage } from '../services/socket'

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [conversations, setConversations] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, token } = useAuth()

  const fetchConversations = useCallback(async () => {
    if (!token) {
      setConversations([])
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await messagesAPI.getConversations()
      const convs = res.data.data.map((c) => {
        // For direct conversations, set name/avatar from the other member
        if (c.type === 'direct' && c.members) {
          const other = c.members.find((m) => m._id !== user?._id)
          if (other) {
            c.name = c.name || other.name
            c.avatar = other.avatar || other.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
            c.status = other.status?.toLowerCase() || 'offline'
            c.contactId = other._id
          }
        }
        // Map messages for frontend
        c.messages = (c.messages || []).map((m) => ({
          ...m,
          id: m._id,
          senderId: m.sender?._id === user?._id ? 'me' : m.sender?._id,
          senderName: m.sender?.name,
          time: m.createdAt,
        }))
        const lastMsg = c.messages[c.messages.length - 1]
        c.lastMessage = lastMsg ? { text: lastMsg.text, time: lastMsg.time, senderId: lastMsg.senderId } : null
        c.id = c._id
        return c
      })
      setConversations(convs)
    } catch (err) {
      console.error('Failed to fetch conversations:', err)
    } finally {
      setLoading(false)
    }
  }, [token, user])

  const fetchContacts = useCallback(async () => {
    if (!token) {
      setContacts([])
      return
    }
    try {
      const res = await usersAPI.getAll()
      setContacts(res.data.data.filter((u) => u._id !== user?._id).map((u) => ({
        ...u,
        id: u._id,
        avatar: u.avatar || u.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??',
        status: u.status?.toLowerCase() || 'offline',
      })))
    } catch (err) {
      console.error('Failed to fetch contacts:', err)
    }
  }, [token, user])

  useEffect(() => {
    fetchConversations()
    fetchContacts()
  }, [fetchConversations, fetchContacts])

  // Join all conversation rooms and listen for real-time messages
  useEffect(() => {
    const socket = getSocket()
    if (!socket || conversations.length === 0) return

    // Join all conversation rooms
    conversations.forEach((c) => {
      joinConversation(c._id || c.id)
    })

    const handleReceiveMessage = (data) => {
      setConversations((prev) =>
        prev.map((c) => {
          if ((c._id || c.id) === data.conversationId) {
            const newMsg = {
              id: data.messageId || Date.now().toString(),
              senderId: data.senderId,
              senderName: data.senderName,
              text: data.text,
              time: data.time || new Date().toISOString(),
              status: 'delivered',
            }
            return {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: { text: data.text, time: newMsg.time, senderId: data.senderId },
              unread: (c.unread || 0) + 1,
            }
          }
          return c
        })
      )
    }

    socket.on('receive_message', handleReceiveMessage)

    return () => {
      socket.off('receive_message', handleReceiveMessage)
      conversations.forEach((c) => {
        leaveConversation(c._id || c.id)
      })
    }
  }, [conversations.length])

  const sendMessage = async (conversationId, text) => {
    try {
      await messagesAPI.sendMessage(conversationId, { text })

      // Optimistic update
      const msg = {
        id: 'msg_' + Date.now(),
        senderId: 'me',
        text,
        time: new Date().toISOString(),
        status: 'sent',
      }
      setConversations((prev) =>
        prev.map((c) =>
          (c._id === conversationId || c.id === conversationId)
            ? { ...c, messages: [...c.messages, msg], lastMessage: { text, time: msg.time, senderId: 'me' } }
            : c
        )
      )

      // Emit via socket for real-time
      emitMessage({
        conversationId,
        senderId: user?._id,
        senderName: user?.name,
        text,
        time: msg.time,
      })
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((c) => ((c._id === conversationId || c.id === conversationId) ? { ...c, unread: 0 } : c))
    )
  }

  const deleteConversation = (conversationId) => {
    setConversations((prev) => prev.filter((c) => (c._id !== conversationId && c.id !== conversationId)))
  }

  const togglePin = (conversationId) => {
    setConversations((prev) =>
      prev.map((c) => ((c._id === conversationId || c.id === conversationId) ? { ...c, pinned: !c.pinned } : c))
    )
  }

  const deleteMessage = (conversationId, messageId) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c._id !== conversationId && c.id !== conversationId) return c
        const messages = c.messages.filter((m) => m.id !== messageId && m._id !== messageId)
        const lastMessage = messages.length > 0 ? { text: messages[messages.length - 1].text, time: messages[messages.length - 1].time, senderId: messages[messages.length - 1].senderId } : null
        return { ...c, messages, lastMessage }
      })
    )
  }

  const createConversation = async (members, type = 'direct', name = '') => {
    try {
      const res = await messagesAPI.createConversation({ members, type, name })
      await fetchConversations()
      return res.data.data
    } catch (err) {
      console.error('Failed to create conversation:', err)
      throw err
    }
  }

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread || 0), 0)

  return (
    <MessageContext.Provider value={{ conversations, contacts, loading, sendMessage, markAsRead, deleteConversation, togglePin, deleteMessage, totalUnread, createConversation, fetchConversations }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessages = () => {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessages must be used within MessageProvider')
  return ctx
}
