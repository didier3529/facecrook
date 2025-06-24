import React, { createContext, useContext, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '', identity: '' });
  const [chatHistory, setChatHistory] = useState([]);

  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      <div className="app">
        <nav className="navbar">
          <NavLink to="/" end className="navlink">🏠 Home</NavLink>
          <NavLink to="/feed" className="navlink">📰 Feed</NavLink>
          <NavLink to="/chat" className="navlink">💬 AI Trump</NavLink>
          <NavLink to="/profile" className="navlink">👤 Profile</NavLink>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
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
    <div className="home">
      <h2>Welcome, {user.name}</h2>
      <p>Identity: {user.identity}</p>
    </div>
  ) : (
    <form className="home-form" onSubmit={handleSubmit}>
      <h2>Create Your Fake Crypto Persona</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Spoof Identity" value={identity} onChange={e => setIdentity(e.target.value)} required />
      <button type="submit">Enter the Crookiverse</button>
    </form>
  );
}

function Feed() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Satoshi Spoof', content: 'Just minted a PepeCoin!', likes: 0 },
    { id: 2, author: 'Elon Parody', content: 'Dogecoin to the moon!', likes: 0 }
  ]);

  const likePost = id => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="feed">
      <h2>Satirical Social Feed</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.author}</h3>
          <p>{post.content}</p>
          <div className="post-actions">
            <button type="button" onClick={() => likePost(post.id)}>? {post.likes}</button>
            <button type="button">💬 Comment</button>
            <button type="button">📤 Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Chat({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const trumpReplies = [
    "? Let me tell you, that's tremendous!",
    "? Fake news! But I love your energy.",
    "? We're going to make posting great again!",
    "? That's huge, believe me. HUGE!",
    "? I know more about social media than anyone.",
    "? Beautiful, just beautiful. The best!",
    "? Wrong! But keep trying."
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
    <div className="chat">
      <h2>Chat with AI Trump</h2>
      <div className="chat-window">
        {chatHistory.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'user' : 'ai'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask Trump anything..." />
        <button type="button" onClick={sendMessage}>Send</button>
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
    <div className="profile">
      <h2>Profile Settings</h2>
      {editMode ? (
        <div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input value={identity} onChange={e => setIdentity(e.target.value)} placeholder="Identity" />
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Identity:</strong> {user.identity}</p>
          <button type="button" onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default App;