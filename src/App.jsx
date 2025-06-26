import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CelebrityImageManager } from './components/admin/CelebrityImageManager';
import { AuthGuard } from './components/auth/AuthGuard';
import { LoginForm } from './components/auth/LoginForm';
import { AvatarCreator } from './components/AvatarCreator';
import { AvatarDisplay } from './components/AvatarDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import { StatusIndicator } from './components/StatusIndicator';
import { Composer } from './components/v0/Composer';
import { Header } from './components/v0/Header';
import { PostCard } from './components/v0/PostCard';
import { RightPanel } from './components/v0/RightPanel';
import { Sidebar } from './components/v0/Sidebar';
import { AvatarProvider, useAvatar } from './contexts/AvatarContext';
import { useAuth } from './hooks/useAuth';

// Login Page Component
function LoginPage() {
  return <LoginForm />;
}

// Main App Layout (Protected)
function MainApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
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
    </div>
  );
}

// Home Component - Now displays the social feed (Facebook-style)
function Home() {
  const { generateRandomAvatar } = useAvatar();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Import and initialize feed service
  React.useEffect(() => {
    const loadFeedService = async () => {
      try {
        const { feedService } = await import('./services/feedService');
        const celebrityPosts = feedService.getPosts();
        setPosts(celebrityPosts);
      } catch (error) {
        console.error('Error loading feed service:', error);
        // Fallback to demo posts
        setPosts([
          {
            id: "1",
            displayName: 'Satoshi Spoof',
            content: 'Just minted a PepeCoin! 🚀 This is going to revolutionize the meme economy!',
            likes: 42,
            comments: 8,
            shares: 3,
            timestamp: '2h',
            avatar: generateRandomAvatar()
          }
        ]);
      }
    };

    loadFeedService();
  }, [generateRandomAvatar]);

  const loadMorePosts = async () => {
    setIsLoading(true);
    try {
      const { feedService } = await import('./services/feedService');
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
      <Composer />

      {/* Celebrity Feed Header */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#3a3a3a] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">🚀 Social Feed</h2>
            <p className="text-gray-400 text-sm">Real posts from interesting people with authentic vibes</p>
          </div>
          <div className="text-sm text-[#1877f2]">
            {posts.length} posts loaded
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
            <p className="text-gray-300">Loading celebrity posts...</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
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
  const { getAvatarById, getCurrentUserAvatar } = useAvatar();
  const { user, isLoading } = useAuth();

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-300">Loading chat...</p>
        </div>
      </div>
    );
  }

  // ✅ No user state
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">Please log in to chat.</p>
      </div>
    );
  }

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      avatar: getCurrentUserAvatar()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI Trump response
    setTimeout(() => {
      const responses = [
        "That's a tremendous question, really tremendous. The best question I've ever heard about crypto, believe me.",
        "Listen, I know crypto better than anyone. I have the best crypto knowledge, really the best.",
        "DogeCoin? I love DogeCoin. Such good coin, much wow, as they say. Very smart people say that.",
        "NFTs are fantastic, really fantastic. I should mint my own NFTs. They'd be the best NFTs, tremendous.",
        "The market is rigged, totally rigged. But we're going to make crypto great again!"
      ];

      const aiResponse = {
        id: Date.now() + 1,
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        avatar: getAvatarById('trump')
      };

      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chat with AI Trump 🤖</h2>

        <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {chatHistory.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">Start a conversation with AI Trump!</p>
          ) : (
            chatHistory.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <AvatarDisplay avatar={message.avatar} size="sm" />
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask AI Trump about crypto..."
            aria-label="Ask AI Trump about crypto"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="button"
            onClick={sendMessage}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// Profile Component
function Profile() {
  const { user, isLoading } = useAuth();
  const { getCurrentUserAvatar } = useAvatar();
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ No user state
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  // ✅ Safe to access user properties with fallbacks
  const userName = user.name || 'Anonymous User';
  const userIdentity = user.identity || 'New Member';
  const tokenBalance = user.tokenBalance || 1000;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Crypto Persona</h2>

        <div className="flex items-center space-x-4 mb-6">
          <AvatarDisplay avatar={getCurrentUserAvatar()} size="xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</h3>
            <p className="text-gray-600 dark:text-gray-400">{userIdentity}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Token Balance: <span className="font-bold text-green-600">{tokenBalance}</span> 🪙
            </p>
          </div>
        </div>

        {isEditing ? (
          <AvatarCreator onSave={() => setIsEditing(false)} />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Customize Avatar
          </button>
        )}
      </div>
    </div>
  );
}

// Facebook-style page components
function Watch() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">📺 Watch</h2>
        <p className="text-gray-400 mb-4">Discover videos from creators and pages you follow.</p>
        <div className="bg-[#2a2a2a] p-8 rounded-lg">
          <p className="text-gray-300">Video content coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">🛒 Marketplace</h2>
        <p className="text-gray-400 mb-4">Buy and sell items with people in your community.</p>
        <div className="bg-[#2a2a2a] p-8 rounded-lg">
          <p className="text-gray-300">Marketplace features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Groups() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">👥 Groups</h2>
        <p className="text-gray-400 mb-4">Connect with people who share your interests.</p>
        <div className="bg-[#2a2a2a] p-8 rounded-lg">
          <p className="text-gray-300">Groups functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function Gaming() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg shadow-sm border border-[#3a3a3a] p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">🎮 Gaming</h2>
        <p className="text-gray-400 mb-4">Play games and connect with gaming communities.</p>
        <div className="bg-[#2a2a2a] p-8 rounded-lg">
          <p className="text-gray-300">Gaming features coming soon...</p>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;