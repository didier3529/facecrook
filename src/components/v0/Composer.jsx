import { ImageIcon, Smile, Users } from "lucide-react";
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useAvatar } from '../../contexts/AvatarContext';
import { feedService } from '../../services/feedService';
import { AvatarDisplay } from '../AvatarDisplay';

export function Composer() {
    const [content, setContent] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaPreviews, setMediaPreviews] = useState([]);
    const { getCurrentUserAvatar } = useAvatar();
    const { user } = useAuth();

    const handleMediaUpload = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
            const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
            return isValidType && isValidSize;
        });

        if (validFiles.length === 0) {
            alert('Please select valid image or video files (max 10MB each)');
            return;
        }

        setMediaFiles(prev => [...prev, ...validFiles]);

        // Create previews
        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setMediaPreviews(prev => [...prev, {
                    url: e.target.result,
                    type: file.type,
                    name: file.name,
                    size: file.size
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeMedia = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setMediaPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handlePost = () => {
        if ((content.trim() || mediaFiles.length > 0) && user) {
            // Create new post using feedService
            const newPost = feedService.addPost({
                celebrityId: user.id,
                displayName: user.name,
                avatar: user.profilePicture || getCurrentUserAvatar(),
                isVerified: false,
                content: content.trim(),
                professionalIdentity: user.identity || 'Member',
                media: mediaPreviews.map(preview => ({
                    url: preview.url,
                    type: preview.type,
                    name: preview.name
                }))
            });
            
            console.log("Post created:", newPost);
            setContent("");
            setMediaFiles([]);
            setMediaPreviews([]);
            
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('postCreated', { detail: newPost }));
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
                        placeholder={`Post your best crook, ${userName}!`}
                        className="w-full p-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1877f2] border border-gray-200"
                        rows={3}
                    />
                </div>
            </div>

            {/* Media Previews */}
            {mediaPreviews.length > 0 && (
                <div className="mb-3">
                    <div className="grid grid-cols-2 gap-2">
                        {mediaPreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                {preview.type.startsWith('image/') ? (
                                    <img
                                        src={preview.url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                    />
                                ) : (
                                    <video
                                        src={preview.url}
                                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                        controls
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeMedia(index)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <hr className="border-gray-200 mb-3" />

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        <ImageIcon className="h-5 w-5 text-[#1877f2]" />
                        <span className="text-sm font-medium">Photo/video</span>
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                        />
                    </label>
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
                    disabled={!content.trim() && mediaFiles.length === 0}
                    className="bg-[#1877f2] hover:bg-[#166fe5] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Post
                </button>
            </div>
        </div>
    );
} 