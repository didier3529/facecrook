import { Heart, MessageCircle, MoreHorizontal, Share } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import storageService from '../../services/storageService';
import { AvatarDisplay } from '../AvatarDisplay';
import { CelebrityAvatarDisplay } from '../CelebrityAvatarDisplay';

export function EnhancedPostCard({ post }) {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes || 0);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [showReactions, setShowReactions] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    // Simplified reactions - only fire and heart
    const reactions = [
        { emoji: "🔥", name: "Fire", count: post.reactions?.fire || 0 },
        { emoji: "❤️", name: "Love", count: post.reactions?.heart || 0 }
    ];

    // Load user's like status and comments on mount
    useEffect(() => {
        if (user && post.id) {
            const liked = storageService.hasUserLikedPost(post.id, user.id);
            setIsLiked(liked);
        }
        
        // Load comments for this post
        loadComments();
    }, [user, post.id]);

    const loadComments = () => {
        const postComments = storageService.getCommentsByPostId(post.id);
        
        // If no comments in storage but post has commentData, use those
        if (postComments.length === 0 && post.commentData && post.commentData.length > 0) {
            setComments(post.commentData);
        } else {
            setComments(postComments);
        }
    };

    const handleLike = () => {
        if (!user) {
            alert('Please log in to like posts');
            return;
        }

        const result = storageService.togglePostLike(post.id, user.id);
        setIsLiked(result.liked);
        setLikeCount(result.likeCount);
    };

    const handleReaction = (reactionType) => {
        if (!user) {
            alert('Please log in to react to posts');
            return;
        }

        storageService.addReaction(post.id, user.id, reactionType);
        setSelectedReaction(reactionType);
        setShowReactions(false);
        
        // Reload post to get updated reaction counts
        const updatedPost = storageService.getPostById(post.id);
        if (updatedPost) {
            // Update reactions in parent if needed
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('Please log in to comment');
            return;
        }

        if (!commentText.trim()) {
            return;
        }

        setIsSubmittingComment(true);

        try {
            const newComment = storageService.addComment(post.id, user.id, commentText.trim());
            setComments(prev => [newComment, ...prev]);
            setCommentText('');
            setShowCommentBox(false);
        } catch (error) {
            alert(error.message || 'Failed to add comment');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleCommentLike = (comment) => {
        if (!user) {
            alert('Please log in to like comments');
            return;
        }

        // If comment doesn't have an ID, it's from initial data - we need to handle it locally
        if (!comment.id) {
            // Just update local state for initial comments
            setComments(prevComments => 
                prevComments.map(c => 
                    c === comment 
                        ? { ...c, likes: (c.likes || 0) + 1 }
                        : c
                )
            );
            return;
        }

        const result = storageService.toggleCommentLike(comment.id, user.id);
        
        // Update local comments state
        setComments(prevComments => 
            prevComments.map(c => 
                c.id === comment.id 
                    ? { ...c, likes: result.likeCount, likedBy: c.likedBy || [] }
                    : c
            )
        );
    };

    // Check if this is a celebrity post
    const isCelebrityPost = post.celebrityId || post.isVerified;

    // Get timestamp for comment
    const getTimeAgo = (timestamp) => {
        // If timestamp is already a formatted string like "2h" or "45m", return it
        if (typeof timestamp === 'string' && /^\d+[mhd]$/.test(timestamp)) {
            return timestamp;
        }
        
        // Otherwise calculate time ago
        const now = new Date();
        const commentTime = new Date(timestamp);
        const diffMs = now - commentTime;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d`;
    };

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

                {/* Post Media */}
                {post.media && post.media.length > 0 && (
                    <div className="mt-3">
                        {post.media.length === 1 ? (
                            // Single media item - larger display
                            <div className="rounded-lg overflow-hidden">
                                {post.media[0].type.startsWith('image/') ? (
                                    <img
                                        src={post.media[0].url}
                                        alt="Post content"
                                        className="w-full h-auto max-h-96 object-cover cursor-pointer"
                                        onClick={() => window.open(post.media[0].url, '_blank')}
                                    />
                                ) : (
                                    <video
                                        src={post.media[0].url}
                                        className="w-full h-auto max-h-96 object-cover"
                                        controls
                                        preload="metadata"
                                    />
                                )}
                            </div>
                        ) : (
                            // Multiple media items - grid display
                            <div className={`grid gap-2 ${
                                post.media.length === 2 ? 'grid-cols-2' :
                                post.media.length === 3 ? 'grid-cols-3' :
                                'grid-cols-2'
                            }`}>
                                {post.media.slice(0, 4).map((media, index) => (
                                    <div key={index} className="relative rounded-lg overflow-hidden">
                                        {media.type.startsWith('image/') ? (
                                            <img
                                                src={media.url}
                                                alt={`Post content ${index + 1}`}
                                                className="w-full h-32 object-cover cursor-pointer"
                                                onClick={() => window.open(media.url, '_blank')}
                                            />
                                        ) : (
                                            <video
                                                src={media.url}
                                                className="w-full h-32 object-cover"
                                                controls
                                                preload="metadata"
                                            />
                                        )}
                                        {post.media.length > 4 && index === 3 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">
                                                    +{post.media.length - 4} more
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Legacy Post Image Support */}
                {post.imageUrl && !post.media && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt="Post content"
                            className="w-full h-auto max-h-96 object-cover cursor-pointer"
                            onClick={() => window.open(post.imageUrl, '_blank')}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
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
                                <span className="text-gray-600">{reaction.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                        <span>{likeCount} likes</span>
                        <span>{comments.length} comments</span>
                        <span>{post.shares || 0} shares</span>
                    </div>
                </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center px-4 py-2 border-t border-gray-200">
                <button
                    type="button"
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors ${
                        isLiked
                            ? "text-red-500"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
                        className="flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full"
                    >
                        <span className="text-lg">{selectedReaction || "🔥"}</span>
                    </button>

                    {showReactions && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg p-2 shadow-lg border border-gray-200 z-10">
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

                <button 
                    type="button" 
                    onClick={() => setShowCommentBox(!showCommentBox)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Comment</span>
                </button>

                <button type="button" className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <Share className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                </button>
            </div>

            {/* Comment Input Box */}
            {showCommentBox && user && (
                <div className="px-4 py-3 border-t border-gray-200">
                    <form onSubmit={handleSubmitComment} className="flex space-x-2">
                        <img
                            src={user.profilePicture || '/default-avatar.jpg'}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full px-3 py-2 bg-gray-100 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="1"
                                disabled={isSubmittingComment}
                            />
                            <div className="flex justify-end mt-2 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCommentBox(false);
                                        setCommentText('');
                                    }}
                                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                                    disabled={isSubmittingComment}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!commentText.trim() || isSubmittingComment}
                                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmittingComment ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Comments Section */}
            {comments.length > 0 && (
                <div className="px-4 pb-3 border-t border-gray-200">
                    {comments.map((comment, index) => (
                        <div key={comment.id || `comment-${index}-${comment.author}`} className="mb-3 mt-3">
                            <div className="flex items-start space-x-2">
                                <img
                                    src={comment.avatar}
                                    alt={comment.author}
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                    onError={(e) => {
                                        e.target.src = '/default-avatar.jpg';
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                                            <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt || comment.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 mt-1 ml-2">
                                        <button 
                                            type="button"
                                            onClick={() => handleCommentLike(comment)}
                                            className={`text-xs font-medium transition-colors ${
                                                comment.likedBy?.includes(user?.id)
                                                    ? 'text-red-500'
                                                    : 'text-gray-500 hover:text-red-500'
                                            }`}
                                        >
                                            {comment.likedBy?.includes(user?.id) ? '❤️' : 'Like'} {comment.likes > 0 && comment.likes}
                                        </button>
                                        <button type="button" className="text-xs text-gray-500 hover:text-blue-500 transition-colors font-medium">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

