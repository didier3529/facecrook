import React, { createContext, useContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '', identity: '' });
  const [chatHistory, setChatHistory] = useState([]);

  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
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
      </div>
    </UserContext.Provider>
  );
}

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [identity, setIdentity] = useState(user.identity);

  const handleSubmit = e => {
    e.preventDefault();
    if (name && identity) setUser({ name, identity });
  };

  return user.name ? (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g., Crypto Wizard"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Satirical Identity
            </label>
            <input
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
  const [posts, setPosts] = useState([
    {
      id: "1",
      displayName: 'Satoshi Spoof',
      content: 'Just minted a PepeCoin! 🚀 This is going to revolutionize the meme economy!',
      likes: 42,
      comments: 8,
      shares: 3,
      timestamp: '2h',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: "2",
      displayName: 'Elon Parody',
      content: 'Dogecoin to the moon! 🐕 Much wow, very crypto, such gains!',
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: '4h',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: "3",
      displayName: 'Crypto Karen',
      content: 'Can someone explain why my NFT of a rock is worth more than my car? Asking for a friend... 🪨💎',
      likes: 89,
      comments: 34,
      shares: 7,
      timestamp: '6h',
      avatar: '/placeholder-user.jpg'
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
            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'You'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                <p className="text-xs font-medium mb-1 opacity-75">
                  {msg.sender}
                </p>
                <p className="text-sm">{msg.text}</p>
              </div>
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

  const handleSave = () => {
    setUser({ name, identity });
    setEditMode(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="/placeholder-user.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-green-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            👤 Profile Settings
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your Facecrook persona
          </p>
        </div>
      </div>

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Display Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Satirical Identity
            </label>
            <input
              value={identity}
              onChange={e => setIdentity(e.target.value)}
              placeholder="Identity"
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
              onClick={() => setEditMode(false)}
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

          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            ✏️ Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default App;