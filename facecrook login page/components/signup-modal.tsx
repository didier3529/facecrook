"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState } from "react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    satiricalName: "",
    identity: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create user persona and save to localStorage
    const userData = {
      id: `user_${Date.now()}`,
      email: formData.email,
      name: formData.satiricalName,
      identity: formData.identity,
      avatar: {}, // Will be set later with avatar creator
      tokenBalance: 1000,
      isLoggedIn: true,
      joinDate: new Date().toISOString()
    }

    localStorage.setItem('facecrook_user', JSON.stringify(userData))
    localStorage.setItem('facecrook_auth', 'true')

    console.log("User persona created:", userData)
    onClose()

    // Redirect to main app
    window.location.href = "http://localhost:3001"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Crypto Persona</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Join the satirical crypto universe!</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Satirical Name (e.g., Crypto Karen, Diamond Dave)"
              value={formData.satiricalName}
              onChange={(e) => setFormData({ ...formData, satiricalName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="text"
            placeholder="Crypto Identity (e.g., Meme Coin Enthusiast, NFT Collector)"
            value={formData.identity}
            onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="password"
            placeholder="Password (any password works!)"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            required
          />

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            🎭 Ready to join the satirical crypto universe? You'll start with 1000 tokens!
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold">
            Create My Crypto Persona 🚀
          </Button>
        </form>
      </div>
    </div>
  )
}
