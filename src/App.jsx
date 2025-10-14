import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AvatarDisplay } from './components/AvatarDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import IndianSalesWidget from './components/IndianSalesWidget';
import { StatusIndicator } from './components/StatusIndicator';
import Stories from './components/Stories';
import { CelebrityImageManager } from './components/admin/CelebrityImageManager';
import { AuthGuard } from './components/auth/AuthGuard';
import { LoginForm } from './components/auth/LoginForm';
import { Composer } from './components/v0/Composer';
import { EnhancedPostCard } from './components/v0/EnhancedPostCard';
import { Header } from './components/v0/Header';
import { RightPanel } from './components/v0/RightPanel';
import { Sidebar } from './components/v0/Sidebar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AvatarProvider, useAvatar } from './contexts/AvatarContext';
import { feedService } from './services/feedService';

// Login Page Component
function LoginPage() {
  return <LoginForm />;
}

// Main App Layout (Protected)
function MainApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Educational Disclaimer Banner */}
      <div className="bg-yellow-100 px-4 py-2 text-center">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Educational Parody:</strong> All content is fictional satire for scam awareness education. 
          <span className="ml-2 text-xs">Learn to recognize these common scam tactics!</span>
        </p>
      </div>
      <Header user={user} onLogout={logout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 pt-20 pb-4">
          <div className="max-w-2xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Navigate to="/" replace />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/chat" element={<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/celebrities" element={<CelebrityImageManager />} />
            </Routes>
          </div>
        </main>
        <RightPanel />
      </div>
      <StatusIndicator />
      <IndianSalesWidget />
    </div>
  );
}

// Home Component - Now displays the social feed (Facebook-style)
function Home() {
  const { generateRandomAvatar } = useAvatar();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load posts from feed service
  const loadPosts = React.useCallback(() => {
    const celebrityPosts = feedService.getPosts();
    setPosts(celebrityPosts);
  }, []);

  React.useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Listen for storage changes to refresh posts
  React.useEffect(() => {
    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom post events
    window.addEventListener('postCreated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('postCreated', handleStorageChange);
    };
  }, [loadPosts]);

  const loadMorePosts = () => {
    setIsLoading(true);
    try {
      const newPosts = feedService.generateMorePosts(5);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stories Section */}
      <Stories />
      
      <Composer />

      {/* Celebrity Feed Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">🚀 Social Feed</h2>
            <p className="text-gray-600 text-sm">Real posts from interesting people with authentic vibes</p>
          </div>
          <div className="text-sm text-[#1877f2] font-medium">
            {posts.length} posts loaded
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1877f2] mx-auto mb-4" />
            <p className="text-gray-600">Loading celebrity posts...</p>
          </div>
        ) : (
           posts.map(post => (
             <EnhancedPostCard key={post.id} post={post} />
           ))
        )}
      </div>

      {/* Load More Button */}
      {posts.length > 0 && (
        <div className="text-center">
          <button
            type="button"
            onClick={loadMorePosts}
            disabled={isLoading}
            className="bg-[#1877f2] hover:bg-[#166fe5] disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Loading more posts...</span>
              </div>
            ) : (
              'Load More Posts 🚀'
            )}
          </button>
        </div>
      )}
    </div>
  );
}



