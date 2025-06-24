import { RotateCcw, Save, Shuffle } from 'lucide-react';
import React, { useState } from 'react';

const avatarOptions = {
    face: [
        { id: 'round', name: 'Round', emoji: '😊' },
        { id: 'square', name: 'Square', emoji: '😎' },
        { id: 'oval', name: 'Oval', emoji: '🙂' },
        { id: 'heart', name: 'Heart', emoji: '😍' }
    ],
    hair: [
        { id: 'short', name: 'Short', emoji: '👨‍🦱' },
        { id: 'long', name: 'Long', emoji: '👩‍🦰' },
        { id: 'curly', name: 'Curly', emoji: '👨‍🦲' },
        { id: 'bald', name: 'Bald', emoji: '👨‍🦲' },
        { id: 'mohawk', name: 'Mohawk', emoji: '🤘' }
    ],
    eyes: [
        { id: 'normal', name: 'Normal', emoji: '👀' },
        { id: 'wink', name: 'Wink', emoji: '😉' },
        { id: 'sleepy', name: 'Sleepy', emoji: '😴' },
        { id: 'star', name: 'Star Eyes', emoji: '🤩' }
    ],
    accessories: [
        { id: 'none', name: 'None', emoji: '😐' },
        { id: 'glasses', name: 'Glasses', emoji: '🤓' },
        { id: 'sunglasses', name: 'Sunglasses', emoji: '😎' },
        { id: 'hat', name: 'Hat', emoji: '🎩' },
        { id: 'crown', name: 'Crown', emoji: '👑' }
    ],
    colors: [
        { id: 'yellow', name: 'Yellow', color: '#FCD34D' },
        { id: 'brown', name: 'Brown', color: '#92400E' },
        { id: 'pink', name: 'Pink', color: '#EC4899' },
        { id: 'blue', name: 'Blue', color: '#3B82F6' },
        { id: 'green', name: 'Green', color: '#10B981' },
        { id: 'purple', name: 'Purple', color: '#8B5CF6' }
    ]
};

export function AvatarCreator({ onSave, initialAvatar = null }) {
    const [avatar, setAvatar] = useState({
        face: 'round',
        hair: 'short',
        eyes: 'normal',
        accessories: 'none',
        color: 'yellow',
        ...initialAvatar
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const updateAvatar = (category, value) => {
        setAvatar(prev => ({ ...prev, [category]: value }));
    };

    const randomizeAvatar = () => {
        setIsGenerating(true);

        // Simulate generation animation
        setTimeout(() => {
            const randomAvatar = {
                face: avatarOptions.face[Math.floor(Math.random() * avatarOptions.face.length)].id,
                hair: avatarOptions.hair[Math.floor(Math.random() * avatarOptions.hair.length)].id,
                eyes: avatarOptions.eyes[Math.floor(Math.random() * avatarOptions.eyes.length)].id,
                accessories: avatarOptions.accessories[Math.floor(Math.random() * avatarOptions.accessories.length)].id,
                color: avatarOptions.colors[Math.floor(Math.random() * avatarOptions.colors.length)].id
            };
            setAvatar(randomAvatar);
            setIsGenerating(false);
        }, 1000);
    };

    const resetAvatar = () => {
        setAvatar({
            face: 'round',
            hair: 'short',
            eyes: 'normal',
            accessories: 'none',
            color: 'yellow'
        });
    };

    const generateAvatarDisplay = () => {
        const faceEmoji = avatarOptions.face.find(f => f.id === avatar.face)?.emoji || '😊';
        const hairEmoji = avatarOptions.hair.find(h => h.id === avatar.hair)?.emoji || '👨‍🦱';
        const eyesEmoji = avatarOptions.eyes.find(e => e.id === avatar.eyes)?.emoji || '👀';
        const accessoryEmoji = avatarOptions.accessories.find(a => a.id === avatar.accessories)?.emoji || '';
        const color = avatarOptions.colors.find(c => c.id === avatar.color)?.color || '#FCD34D';

        return (
            <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-6xl border-4 border-gray-200 dark:border-gray-600 transition-all duration-300"
                style={{ backgroundColor: color }}
            >
                <div className="relative">
                    {faceEmoji}
                    {avatar.accessories !== 'none' && (
                        <div className="absolute -top-2 -right-2 text-2xl">
                            {accessoryEmoji}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    🎨 Create Your Avatar
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Customize your unique Facecrook persona!
                </p>
            </div>

            {/* Avatar Preview */}
            <div className="flex justify-center mb-8">
                <div className={`transition-transform duration-500 ${isGenerating ? 'animate-spin' : ''}`}>
                    {generateAvatarDisplay()}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center space-x-3 mb-8">
                <button
                    type="button"
                    onClick={randomizeAvatar}
                    disabled={isGenerating}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Shuffle className="w-4 h-4" />
                    <span>{isGenerating ? 'Generating...' : 'Random'}</span>
                </button>

                <button
                    type="button"
                    onClick={resetAvatar}
                    className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                </button>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
                {Object.entries(avatarOptions).map(([category, options]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">
                            {category}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => updateAvatar(category, option.id)}
                                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${avatar[category] === option.id
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <div className="text-center">
                                        {category === 'colors' ? (
                                            <div
                                                className="w-8 h-8 rounded-full mx-auto mb-1 border-2 border-gray-300"
                                                style={{ backgroundColor: option.color }}
                                            />
                                        ) : (
                                            <div className="text-2xl mb-1">{option.emoji}</div>
                                        )}
                                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                            {option.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={() => onSave(avatar)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
                >
                    <Save className="w-5 h-5" />
                    <span>Save Avatar</span>
                </button>
            </div>

            {/* Avatar Data Preview */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Avatar Configuration:
                </h4>
                <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                    {JSON.stringify(avatar, null, 2)}
                </pre>
            </div>
        </div>
    );
} 