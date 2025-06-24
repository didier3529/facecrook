"use client"

import { SignupModal } from "@/components/signup-modal"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      console.log("Login attempt:", { email, password })

      // Create a basic user if they don't exist (simplified login)
      const existingUser = localStorage.getItem("facecrook_user")
      if (!existingUser) {
        const userData = {
          id: `user_${Date.now()}`,
          email: email,
          name: "Crypto Veteran",
          identity: "Returning Trader",
          avatar: {},
          tokenBalance: 1000,
          isLoggedIn: true,
          joinDate: new Date().toISOString()
        }
        localStorage.setItem('facecrook_user', JSON.stringify(userData))
      }

      localStorage.setItem("facecrook_auth", "true")
      setIsLoading(false)

      // Redirect to main app
      window.location.href = "http://localhost:3001"
    }, 1500)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {/* Facecrook Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">Facecrook</h1>
        <p className="text-gray-600 dark:text-gray-400">Connect with friends and the world around you on Facecrook.</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or phone number"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <a href="#" className="text-green-600 dark:text-green-400 hover:underline text-sm">
          Forgotten password?
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">or</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Create Account Button */}
      <div className="text-center">
        <Button
          type="button"
          onClick={() => setShowSignupModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 px-8 py-3 font-semibold rounded-lg"
        >
          Create New Account
        </Button>
      </div>

      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  )
}
