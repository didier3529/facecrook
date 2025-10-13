import React, { useEffect, useRef, useState } from 'react';
import StoryModal from './StoryModal';

const Stories = () => {
  const videoRefs = useRef({});
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stories = [
    {
      id: 1,
      name: 'Create Story',
      video: null,
      isCreateStory: true,
      profilePic: '/default-avatar.jpg',
      author: 'You'
    },
    {
      id: 2,
      name: 'Cricket Player',
      video: '/stories/cricket_dance.mp4',
      profilePic: '/pp_pic_others/Amir.jpeg',
      author: 'Amir Khan'
    },
    {
      id: 3,
      name: 'Mumbai IPL',
      video: '/stories/mumbai_ipl.mp4',
      profilePic: '/pp_pic_others/Oh.jpeg',
      author: 'Oh Singh'
    },
    {
      id: 4,
      name: 'Dance Video',
      video: '/stories/dance_video.mp4',
      profilePic: '/pp_pic_others/download (3).jpeg',
      author: 'Raj Patel'
    },
    {
      id: 5,
      name: 'Funny Dance',
      video: '/stories/funny_dance.mp4',
      profilePic: '/pp_pic_others/download (4).jpeg',
      author: 'Mike Chen'
    },
    {
      id: 6,
      name: 'Funny Animals',
      video: '/stories/funny_animals.mp4',
      profilePic: '/pp_pic_others/download (5).jpeg',
      author: 'Sarah Wilson'
    }
  ];

  // Auto-play videos when they come into view
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const video = videoRefs.current[entry.target.dataset.storyId];
        if (video) {
          if (entry.isIntersecting) {
            video.play().catch(e => console.log('Video autoplay failed:', e));
          } else {
            video.pause();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    });

    // Observe all video elements
    Object.keys(videoRefs.current).forEach(key => {
      const video = videoRefs.current[key];
      if (video) {
        video.dataset.storyId = key;
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleNextStory = () => {
    if (!selectedStory) return;
    const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
    if (currentIndex < stories.length - 1) {
      setSelectedStory(stories[currentIndex + 1]);
    } else {
      // Close modal when reaching the end
      handleCloseModal();
    }
  };

  const handlePrevStory = () => {
    if (!selectedStory) return;
    const currentIndex = stories.findIndex(s => s.id === selectedStory.id);
    if (currentIndex > 0) {
      setSelectedStory(stories[currentIndex - 1]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const currentIndex = selectedStory ? stories.findIndex(s => s.id === selectedStory.id) : -1;
  const hasNext = currentIndex < stories.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-32 cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className="relative">
              {/* Story Card */}
              <div className="relative w-32 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                {story.isCreateStory ? (
                  /* Create Story Card */
                  <div className="w-full h-full flex flex-col items-center justify-center text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-center px-2">Create Story</p>
                    </div>
                  </div>
                ) : (
                  /* Regular Story Card */
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[`story-${story.id}`] = el;
                      }}
                      className="w-full h-full object-cover"
                      poster={story.profilePic}
                      preload="auto"
                      muted
                      loop
                      playsInline
                      controls={false}
                      onLoadedData={() => {
                        console.log('Video loaded:', story.video);
                        const video = videoRefs.current[`story-${story.id}`];
                        if (video) {
                          video.play().catch(e => console.log('Auto-play failed:', e));
                        }
                      }}
                      onError={(e) => {
                        console.error('Video failed to load:', story.video);
                        // Fallback to poster image if video fails
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundImage = `url(${story.profilePic})`;
                        e.target.parentElement.style.backgroundSize = 'cover';
                        e.target.parentElement.style.backgroundPosition = 'center';
                      }}
                    >
                      <source src={story.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
                  </div>
                )}
                
                {/* Profile Picture */}
                <div className="absolute top-2 left-2">
                  <div className="w-10 h-10 rounded-full border-4 border-blue-600 overflow-hidden bg-white p-0.5">
                    <img
                      src={story.profilePic}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Story Author Name */}
                {!story.isCreateStory && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium text-center drop-shadow-lg">
                      {story.author}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        stories={stories}
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNextStory}
        onPrev={handlePrevStory}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </div>
  );
};

export default Stories;
