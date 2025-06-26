import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        identity: '',
        isSignup: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate some processing time
        setTimeout(() => {
            if (formData.isSignup) {
                // Create new persona
                login({
                    email: formData.email,
                    name: formData.name,
                    identity: formData.identity
                });
            } else {
                // Simple login - use the entered name
                login({
                    email: formData.email,
                    name: formData.name || 'Crypto Enthusiast',
                    identity: formData.identity || 'Returning Trader'
                });
            }

            setIsLoading(false);
            navigate('/', { replace: true });
        }, 1000);
    };

    const getButtonText = () => {
        if (isLoading) return 'Processing...';
        if (formData.isSignup) return 'Create My Crypto Persona 🚀';
        return 'Log In 🎭';
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg shadow-lg border border-[#3a3a3a] p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#42c767] mb-2">
                        Facecrook
                    </h1>
                    <p className="text-gray-300">
                        {formData.isSignup
                            ? 'Create your satirical crypto persona!'
                            : 'Welcome back to the crypto comedy show!'
                        }
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name field - now displayed prominently first */}
                    <input
                        type="text"
                        placeholder="Enter your satirical persona name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-[#3a3a3a] bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42c767] placeholder-gray-400"
                        required
                    />

                    <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-[#3a3a3a] bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42c767] placeholder-gray-400"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password (any password works for demo)"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-[#3a3a3a] bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42c767] placeholder-gray-400"
                        required
                    />

                    {formData.isSignup && (
                        <input
                            type="text"
                            placeholder="Crypto Identity (e.g., Meme Coin Enthusiast, NFT Collector)"
                            value={formData.identity}
                            onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                            className="w-full px-4 py-3 border border-[#3a3a3a] bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42c767] placeholder-gray-400"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#42c767] hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50 transition-colors"
                    >
                        {getButtonText()}
                    </button>
                </form>

                {/* Toggle */}
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isSignup: !formData.isSignup })}
                        className="text-[#42c767] hover:underline"
                    >
                        {formData.isSignup
                            ? 'Already have a persona? Log in'
                            : "Don&apos;t have a persona? Create one"}
                    </button>
                </div>

                {formData.isSignup && (
                    <div className="text-xs text-gray-400 text-center mt-4">
                        🎭 Ready to join the satirical crypto universe? You&apos;ll start with 1000 tokens!
                    </div>
                )}
            </div>
        </div>
    );
} 