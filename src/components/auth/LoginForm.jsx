import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
    const [formData, setFormData] = useState({
        name: '',
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
                    name: formData.name,
                    identity: formData.identity
                });
            } else {
                // Simple login - use the entered name
                login({
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
        <div className="min-h-screen bg-[#1877f2] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-200 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#1877f2] mb-2">
                        FaceCrook
                    </h1>
                    <p className="text-gray-600">
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
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password (any password works for demo)"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                        required
                    />

                    {formData.isSignup && (
                        <input
                            type="text"
                            placeholder="Crypto Identity (e.g., Meme Coin Enthusiast, NFT Collector)"
                            value={formData.identity}
                            onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1877f2] hover:bg-[#166fe5] text-white py-3 text-lg font-bold rounded-lg disabled:opacity-50 transition-colors shadow-md"
                    >
                        {getButtonText()}
                    </button>
                </form>

                {/* Toggle */}
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isSignup: !formData.isSignup })}
                        className="text-[#1877f2] hover:underline font-medium"
                    >
                        {formData.isSignup
                            ? 'Already have a persona? Log in'
                            : "Don&apos;t have a persona? Create one"}
                    </button>
                </div>

                {formData.isSignup && (
                    <div className="text-xs text-gray-500 text-center mt-4">
                        🎭 Ready to join the satirical crypto universe? You&apos;ll start with 1000 tokens!
                    </div>
                )}
            </div>
        </div>
    );
} 