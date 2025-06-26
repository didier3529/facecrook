import { Bookmark, Calendar, ChevronDown, Clock, Flag, Gamepad2, Home, MessageCircle, ShoppingBag, User, Users, Users2 } from "lucide-react";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAvatar } from '../../contexts/AvatarContext';
import { useAuth } from '../../hooks/useAuth';
import { AvatarDisplay } from '../AvatarDisplay';

const mainNavigationItems = [
    { name: "Home", icon: Home, color: "text-[#1877f2]", path: "/" },
    { name: "Feed", icon: Users, color: "text-[#1877f2]", path: "/feed" },
    { name: "AI Trump Chat", icon: MessageCircle, color: "text-red-500", path: "/chat" },
    { name: "Profile", icon: User, color: "text-[#1877f2]", path: "/profile" },
];

const navigationItems = [
    { name: "Memories", icon: Clock, color: "text-[#1877f2]" },
    { name: "Saved", icon: Bookmark, color: "text-red-500" },
    { name: "Groups", icon: Flag, color: "text-[#1877f2]" },
    { name: "Events", icon: Calendar, color: "text-red-500" },
    { name: "Pages", icon: Users2, color: "text-[#1877f2]" },
    { name: "Gaming", icon: Gamepad2, color: "text-red-500" },
    { name: "Marketplace", icon: ShoppingBag, color: "text-[#1877f2]" },
];

export function Sidebar() {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const { getCurrentUserAvatar } = useAvatar();
    const { user } = useAuth();

    return (
        <aside className="w-80 bg-[#1a1a1a] h-screen sticky top-14 overflow-y-auto">
            <div className="p-4">
                {/* User Profile */}
                <Link to="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer mb-4 transition-colors">
                    <AvatarDisplay
                        avatar={getCurrentUserAvatar()}
                        size="sm"
                        className="w-9 h-9"
                    />
                    <span className="font-medium text-white">{user?.name || 'Your Profile'}</span>
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
                                    ? "bg-[#2a2a2a] text-[#1877f2]"
                                    : "hover:bg-[#2a2a2a] text-white"
                                    }`}
                            >
                                <Icon className={`h-6 w-6 ${isActive ? "text-[#1877f2]" : item.color}`} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <hr className="border-[#3a3a3a] mb-4" />

                {/* Secondary Navigation */}
                <nav className="space-y-1">
                    {navigationItems.slice(0, showMore ? navigationItems.length : 4).map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.name}
                                type="button"
                                className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg text-left hover:bg-[#2a2a2a] transition-colors"
                            >
                                <Icon className={`h-6 w-6 ${item.color}`} />
                                <span className="font-medium text-white">{item.name}</span>
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg text-left hover:bg-[#2a2a2a] transition-colors"
                    >
                        <div className="w-6 h-6 bg-[#3a3a3a] rounded-full flex items-center justify-center">
                            <ChevronDown
                                className={`h-4 w-4 text-gray-300 transition-transform ${showMore ? "rotate-180" : ""}`}
                            />
                        </div>
                        <span className="font-medium text-white">{showMore ? "See less" : "See more"}</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
} 