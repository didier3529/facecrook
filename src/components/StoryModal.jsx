import React, { useEffect, useRef, useState } from 'react';

const StoryModal = ({ story, stories, currentIndex, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  const videoRef = useRef(null);
  const [reactions, setReactions] = useState([]);
  const [showReactionBar, setShowReactionBar] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Auto-play failed:', e));
    }
    // Clear reactions when story changes
    setReactions([]);
  }, [isOpen, story]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) onPrev();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onClose, onNext, onPrev]);

  const handleReaction = (emoji) => {
    const newReaction = {
      id: Date.now(),
      emoji: emoji,
      x: Math.random() * 80 + 10, // Random position 10-90%
      y: Math.random() * 60 + 20, // Random position 20-80%
      timestamp: Date.now()
    };
    
    setReactions(prev => [...prev, newReaction]);
    
    // Auto-remove reaction after 3 seconds
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    handleReaction('❤️');
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && hasNext) {
      onNext();
    }
    if (isRightSwipe && hasPrev) {
      onPrev();
    }
  };

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows - Always visible */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 ${
          hasPrev 
            ? 'text-white hover:text-gray-300 hover:scale-110 cursor-pointer' 
            : 'text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <div className="bg-black bg-opacity-50 rounded-full p-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-200 ${
          hasNext 
            ? 'text-white hover:text-gray-300 hover:scale-110 cursor-pointer' 
            : 'text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <div className="bg-black bg-opacity-50 rounded-full p-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Story content */}
      <div className="relative w-full max-w-md mx-4">
        {/* Story header */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center space-x-3">
            <img
              src={story.profilePic}
              alt={story.author}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="text-white">
              <p className="font-semibold text-sm">{story.author}</p>
              <p className="text-xs opacity-75">now</p>
            </div>
          </div>
        </div>

        {/* Video container */}
        <div 
          className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] max-h-[80vh]"
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {story.isCreateStory ? (
            /* Create Story Content */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Create Story</h3>
              <p className="text-white text-sm opacity-75 text-center px-8">
                Share a moment with your friends
              </p>
            </div>
          ) : (
            /* Video Story */
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={story.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Floating Reactions */}
          {reactions.map((reaction) => (
            <div
              key={reaction.id}
              className="absolute pointer-events-none animate-bounce"
              style={{
                left: `${reaction.x}%`,
                top: `${reaction.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                animation: 'bounce 0.6s ease-in-out',
                zIndex: 20
              }}
            >
              {reaction.emoji}
            </div>
          ))}

          {/* Reaction Bar */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
            {['❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Story footer */}
          {!story.isCreateStory && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-black bg-opacity-50 rounded-lg p-3">
                <p className="text-white text-sm font-medium">{story.author}</p>
                <p className="text-white text-xs opacity-75">Shared now</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute top-0 left-4 right-4 h-1 bg-white bg-opacity-30 rounded-full mt-2">
          <div className="h-full bg-white rounded-full w-0 animate-pulse"></div>
        </div>
      </div>

      {/* Click areas for navigation */}
      <div 
        className={`absolute left-0 top-0 w-1/2 h-full ${hasPrev ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={hasPrev ? onPrev : undefined}
        title={hasPrev ? "Previous story" : ""}
      />
      <div 
        className={`absolute right-0 top-0 w-1/2 h-full ${hasNext ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={hasNext ? onNext : undefined}
        title={hasNext ? "Next story" : ""}
      />

      {/* Story counter and navigation hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <div className="text-white text-sm bg-black bg-opacity-50 rounded-full px-3 py-1">
          {currentIndex + 1} / {stories.length}
        </div>
        {!hasNext && (
          <div className="text-white text-xs bg-red-500 bg-opacity-80 rounded-full px-2 py-1">
            Last story
          </div>
        )}
        {!hasPrev && currentIndex === 0 && (
          <div className="text-white text-xs bg-blue-500 bg-opacity-80 rounded-full px-2 py-1">
            First story
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;
