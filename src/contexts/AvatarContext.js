import React, { createContext, useContext, useEffect, useState } from 'react';

const AvatarContext = createContext();

export const useAvatar = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error('useAvatar must be used within an AvatarProvider');
    }
    return context;
};

// Default avatars for demo users
const defaultAvatars = {
    'current-user': {
        face: 'round',
        hair: 'short',
        eyes: 'normal',
        accessories: 'none',
        color: 'green'
    },
    'ai-trump': {
        face: 'square',
        hair: 'short',
        eyes: 'normal',
        accessories: 'none',
        color: 'yellow'
    },
    'demo-user-1': {
        face: 'oval',
        hair: 'long',
        eyes: 'wink',
        accessories: 'glasses',
        color: 'pink'
    },
    'demo-user-2': {
        face: 'heart',
        hair: 'curly',
        eyes: 'star',
        accessories: 'crown',
        color: 'purple'
    },
    'demo-user-3': {
        face: 'round',
        hair: 'mohawk',
        eyes: 'normal',
        accessories: 'sunglasses',
        color: 'blue'
    }
};

export const AvatarProvider = ({ children }) => {
    const [avatars, setAvatars] = useState(defaultAvatars);
    const [currentUserId] = useState('current-user'); // In a real app, this would come from auth

    // Load avatars from localStorage on mount
    useEffect(() => {
        try {
            const savedAvatars = localStorage.getItem('facecrook-avatars');
            if (savedAvatars) {
                const parsed = JSON.parse(savedAvatars);
                setAvatars(prev => ({ ...prev, ...parsed }));
            }
        } catch (error) {
            console.error('Error loading avatars from localStorage:', error);
        }
    }, []);

    // Save avatars to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('facecrook-avatars', JSON.stringify(avatars));
        } catch (error) {
            console.error('Error saving avatars to localStorage:', error);
        }
    }, [avatars]);

    const updateAvatar = (userId, avatarConfig) => {
        setAvatars(prev => ({
            ...prev,
            [userId]: avatarConfig
        }));
    };

    const getCurrentUserAvatar = () => {
        return avatars[currentUserId] || defaultAvatars['current-user'];
    };

    const getAvatarById = (userId) => {
        return avatars[userId] || defaultAvatars['current-user'];
    };

    const saveCurrentUserAvatar = (avatarConfig) => {
        updateAvatar(currentUserId, avatarConfig);
    };

    // Generate random avatars for demo posts
    const generateRandomAvatar = () => {
        const faces = ['round', 'square', 'oval', 'heart'];
        const hairs = ['short', 'long', 'curly', 'bald', 'mohawk'];
        const eyes = ['normal', 'wink', 'sleepy', 'star'];
        const accessories = ['none', 'glasses', 'sunglasses', 'hat', 'crown'];
        const colors = ['yellow', 'brown', 'pink', 'blue', 'green', 'purple'];

        return {
            face: faces[Math.floor(Math.random() * faces.length)],
            hair: hairs[Math.floor(Math.random() * hairs.length)],
            eyes: eyes[Math.floor(Math.random() * eyes.length)],
            accessories: accessories[Math.floor(Math.random() * accessories.length)],
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    };

    // Get demo users with avatars
    const getDemoUsers = () => {
        return [
            {
                id: 'demo-user-1',
                name: 'Sarah Johnson',
                avatar: avatars['demo-user-1'],
                subtitle: 'Software Engineer'
            },
            {
                id: 'demo-user-2',
                name: 'Mike Chen',
                avatar: avatars['demo-user-2'],
                subtitle: 'Designer'
            },
            {
                id: 'demo-user-3',
                name: 'Alex Rivera',
                avatar: avatars['demo-user-3'],
                subtitle: 'Product Manager'
            },
            {
                id: 'demo-user-4',
                name: 'Emma Davis',
                avatar: generateRandomAvatar(),
                subtitle: 'Marketing'
            },
            {
                id: 'demo-user-5',
                name: 'James Wilson',
                avatar: generateRandomAvatar(),
                subtitle: 'Developer'
            }
        ];
    };

    const value = {
        avatars,
        currentUserId,
        updateAvatar,
        getCurrentUserAvatar,
        getAvatarById,
        saveCurrentUserAvatar,
        generateRandomAvatar,
        getDemoUsers
    };

    return (
        <AvatarContext.Provider value={value}>
            {children}
        </AvatarContext.Provider>
    );
}; 