import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:5000'

let socket = null

export const connectSocket = (userId) => {
  if (socket?.connected) return socket

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
    if (userId) {
      socket.emit('user_online', userId)
    }
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const joinConversation = (conversationId) => {
  if (socket) socket.emit('join_conversation', conversationId)
}

export const leaveConversation = (conversationId) => {
  if (socket) socket.emit('leave_conversation', conversationId)
}

export const emitMessage = (data) => {
  if (socket) socket.emit('send_message', data)
}

export const emitTyping = (data) => {
  if (socket) socket.emit('typing', data)
}

export const emitStopTyping = (data) => {
  if (socket) socket.emit('stop_typing', data)
}

export const emitDataChanged = (data) => {
  if (socket) socket.emit('data_changed', data)
}
