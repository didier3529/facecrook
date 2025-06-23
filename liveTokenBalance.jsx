import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || '/'
const API_URL = process.env.REACT_APP_API_URL || ''

export default function LiveTokenBalance() {
  const [balance, setBalance] = useState(null)
  const socketRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchInitialBalance() {
      try {
        const response = await fetch(`${API_URL}/api/token/balance`, { signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const result = await response.json()
        setBalance(result.balance)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching token balance:', error)
        }
      }
    }

    fetchInitialBalance()

    const socket = io(SOCKET_URL, { transports: ['websocket'], reconnection: true })
    socketRef.current = socket

    const handleUpdate = data => {
      if (data && typeof data.balance !== 'undefined') {
        setBalance(data.balance)
      }
    }

    const handleError = error => {
      console.error('Socket connection error:', error)
    }

    socket.on('tokenUpdate', handleUpdate)
    socket.on('connect_error', handleError)

    return () => {
      controller.abort()
      if (socketRef.current) {
        socketRef.current.off('tokenUpdate', handleUpdate)
        socketRef.current.off('connect_error', handleError)
        socketRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="live-token-balance">
      {balance === null ? 'Loading...' : `Tokens: ${balance}`}
    </div>
  )
}