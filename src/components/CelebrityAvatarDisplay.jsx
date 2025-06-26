import React, { useState } from 'react';
import { AvatarDisplay } from './AvatarDisplay';

// User image mapping with PNG format - using exact IDs from feedService
const userImageMap = {
    'donald-trump': '/celebrities/donald-trump.png',
    'melania-trump': '/celebrities/melania-trump.png',
    'elon-musk': '/celebrities/elon-musk.png',
    'sam-bankman-fried': '/celebrities/sam-bankman-fried.png',
    'do-kwon': '/celebrities/do-kwon.png',
    'justin-sun': '/celebrities/Justin Sun.png',
    'vitalik-buterin': '/celebrities/Vitalik Buterin.png',
    'faustin-archange-touadera': '/celebrities/faustin-archange-touadera.png',
    'javier-milei': '/celebrities/javier-milei.png',
    'changpeng-zhao': '/celebrities/changpeng-zhao.png'
};

// Personalized fallback avatars for each user - using exact IDs from feedService
const userFallbacks = {
    'donald-trump': { face: 'square', hair: 'short', eyes: 'normal', accessories: 'none', color: 'yellow' },
    'melania-trump': { face: 'oval', hair: 'long', eyes: 'normal', accessories: 'none', color: 'pink' },
    'elon-musk': { face: 'round', hair: 'short', eyes: 'star', accessories: 'none', color: 'purple' },
    'sam-bankman-fried': { face: 'round', hair: 'curly', eyes: 'normal', accessories: 'glasses', color: 'blue' },
    'do-kwon': { face: 'oval', hair: 'short', eyes: 'sleepy', accessories: 'none', color: 'brown' },
    'justin-sun': { face: 'round', hair: 'short', eyes: 'wink', accessories: 'none', color: 'yellow' },
    'vitalik-buterin': { face: 'round', hair: 'long', eyes: 'normal', accessories: 'none', color: 'purple' },
    'faustin-archange-touadera': { face: 'square', hair: 'bald', eyes: 'normal', accessories: 'none', color: 'brown' },
    'javier-milei': { face: 'heart', hair: 'mohawk', eyes: 'star', accessories: 'none', color: 'yellow' },
    'changpeng-zhao': { face: 'round', hair: 'short', eyes: 'normal', accessories: 'glasses', color: 'blue' }
};

export function CelebrityAvatarDisplay({
    celebrityId,
    size = 'md',
    className = '',
    showBorder = true
}) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
        '2xl': 'w-24 h-24'
    };

    const imageSrc = userImageMap[celebrityId];
    const fallbackAvatar = userFallbacks[celebrityId];

    // If no image exists or error occurred, show personalized fallback avatar
    if (!imageSrc || imageError) {
        return (
            <AvatarDisplay
                avatar={fallbackAvatar}
                size={size}
                className={className}
                showBorder={showBorder}
            />
        );
    }

    const borderClass = showBorder ? 'border-2 border-gray-300 dark:border-gray-600' : '';

    return (
        <div className={`${sizeClasses[size]} relative ${className}`}>
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
            )}
            <img
                src={imageSrc}
                alt={`${celebrityId} profile`}
                className={`w-full h-full object-cover rounded-full ${borderClass} ${imageLoaded ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
            />
        </div>
    );
} 