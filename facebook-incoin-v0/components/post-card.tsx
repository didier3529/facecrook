"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react"

interface Post {
  id: string
  avatar: string
  displayName: string
  timestamp: string
  content: string
  likes: number
  comments: number
  shares: number
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.avatar || "/placeholder.svg"}
            alt={`${post.displayName} avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{post.displayName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp} · 🌍</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 dark:text-white leading-relaxed">{post.content}</p>
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white fill-current" />
              </div>
            </div>
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center px-4 py-2">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${
            isLiked
              ? "text-red-600 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          <span className="font-medium">Like</span>
        </button>

        <button className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Comment</span>
        </button>

        <button className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Share className="h-5 w-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  )
}
