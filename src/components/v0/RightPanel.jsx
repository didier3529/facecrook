import { MoreHorizontal, Search } from "lucide-react";
import React from 'react';

const contacts = [
    { id: "1", name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { id: "2", name: "James Brown", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { id: "3", name: "Lisa Davis", avatar: "/placeholder.svg?height=32&width=32", online: false },
    { id: "4", name: "David Miller", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { id: "5", name: "Sophie Taylor", avatar: "/placeholder.svg?height=32&width=32", online: false },
];

const groupChats = [
    { id: "1", name: "React Developers", avatar: "/placeholder.svg?height=32&width=32", members: 12 },
    { id: "2", name: "Design Team", avatar: "/placeholder.svg?height=32&width=32", members: 8 },
];

export function RightPanel() {
    return (
        <aside className="w-80 bg-white dark:bg-gray-800 h-screen sticky top-14 overflow-y-auto border-l border-gray-200 dark:border-gray-700">
            <div className="p-4">
                {/* Sponsored */}
                <div className="mb-6">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-3">Sponsored</h3>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <img src="/placeholder.svg?height=40&width=40" alt="Ad" className="w-10 h-10 rounded-lg" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Learn React Today</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">reactcourse.com</p>
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm">Contacts</h3>
                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </button>
                            <button type="button" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <div className="relative">
                                    <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="w-8 h-8 rounded-full" />
                                    {contact.online && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                                    )}
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Group Conversations */}
                <div className="mt-6">
                    <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-3">Group conversations</h3>
                    <div className="space-y-1">
                        {groupChats.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <img src={group.avatar || "/placeholder.svg"} alt={group.name} className="w-8 h-8 rounded-full" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{group.members} members</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
} 