import { Heart, MessageCircle, MoreHorizontal, Share } from "lucide-react";
import React, { useState } from 'react';
import { AvatarDisplay } from '../AvatarDisplay';
import { CelebrityAvatarDisplay } from '../CelebrityAvatarDisplay';

export function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [showReactions, setShowReactions] = useState(false);

    // Simplified reactions - only 3 types
    const reactions = [
        { emoji: "🔥", name: "Fire", count: post.reactions?.fire || 0 },
        { emoji: "❤️", name: "Love", count: post.reactions?.heart || 0 },
        { emoji: "💩", name: "Trash", count: post.reactions?.poop || 0 }
    ];

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleReaction = (reactionType) => {
        setSelectedReaction(reactionType);
        setShowReactions(false);
        // In a real app, this would update the reaction counts
    };

    // Check if this is a celebrity post
    const isCelebrityPost = post.celebrityId || post.isVerified;

    return (
        <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] mb-4">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                    {isCelebrityPost && post.celebrityId ? (
                        <CelebrityAvatarDisplay
                            celebrityId={post.celebrityId}
                            size="lg"
                            className="w-12 h-12"
                        />
                    ) : (
                        <AvatarDisplay
                            avatar={post.avatar}
                            size="lg"
                            className="w-12 h-12"
                        />
                    )}
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{post.displayName}</h3>
                            {post.isVerified && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-1">
                            <p className="text-sm text-gray-400">
                                {post.professionalIdentity && (
                                    <span className="text-[#1877f2]">{post.professionalIdentity}</span>
                                )}
                                {post.professionalIdentity && " · "}
                                {post.timestamp}
                            </p>
                        </div>
                    </div>
                </div>
                <button type="button" className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="text-white leading-relaxed whitespace-pre-wrap">{post.content}</p>

                {/* Post Image */}
                {post.imageUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt="Post content"
                            className="w-full h-auto max-h-96 object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                {/* Hashtags and Mentions */}
                {post.hashtags && post.hashtags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {post.hashtags.map((hashtag) => (
                            <span key={hashtag} className="text-[#1877f2] hover:underline cursor-pointer">
                                #{hashtag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Reactions Display */}
            {reactions.some(r => r.count > 0) && (
                <div className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                        {reactions.filter(r => r.count > 0).map((reaction) => (
                            <div key={reaction.name} className="flex items-center space-x-1 text-sm">
                                <span className="text-lg">{reaction.emoji}</span>
                                <span className="text-gray-400">{reaction.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-b border-[#3a3a3a]">
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                    </div>
                </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center px-4 py-2">
                <button
                    type="button"
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${isLiked
                        ? "text-red-500"
                        : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                        }`}
                >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    <span className="font-medium">Like</span>
                </button>

                {/* Crypto Reactions Button */}
                <div className="relative flex-1">
                    <button
                        type="button"
                        onClick={() => setShowReactions(!showReactions)}
                        className="flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors w-full"
                    >
                        <span className="text-lg">{selectedReaction || "🔥"}</span>
                        <span className="font-medium">React</span>
                    </button>

                    {showReactions && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#2a2a2a] rounded-lg p-2 shadow-lg border border-[#3a3a3a]">
                            <div className="flex space-x-2">
                                {reactions.map((reaction) => (
                                    <button
                                        key={reaction.name}
                                        type="button"
                                        onClick={() => handleReaction(reaction.emoji)}
                                        className="text-2xl hover:scale-125 transition-transform p-1"
                                        title={reaction.name}
                                    >
                                        {reaction.emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button type="button" className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Comment</span>
                </button>

                <button type="button" className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a] hover:text-white transition-colors">
                    <Share className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                </button>
            </div>
        </div>
    );
} 