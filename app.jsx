import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

export const UserContext = createContext();
export const TokenContext = createContext();
export const NFTContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '', identity: '' });
  const [tokenBalance, setTokenBalance] = useState(1000);
  const [nfts, setNfts] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TokenContext.Provider value={{ tokenBalance, setTokenBalance }}>
        <NFTContext.Provider value={{ nfts, setNfts }}>
          <Router>
            <div className="app">
              <nav className="navbar">
                <NavLink to="/" end className="navlink">Home</NavLink>
                <NavLink to="/feed" className="navlink">Feed</NavLink>
                <NavLink to="/chat" className="navlink">Chat</NavLink>
                <NavLink to="/tokens" className="navlink">Tokens</NavLink>
                <NavLink to="/mint" className="navlink">Mint NFT</NavLink>
                <NavLink to="/store" className="navlink">Store</NavLink>
              </nav>
              <main className="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/chat" element={<Chat chatHistory={chatHistory} setChatHistory={setChatHistory} />} />
                  <Route path="/tokens" element={<Tokens />} />
                  <Route path="/mint" element={<Mint />} />
                  <Route path="/store" element={<Store />} />
                </Routes>
              </main>
            </div>
          </Router>
        </NFTContext.Provider>
      </TokenContext.Provider>
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
  const { tokenBalance, setTokenBalance } = useContext(TokenContext);
  const [posts, setPosts] = useState([
    { id: 1, author: 'Satoshi Spoof', content: 'Just minted a PepeCoin!', likes: 0, tips: 0 },
    { id: 2, author: 'Elon Parody', content: 'Dogecoin to the moon!', likes: 0, tips: 0 }
  ]);
  const tipAmount = 50;

  const likePost = id => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const tipPost = id => {
    if (tokenBalance >= tipAmount) {
      setTokenBalance(tokenBalance - tipAmount);
      setPosts(posts.map(p => p.id === id ? { ...p, tips: p.tips + tipAmount } : p));
    }
  };

  return (
    <div className="feed">
      <h2>Satirical Social Feed</h2>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.author}</h3>
          <p>{post.content}</p>
          <div className="post-actions">
            <button onClick={() => likePost(post.id)}>? {post.likes}</button>
            <button onClick={() => tipPost(post.id)}>? Tip {tipAmount} ({post.tips})</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Chat({ chatHistory, setChatHistory }) {
  const [input, setInput] = useState('');
  const aiReplies = [
    "? That's going to the moon!",
    "? AI detects massive hype.",
    "? Hold and prosper.",
    "? Too early to sell.",
    "? Chart looks pumpy."
  ];

  const sendMessage = () => {
    if (!input) return;
    const userMsg = { id: Date.now(), sender: 'You', text: input };
    setChatHistory([...chatHistory, userMsg]);
    setInput('');
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'AI CrookBot',
        text: aiReplies[Math.floor(Math.random() * aiReplies.length)]
      };
      setChatHistory(history => [...history, reply]);
    }, 1000);
  };

  return (
    <div className="chat">
      <h2>AI-Driven Character Chat</h2>
      <div className="chat-window">
        {chatHistory.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'You' ? 'user' : 'ai'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Say something crooky..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

function Tokens() {
  const { tokenBalance, setTokenBalance } = useContext(TokenContext);
  const earnAmount = 100;
  return (
    <div className="tokens">
      <h2>In-App Tokens</h2>
      <p>Balance: {tokenBalance}</p>
      <button onClick={() => setTokenBalance(tokenBalance + earnAmount)}>? Earn {earnAmount}</button>
    </div>
  );
}

function Mint() {
  const { tokenBalance, setTokenBalance } = useContext(TokenContext);
  const { nfts, setNfts } = useContext(NFTContext);
  const cost = 500;

  const mintNFT = () => {
    if (tokenBalance < cost) return;
    const newNft = { id: Date.now(), name: `MockNFT#${nfts.length + 1}` };
    setNfts([...nfts, newNft]);
    setTokenBalance(tokenBalance - cost);
  };

  return (
    <div className="mint">
      <h2>Mock NFT Minting</h2>
      <p>Cost: {cost} tokens</p>
      <button onClick={mintNFT} disabled={tokenBalance < cost}>Mint NFT</button>
      <div className="nft-list">
        {nfts.map(n => <div key={n.id} className="nft-item">{n.name}</div>)}
      </div>
    </div>
  );
}

function Store() {
  const { tokenBalance, setTokenBalance } = useContext(TokenContext);
  const items = [
    { id: 1, name: 'Premium Crook Badge', price: 300 },
    { id: 2, name: 'Exclusive Meme Pack', price: 200 },
    { id: 3, name: 'VIP Chat Access', price: 500 }
  ];
  const [purchases, setPurchases] = useState([]);

  const buyItem = item => {
    if (tokenBalance < item.price) return;
    setTokenBalance(tokenBalance - item.price);
    setPurchases([...purchases, item.name]);
  };

  return (
    <div className="store">
      <h2>Premium Store</h2>
      <p>Balance: {tokenBalance}</p>
      {items.map(item => (
        <div key={item.id} className="store-item">
          <span>{item.name} - {item.price}</span>
          <button onClick={() => buyItem(item)} disabled={tokenBalance < item.price}>Buy</button>
        </div>
      ))}
      {purchases.length > 0 && (
        <div className="purchases">
          <h3>Your Purchases</h3>
          <ul>{purchases.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default App;