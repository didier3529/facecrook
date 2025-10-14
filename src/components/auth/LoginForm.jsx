import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function LoginForm() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        identity: '',
        aka: '',
        profilePicture: null,
        isSignup: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profilePicture: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await login({
                name: formData.name,
                password: formData.password,
                email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@facecrook.com`,
                identity: formData.identity || 'Member',
                aka: formData.aka || '',
                profilePicture: formData.profilePicture ? profilePreview : null,
                isSignup: formData.isSignup
            });

            if (result.success) {
                navigate('/', { replace: true });
            } else {
                alert(result.error || 'Authentication failed');
            }
        } catch (error) {
            alert(error.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (isLoading) return 'Creating account...';
        if (formData.isSignup) return 'Sign Up';
        return 'Log In';
    };

    return (
        <div className="min-h-screen bg-[#1877f2] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-200 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#1877f2] mb-2">
                        FACECROOK
                    </h1>
                    <p className="text-gray-600">
                        {formData.isSignup
                            ? 'Create your profile and join the community!'
                            : 'Welcome back!'
                        }
                    </p>
                </div>

                {/* Profile Picture Upload */}
                {formData.isSignup && (
                    <div className="text-center mb-6">
                        <div className="relative inline-block">
                            {profilePreview ? (
                                <img
                                    src={profilePreview}
                                    alt="Profile preview"
                                    className="w-24 h-24 rounded-full border-4 border-[#1877f2] object-cover mx-auto"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {profilePreview ? 'Click to change photo' : 'Click to add profile photo'}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name field */}
                    <input
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                        required
                    />

                    {formData.isSignup && (
                        <>
                            <input
                                type="text"
                                placeholder="Bio or title (optional)"
                                value={formData.identity}
                                onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                            />
                            <input
                                type="text"
                                placeholder="AKA (Also Known As) - optional"
                                value={formData.aka}
                                onChange={(e) => setFormData({ ...formData, aka: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-[#1877f2] placeholder-gray-500 text-lg"
                            />
                        </>
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
                            ? 'Already have an account? Log in'
                            : "Don't have an account? Sign up"}
                    </button>
                </div>

                {formData.isSignup && (
                    <div className="text-xs text-gray-500 text-center mt-4">
                        By creating an account, you agree to our Terms and Privacy Policy.
                    </div>
                )}
            </div>
        </div>
    );
} 