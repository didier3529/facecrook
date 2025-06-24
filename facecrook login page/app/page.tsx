"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Composer } from "@/components/composer"
import { PostCard } from "@/components/post-card"
import { RightPanel } from "@/components/right-panel"

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    avatar: "/placeholder.svg?height=40&width=40",
    displayName: "Sarah Johnson",
    timestamp: "2h",
    content:
      "Just launched my new project! Excited to share it with everyone. The journey has been incredible and I can't wait to see what comes next. 🚀",
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: "2",
    avatar: "/placeholder.svg?height=40&width=40",
    displayName: "Alex Chen",
    timestamp: "4h",
    content:
      "Beautiful sunset today! Sometimes you need to step away from the screen and appreciate the simple things in life. Nature has a way of putting everything in perspective.",
    likes: 156,
    comments: 23,
    shares: 12,
  },
  {
    id: "3",
    avatar: "/placeholder.svg?height=40&width=40",
    displayName: "Mike Rodriguez",
    timestamp: "6h",
    content:
      "Working on some exciting new features for our platform. Can't reveal too much yet, but stay tuned! The team has been putting in amazing work.",
    likes: 89,
    comments: 15,
    shares: 7,
  },
]

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated (in a real app, check token/session)
    const checkAuth = () => {
      // For demo purposes, redirect to login if not authenticated
      // In a real app, you'd check for valid session/token
      const hasAuth = localStorage.getItem("facecrook_auth") === "true"
      if (!hasAuth) {
        window.location.href = "/login"
        return
      }
      setIsAuthenticated(true)
    }

    checkAuth()
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header />

      <div className="flex pt-14">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 max-w-2xl mx-auto">
          <div className="space-y-4">
            <Composer />

            {/* Posts Feed */}
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <RightPanel />
      </div>
    </div>
  )
}
