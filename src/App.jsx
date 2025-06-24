import React, { createContext, useContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '', identity: '' });
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidUser, setHasValidUser] = useState(false);

  const userValue = useMemo(() => ({ user, setUser }), [user]);

  // Check for user persona and redirect if needed
  React.useEffect(() => {
    const checkUserPersona = () => {
      console.log('🔍 Checking for user persona...');
      const userData = localStorage.getItem('facecrook_user');
      const authFlag = localStorage.getItem('facecrook_auth');

      if (!userData || !authFlag) {
        console.log('🔒 No user persona found, showing normal app...');
        setIsLoading(false);
        setHasValidUser(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (!parsedUser.isLoggedIn || !parsedUser.name || !parsedUser.identity) {
          console.log('🔒 Invalid user data, showing normal app...');
          setIsLoading(false);
          setHasValidUser(false);
          return;
        }

        // Set user data in context
        setUser({ name: parsedUser.name, identity: parsedUser.identity });
        setHasValidUser(true);
        setIsLoading(false);
        console.log('🎉 Welcome back,', parsedUser.name, '(' + parsedUser.identity + ')!');
      } catch (error) {
        console.log('🔒 Error parsing user data, showing normal app...');
        setIsLoading(false);
        setHasValidUser(false);
      }
    };

    checkUserPersona();
  }, []);

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Facecrook...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AvatarProvider>
        <UserContext.Provider value={userValue}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 px-4 pt-20 pb-4">
                <div className="max-w-2xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/chat" element={<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </main>
              <RightPanel />
            </div>
            <StatusIndicator />
          </div>
        </UserContext.Provider>
      </AvatarProvider>
    </ErrorBoundary>
  );
}

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [identity, setIdentity] = useState(user.identity);
  const { getCurrentUserAvatar } = useAvatar();

  const userAvatar = getCurrentUserAvatar();

  const handleSubmit = e => {
    e.preventDefault();
    if (name && identity) setUser({ name, identity });
  };

  return user.name ? (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
        <div className="flex justify-center mb-4">
          <AvatarDisplay
            avatar={userAvatar}
            size="xl"
            className="border-4 border-green-500"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Facecrook, {user.name}! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Identity: <span className="font-semibold text-green-600 dark:text-green-400">{user.identity}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ready to share your thoughts with the world? Head to the Feed to start posting!
        </p>
      </div>
      <Composer />
    </div>
  ) : (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Facecrook! 🚀
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create your satirical crypto persona and join the fun!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Crypto Wizard"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="identity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Satirical Identity
            </label>
            <input
              id="identity"
              type="text"
              placeholder="e.g., Meme Coin Enthusiast"
              value={identity}
              onChange={e => setIdentity(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Enter the Crookiverse 🎭
        </button>
      </form>
    </div>
  );
}

function Feed() {
  const { generateRandomAvatar } = useAvatar();

  const [posts, setPosts] = useState([
    {
      id: "1",
      displayName: 'Satoshi Spoof',
      content: 'Just minted a PepeCoin! 🚀 This is going to revolutionize the meme economy!',
      likes: 42,
      comments: 8,
      shares: 3,
      timestamp: '2h',
      avatar: generateRandomAvatar()
    },
    {
      id: "2",
      displayName: 'Elon Parody',
      content: 'Dogecoin to the moon! 🐕 Much wow, very crypto, such gains!',
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: '4h',
      avatar: generateRandomAvatar()
    },
    {
      id: "3",
      displayName: 'Crypto Karen',
      content: 'Can someone explain why my NFT of a rock is worth more than my car? Asking for a friend... 🪨💎',
      likes: 89,
      comments: 34,
      shares: 7,
      timestamp: '6h',
      avatar: generateRandomAvatar()
    }
  ]);

  return (
    <div className="space-y-6">
      <Composer />
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function Chat({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const { getAvatarById, getCurrentUserAvatar } = useAvatar();

  const trumpAvatar = getAvatarById('ai-trump');
  const userAvatar = getCurrentUserAvatar();

  const trumpReplies = [
    "🇺🇸 Let me tell you, that's tremendous!",
    "📰 Fake news! But I love your energy.",
    "🚀 We're going to make posting great again!",
    "💯 That's huge, believe me. HUGE!",
    "🧠 I know more about social media than anyone.",
    "✨ Beautiful, just beautiful. The best!",
    "❌ Wrong! But keep trying, you'll get there."
  ];

  const sendMessage = () => {
    if (!input) return;
    const userMsg = { id: Date.now(), sender: 'You', text: input };
    setChatHistory([...chatHistory, userMsg]);
    setInput('');
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'AI Trump',
        text: trumpReplies[Math.floor(Math.random() * trumpReplies.length)]
      };
      setChatHistory(history => [...history, reply]);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          🤖 Chat with AI Trump
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ask anything and get a Trump-style response!
        </p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>👋 Start a conversation with AI Trump!</p>
            <p className="text-sm mt-2">Try asking about social media, politics, or anything else...</p>
          </div>
        ) : (
          chatHistory.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'} items-end space-x-2`}>
              {msg.sender !== 'You' && (
                <AvatarDisplay
                  avatar={trumpAvatar}
                  size="sm"
                  className="mb-1"
                />
              )}
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'You'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                <p className="text-xs font-medium mb-1 opacity-75">
                  {msg.sender}
                </p>
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.sender === 'You' && (
                <AvatarDisplay
                  avatar={userAvatar}
                  size="sm"
                  className="mb-1"
                />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Trump anything..."
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [identity, setIdentity] = useState(user.identity);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);

  const { getCurrentUserAvatar, saveCurrentUserAvatar } = useAvatar();
  const currentAvatar = getCurrentUserAvatar();

  const handleSave = () => {
    setUser({ name, identity });
    setEditMode(false);
  };

  const handleAvatarSave = (avatarConfig) => {
    saveCurrentUserAvatar(avatarConfig);
    setShowAvatarCreator(false);
  };

  if (showAvatarCreator) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🎨 Avatar Creator
          </h1>
          <button
            type="button"
            onClick={() => setShowAvatarCreator(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Profile
          </button>
        </div>
        <AvatarCreator
          onSave={handleAvatarSave}
          initialAvatar={currentAvatar}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <AvatarDisplay
              avatar={currentAvatar}
              size="2xl"
              className="border-4 border-green-500"
            />
            <button
              type="button"
              onClick={() => setShowAvatarCreator(true)}
              className="absolute -bottom-2 -right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full text-sm transition-colors"
              title="Edit Avatar"
            >
              ✏️
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {user.name || 'Anonymous User'}
            </h2>
            <p className="text-lg text-green-600 dark:text-green-400 mb-2">
              {user.identity || 'No identity set'}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome to your Facecrook profile! Customize your avatar and manage your settings.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setShowAvatarCreator(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>🎨</span>
            <span>Customize Avatar</span>
          </button>
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>✏️</span>
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📝 Profile Information
        </h3>

        {editMode ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name
              </label>
              <input
                id="profile-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your display name"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="profile-identity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Satirical Identity
              </label>
              <input
                id="profile-identity"
                value={identity}
                onChange={e => setIdentity(e.target.value)}
                placeholder="e.g., Crypto Enthusiast, Meme Lord, etc."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                💾 Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setName(user.name);
                  setIdentity(user.identity);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Display Name</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name || 'Not set'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Satirical Identity</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {user.identity || 'Not set'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Avatar Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎭 Avatar Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Face</p>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">{currentAvatar.face}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Hair</p>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">{currentAvatar.hair}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Eyes</p>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">{currentAvatar.eyes}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Accessory</p>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">{currentAvatar.accessories}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
            <p className="font-semibold text-gray-900 dark:text-white capitalize">{currentAvatar.color}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;