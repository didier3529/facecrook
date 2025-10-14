import { Heart, MessageCircle, MoreHorizontal, Share } from "lucide-react";
import React, { useState } from 'react';
import { AvatarDisplay } from '../AvatarDisplay';
import { CelebrityAvatarDisplay } from '../CelebrityAvatarDisplay';

export function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };


    // Check if this is a celebrity post
    const isCelebrityPost = post.celebrityId || post.isVerified;

    return (
        <div className="bg-white rounded-lg shadow-sm mb-4">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center space-x-3">
                    {(() => {
                        if (post.avatar) {
                            return (
                                <img
                                    src={post.avatar}
                                    alt={post.displayName}
                                    className="w-12 h-12 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            );
                        }
                        if (isCelebrityPost && post.celebrityId) {
                            return (
                                <CelebrityAvatarDisplay
                                    celebrityId={post.celebrityId}
                                    size="lg"
                                    className="w-12 h-12"
                                />
                            );
                        }
                        return (
                            <AvatarDisplay
                                avatar={post.avatar}
                                size="lg"
                                className="w-12 h-12"
                            />
                        );
                    })()}
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{post.displayName}</h3>
                            {post.isVerified && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-1">
                            <p className="text-sm text-gray-500">
                                {post.professionalIdentity && (
                                    <span className="text-[#1877f2]">{post.professionalIdentity}</span>
                                )}
                                {post.professionalIdentity && " · "}
                                {post.timestamp}
                            </p>
                        </div>
                    </div>
                </div>
                <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{post.content}</p>

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

            </div>


            {/* Post Stats */}
            <div className="px-4 py-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                        <span>{post.comments} comments</span>
                        <span>{post.shares} shares</span>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            {post.commentData && post.commentData.length > 0 && (
                <div className="px-4 pb-3">
                    {post.commentData.slice(0, 3).map((comment, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex items-start space-x-2">
                                <img
                                    src={comment.avatar}
                                    alt={comment.author}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600" style={{display: 'none'}}>
                                    {comment.author.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                                            ❤️ {comment.likes}
                                        </button>
                                        <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {post.commentData.length > 3 && (
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                            View {post.commentData.length - 3} more comments
                        </button>
                    )}
                </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center px-4 py-2">
                <button
                    type="button"
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${isLiked
                        ? "text-red-500"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                    <span className="font-medium">Like</span>
                </button>


                <button type="button" className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Comment</span>
                </button>

                <button type="button" className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <Share className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                </button>
            </div>
        </div>
    );
} 