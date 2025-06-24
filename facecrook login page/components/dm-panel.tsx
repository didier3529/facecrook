interface DirectMessage {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface DmPanelProps {
  dms: DirectMessage[]
}

export function DmPanel({ dms }: DmPanelProps) {
  return (
    <aside className="hidden xl:block w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-screen sticky top-0">
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Direct Messages</h2>
        </div>

        {/* Messages List */}
        <div className="space-y-2">
          {dms.map((dm) => (
            <div
              key={dm.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img
                  src={dm.avatar || "/placeholder.svg"}
                  alt={`${dm.name} avatar`}
                  className="w-8 h-8 rounded-full bg-gray-300"
                />
                {dm.unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{dm.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{dm.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{dm.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
