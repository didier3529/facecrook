import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
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
                // Simple login - create default persona
                login({
                    email: formData.email,
                    name: formData.name || 'Crypto Veteran',
                    identity: 'Returning Trader'
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        Facecrook
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {formData.isSignup
                            ? 'Create your satirical crypto persona!'
                            : 'Welcome back to the crypto comedy show!'
                        }
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
                        required
                    />

                    {formData.isSignup && (
                        <>
                            <input
                                type="text"
                                placeholder="Satirical Name (e.g., Crypto Karen, Diamond Dave)"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Crypto Identity (e.g., Meme Coin Enthusiast, NFT Collector)"
                                value={formData.identity}
                                onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
                                required
                            />
                        </>
                    )}

                    <input
                        type="password"
                        placeholder="Password (any password works!)"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50"
                    >
                        {getButtonText()}
                    </button>
                </form>

                {/* Toggle */}
                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isSignup: !formData.isSignup })}
                        className="text-green-600 dark:text-green-400 hover:underline"
                    >
                        {formData.isSignup
                            ? 'Already have a persona? Log in'
                            : "Don&apos;t have a persona? Create one"}
                    </button>
                </div>

                {formData.isSignup && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                        🎭 Ready to join the satirical crypto universe? You&apos;ll start with 1000 tokens!
                    </div>
                )}
            </div>
        </div>
    );
} 