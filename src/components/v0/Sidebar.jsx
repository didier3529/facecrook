import { Bookmark, Calendar, ChevronDown, Clock, Flag, Gamepad2, Home, MessageCircle, ShoppingBag, User, Users, Users2 } from "lucide-react";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const mainNavigationItems = [
    { name: "Home", icon: Home, color: "text-green-500", path: "/" },
    { name: "Feed", icon: Users, color: "text-green-500", path: "/feed" },
    { name: "AI Trump Chat", icon: MessageCircle, color: "text-red-500", path: "/chat" },
    { name: "Profile", icon: User, color: "text-green-500", path: "/profile" },
];

const navigationItems = [
    { name: "Memories", icon: Clock, color: "text-green-500" },
    { name: "Saved", icon: Bookmark, color: "text-red-500" },
    { name: "Groups", icon: Flag, color: "text-green-500" },
    { name: "Events", icon: Calendar, color: "text-red-500" },
    { name: "Pages", icon: Users2, color: "text-green-500" },
    { name: "Gaming", icon: Gamepad2, color: "text-red-500" },
    { name: "Marketplace", icon: ShoppingBag, color: "text-green-500" },
];

export function Sidebar() {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();

    return (
        <aside className="w-80 bg-white dark:bg-gray-800 h-screen sticky top-14 overflow-y-auto">
            <div className="p-4">
                {/* User Profile */}
                <Link to="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-4">
                    <img src="/placeholder.svg?height=36&width=36" alt="Your profile" className="w-9 h-9 rounded-full" />
                    <span className="font-medium text-gray-900 dark:text-white">Your Profile</span>
                </Link>

                {/* Main Navigation */}
                <nav className="space-y-1 mb-4">
                    {mainNavigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                                    }`}
                            >
                                <Icon className={`h-6 w-6 ${isActive ? "text-green-500" : item.color}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <hr className="border-gray-200 dark:border-gray-700 mb-4" />

                {/* Secondary Navigation */}
                <nav className="space-y-1">
                    {navigationItems.slice(0, showMore ? navigationItems.length : 4).map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                type="button"
                                className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Icon className={`h-6 w-6 ${item.color}`} />
                                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <ChevronDown
                                className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{showMore ? "See less" : "See more"}</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
} 