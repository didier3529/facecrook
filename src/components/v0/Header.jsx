import { Bell, ChevronDown, Home, MessageCircle, Search, Users } from "lucide-react";
import React from 'react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 h-14">
            <div className="flex items-center justify-between px-4 h-full max-w-screen-2xl mx-auto">
                {/* Left Section */}
                <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">Facecrook</h1>
                    <div className="ml-4 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search Facecrook"
                            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm w-60 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* Center Navigation */}
                <div className="flex items-center space-x-2">
                    <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-green-600 bg-green-50 dark:bg-green-900/20">
                        <Home className="h-6 w-6" />
                    </button>
                    <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <Users className="h-6 w-6" />
                    </button>
                    <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <MessageCircle className="h-6 w-6" />
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span>
                    </button>
                    <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8 rounded-full" />
                        <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>
        </header>
    );
} 