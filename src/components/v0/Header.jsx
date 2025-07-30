import {
    Bell,
    Gamepad2,
    Home,
    MessageCircle,
    Play,
    Plus,
    Search,
    Store,
    Users
} from "lucide-react";
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header({ user, onLogout }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/login', { replace: true });
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-14 shadow-sm">
            <div className="relative h-full w-full">
                {/* Left Section - Facebook Logo + Search */}
                <div className="logo-ultra-left">
                    {/* Facebook Logo */}
                    <Link to="/" className="facebook-logo-link">
                        <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center hover:bg-[#166fe5] transition-colors duration-200 relative">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <div className="facebook-search-container">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search Facecrook"
                                className="w-60 h-10 pl-10 pr-4 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                style={{ fontFamily: '"Segoe UI", Helvetica, Arial, sans-serif' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Center Navigation - Facebook Icons */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
                    <Link
                        to="/"
                        className={`facebook-nav-item ${location.pathname === "/" ? "active" : ""}`}
                        title="Home"
                    >
                        <Home className={`h-6 w-6 ${location.pathname === "/" ? "text-[#1877f2]" : "text-gray-500"}`} />
                        {location.pathname === "/" && <div className="facebook-nav-indicator" />}
                    </Link>
                    <Link
                        to="/watch"
                        className={`facebook-nav-item ${location.pathname === "/watch" ? "active" : ""}`}
                        title="Watch"
                    >
                        <Play className={`h-6 w-6 ${location.pathname === "/watch" ? "text-[#1877f2]" : "text-gray-500"}`} />
                        {location.pathname === "/watch" && <div className="facebook-nav-indicator" />}
                    </Link>
                    <Link
                        to="/marketplace"
                        className={`facebook-nav-item ${location.pathname === "/marketplace" ? "active" : ""}`}
                        title="Marketplace"
                    >
                        <Store className={`h-6 w-6 ${location.pathname === "/marketplace" ? "text-[#1877f2]" : "text-gray-500"}`} />
                        {location.pathname === "/marketplace" && <div className="facebook-nav-indicator" />}
                    </Link>
                    <Link
                        to="/groups"
                        className={`facebook-nav-item ${location.pathname === "/groups" ? "active" : ""}`}
                        title="Groups"
                    >
                        <Users className={`h-6 w-6 ${location.pathname === "/groups" ? "text-[#1877f2]" : "text-gray-500"}`} />
                        {location.pathname === "/groups" && <div className="facebook-nav-indicator" />}
                    </Link>
                    <Link
                        to="/gaming"
                        className={`facebook-nav-item ${location.pathname === "/gaming" ? "active" : ""}`}
                        title="Gaming"
                    >
                        <Gamepad2 className={`h-6 w-6 ${location.pathname === "/gaming" ? "text-[#1877f2]" : "text-gray-500"}`} />
                        {location.pathname === "/gaming" && <div className="facebook-nav-indicator" />}
                    </Link>
                </div>

                {/* Right Section - Facebook Style */}
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {/* Create Button */}
                    <button
                        type="button"
                        className="facebook-action-button"
                        title="Create"
                    >
                        <Plus className="h-5 w-5" />
                    </button>

                    {/* Messenger */}
                    <Link
                        to="/chat"
                        className="facebook-action-button"
                        title="Messenger"
                    >
                        <MessageCircle className="h-5 w-5" />
                    </Link>

                    {/* Notifications */}
                    <button
                        type="button"
                        className="facebook-action-button relative"
                        title="Notifications"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            3
                        </span>
                    </button>

                    {/* Account Menu */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="facebook-action-button"
                        title="Account"
                    >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-700">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
} 