// Chat Component
function Chat({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const { getCurrentUserAvatar } = useAvatar();
  const { user, isLoading } = useAuth();

  // Mock contacts for the messenger
  const contacts = [
    { id: 1, name: "Sarah Johnson", avatar: "/profile-pics/download (1).jpeg", lastMessage: "Hey, how are you?", timestamp: "2m", online: true },
    { id: 2, name: "Mike Chen", avatar: "/profile-pics/Amir.jpeg", lastMessage: "Thanks for the post!", timestamp: "15m", online: false },
    { id: 3, name: "Emma Wilson", avatar: "/profile-pics/download (2).jpeg", lastMessage: "See you tomorrow!", timestamp: "1h", online: true },
    { id: 4, name: "Alex Rodriguez", avatar: "/profile-pics/download (3).jpeg", lastMessage: "That's awesome!", timestamp: "3h", online: false },
    { id: 5, name: "Lisa Park", avatar: "/profile-pics/download (4).jpeg", lastMessage: "Great idea!", timestamp: "5h", online: true }
  ];

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading messenger...</p>
        </div>
      </div>
    );
  }

  // ✅ No user state
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to use messenger.</p>
      </div>
    );
  }

  const sendMessage = () => {
    if (!input.trim() || !selectedContact) return;

    const userMessage = {
      id: Date.now(),
      content: input,
      sender: user.id,
      senderName: user.name,
      receiver: selectedContact.id,
      receiverName: selectedContact.name,
      timestamp: new Date().toLocaleTimeString(),
      avatar: getCurrentUserAvatar()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Contacts Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Messenger</h2>
              <p className="text-sm text-gray-600 mt-1">Chat with your friends</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/default-avatar.jpg';
                        }}
                      />
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = '/default-avatar.jpg';
                        }}
                      />
                      {selectedContact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedContact.online ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Start a conversation with {selectedContact.name}!</p>
                    </div>
                  ) : (
                    chatHistory
                      .filter(msg => (msg.sender === user.id && msg.receiver === selectedContact.id) || 
                                    (msg.receiver === user.id && msg.sender === selectedContact.id))
                      .map(message => (
                        <div key={message.id} className={`flex ${message.sender === user.id ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === user.id
                              ? 'bg-[#1877f2] text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.sender === user.id ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder={`Message ${selectedContact.name}...`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] bg-white text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      className="px-6 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Messenger</h3>
                  <p className="text-gray-600">Select a contact to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Component - Facebook Style
function Profile() {
  const { user, isLoading } = useAuth();
  const { getCurrentUserAvatar } = useAvatar();
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ No user state
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  // ✅ Safe to access user properties with fallbacks
  const userName = user.name || 'Anonymous User';
  const userIdentity = user.identity || 'New Member';
  const userAka = user.aka || '';

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Profile Content - Full Width, Centered */}
      <div className="max-w-7xl mx-auto">
        {/* Cover Photo Section - Full Screen Width */}
        <div className="relative bg-gray-300 h-64 w-screen">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <button
            onClick={() => setIsEditingCover(true)}
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Change cover photo</span>
            </div>
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="relative bg-white border-b border-gray-200 pb-4">
          <div className="px-4">
            <div className="flex items-end space-x-8">
              {/* Profile Picture */}
              <div className="relative -mt-20">
                <div className="relative inline-block">
                  <img
                    src={getCurrentUserAvatar()}
                    alt={userName}
                    className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

               {/* Name and Info */}
               <div className="flex-1">
                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{userName}</h1>
                 {userAka && <p className="text-gray-600 text-lg mb-2">AKA {userAka}</p>}
                 <p className="text-gray-500 text-sm mb-4">0 friends</p>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Add to story
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors">
                    Edit profile
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-3 py-2 rounded-lg font-medium transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4">
            <nav className="flex space-x-8">
               {[
                 { id: 'posts', label: 'Posts' },
                 { id: 'about', label: 'About' },
                 { id: 'friends', label: 'Friends' },
                 { id: 'photos', label: 'Photos' },
                 { id: 'videos', label: 'Videos' },
                 { id: 'more', label: 'More' }
               ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-3 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Main Content Area - Centered and Wider */}
              {/* Create Post */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={getCurrentUserAvatar()}
                    alt={userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3 text-left text-gray-500 transition-colors">
                    What's on your mind?
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Live video</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>
                    </svg>
                    <span>Photo/video</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Feeling/activity</span>
                  </button>
                </div>
              </div>

            {/* Posts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-center py-8">No posts yet</p>
            </div>

            {/* Photos Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Photos</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">See all photos</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded hover:bg-gray-300 transition-colors cursor-pointer"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Facebook-style page components
function Watch() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📺 Watch</h2>
        <p className="text-gray-600 mb-4">Discover videos from creators and pages you follow.</p>
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700">Video content coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🛒 Marketplace</h2>
        <p className="text-gray-600 mb-4">Buy and sell items with people in your community.</p>
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700">Marketplace features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Groups() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Groups</h2>
        <p className="text-gray-600 mb-4">Connect with people who share your interests.</p>
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700">Groups functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Gaming() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎮 Gaming</h2>
        <p className="text-gray-600 mb-4">Play games and connect with gaming communities.</p>
        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700">Gaming features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AvatarProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={
              <AuthGuard>
                <MainApp />
              </AuthGuard>
            } />
          </Routes>
        </AvatarProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;