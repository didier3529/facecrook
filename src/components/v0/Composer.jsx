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
        <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] p-4">
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
                        className="w-full p-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1877f2] border border-[#3a3a3a]"
                        rows={3}
                    />
                </div>
            </div>

            <hr className="border-[#3a3a3a] mb-3" />

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
                        <ImageIcon className="h-5 w-5 text-[#1877f2]" />
                        <span className="text-sm font-medium">Photo/video</span>
                    </button>
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
                        <Users className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium">Tag friends</span>
                    </button>
                    <button type="button" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors">
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