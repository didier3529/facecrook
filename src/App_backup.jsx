import React, { createContext, useContext, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState({ name: '', identity: '' });

    const userValue = useMemo(() => ({ user, setUser }), [user]);

    return (
        <UserContext.Provider value={userValue}>
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white border-b border-gray-200 p-4">
                    <h1 className="text-2xl font-bold text-green-600">Facecrook</h1>
                </header>
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
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
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Facecrook, {user.name}! 🎉
            </h2>
            <p className="text-gray-600">
                Identity: <span className="font-semibold text-green-600">{user.identity}</span>
            </p>
        </div>
    ) : (
        <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome to Facecrook! 🚀
                </h2>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    placeholder="Your identity"
                    value={identity}
                    onChange={e => setIdentity(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                    Enter the Crookiverse 🎭
                </button>
            </form>
        </div>
    );
}

export default App; 