import { ImageIcon, Smile, Users } from "lucide-react";
import React, { useState } from 'react';
import { useAvatar } from '../../contexts/AvatarContext';
import { useAuth } from '../../hooks/useAuth';
import { AvatarDisplay } from '../AvatarDisplay';

export function Composer() {
    const [content, setContent] = useState("");
    const { getCurrentUserAvatar } = useAvatar();
    const { user } = useAuth();

    const handlePost = () => {
        if (content.trim()) {
            console.log("Posting:", content);
            setContent("");
        }
    };

    const userName = user?.name || 'Anonymous User';

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex space-x-3 mb-3">
                <AvatarDisplay
                    avatar={getCurrentUserAvatar()}
                    size="md"
                    className="w-10 h-10"
                />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${userName}?`}
                        className="w-full p-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1877f2] border border-gray-200"
                        rows={3}
                    />
                </div>
            </div>

            <hr className="border-gray-200 mb-3" />

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                        <ImageIcon className="h-5 w-5 text-[#1877f2]" />
                        <span className="text-sm font-medium">Photo/video</span>
                    </button>
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                        <Users className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium">Tag friends</span>
                    </button>
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                        <Smile className="h-5 w-5 text-[#1877f2]" />
                        <span className="text-sm font-medium">Feeling/activity</span>
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handlePost}
                    disabled={!content.trim()}
                    className="bg-[#1877f2] hover:bg-[#166fe5] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Post
                </button>
            </div>
        </div>
    );
} 