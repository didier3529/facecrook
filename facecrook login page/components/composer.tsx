"use client"

import { useState } from "react"
import { ImageIcon, Smile, Users } from "lucide-react"

export function Composer() {
  const [content, setContent] = useState("")

  const handlePost = () => {
    if (content.trim()) {
      console.log("Posting:", content)
      setContent("")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex space-x-3 mb-3">
        <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind, John?"
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-3xl resize-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={3}
          />
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mb-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
            <ImageIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Photo/video</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
            <Users className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Tag friends</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
            <Smile className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Feeling/activity</span>
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  )
}
