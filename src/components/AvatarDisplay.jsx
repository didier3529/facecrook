import React from 'react';

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

export function AvatarDisplay({
    avatar,
    size = 'md',
    className = '',
    showBorder = true,
    clickable = false,
    onClick = null
}) {
    // Default avatar if none provided
    const defaultAvatar = {
        face: 'round',
        hair: 'short',
        eyes: 'normal',
        accessories: 'none',
        color: 'yellow'
    };

    const avatarConfig = { ...defaultAvatar, ...avatar };

    // Size configurations
    const sizeClasses = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-lg',
        lg: 'w-16 h-16 text-2xl',
        xl: 'w-24 h-24 text-4xl',
        '2xl': 'w-32 h-32 text-6xl'
    };

    const accessorySizes = {
        xs: 'text-xs -top-0.5 -right-0.5',
        sm: 'text-xs -top-1 -right-1',
        md: 'text-sm -top-1 -right-1',
        lg: 'text-lg -top-2 -right-2',
        xl: 'text-2xl -top-2 -right-2',
        '2xl': 'text-2xl -top-2 -right-2'
    };

    const generateAvatarDisplay = () => {
        const faceEmoji = avatarOptions.face.find(f => f.id === avatarConfig.face)?.emoji || '😊';
        const accessoryEmoji = avatarOptions.accessories.find(a => a.id === avatarConfig.accessories)?.emoji || '';
        const color = avatarOptions.colors.find(c => c.id === avatarConfig.color)?.color || '#FCD34D';

        const borderClass = showBorder ? 'border-2 border-gray-200 dark:border-gray-600' : '';
        const cursorClass = clickable ? 'cursor-pointer hover:scale-105' : '';
        const sizeClass = sizeClasses[size] || sizeClasses.md;

        const handleKeyDown = (e) => {
            if (clickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onClick?.(e);
            }
        };

        const handleClick = (e) => {
            if (clickable) {
                onClick?.(e);
            }
        };

        if (clickable) {
            return (
                <button
                    type="button"
                    className={`${sizeClass} rounded-full flex items-center justify-center ${borderClass} ${cursorClass} transition-all duration-200 ${className}`}
                    style={{ backgroundColor: color }}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    aria-label="Avatar button"
                >
                    <div className="relative">
                        {faceEmoji}
                        {avatarConfig.accessories !== 'none' && accessoryEmoji && (
                            <div className={`absolute ${accessorySizes[size] || accessorySizes.md}`}>
                                {accessoryEmoji}
                            </div>
                        )}
                    </div>
                </button>
            );
        }

        return (
            <div
                className={`${sizeClass} rounded-full flex items-center justify-center ${borderClass} transition-all duration-200 ${className}`}
                style={{ backgroundColor: color }}
                role="img"
                aria-label="User avatar"
            >
                <div className="relative">
                    {faceEmoji}
                    {avatarConfig.accessories !== 'none' && accessoryEmoji && (
                        <div className={`absolute ${accessorySizes[size] || accessorySizes.md}`}>
                            {accessoryEmoji}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return generateAvatarDisplay();
}

// Avatar with name component
export function AvatarWithName({
    avatar,
    name,
    subtitle = null,
    size = 'md',
    layout = 'horizontal',
    className = '',
    clickable = false,
    onClick = null
}) {
    const layoutClasses = {
        horizontal: 'flex items-center space-x-3',
        vertical: 'flex flex-col items-center space-y-2'
    };

    const textSizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl'
    };

    const handleKeyDown = (e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(e);
        }
    };

    const handleClick = (e) => {
        if (clickable) {
            onClick?.(e);
        }
    };

    if (clickable) {
        return (
            <button
                type="button"
                className={`${layoutClasses[layout]} ${className}`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                aria-label={`${name} profile`}
            >
                <AvatarDisplay
                    avatar={avatar}
                    size={size}
                    clickable={false}
                />
                <div className={layout === 'vertical' ? 'text-center' : ''}>
                    <div className={`font-medium text-gray-900 dark:text-white ${textSizes[size] || textSizes.md}`}>
                        {name}
                    </div>
                    {subtitle && (
                        <div className={`text-gray-500 dark:text-gray-400 ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>
                            {subtitle}
                        </div>
                    )}
                </div>
            </button>
        );
    }

    return (
        <div className={`${layoutClasses[layout]} ${className}`}>
            <AvatarDisplay
                avatar={avatar}
                size={size}
                clickable={false}
            />
            <div className={layout === 'vertical' ? 'text-center' : ''}>
                <div className={`font-medium text-gray-900 dark:text-white ${textSizes[size] || textSizes.md}`}>
                    {name}
                </div>
                {subtitle && (
                    <div className={`text-gray-500 dark:text-gray-400 ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
}

// Avatar group component for showing multiple avatars
export function AvatarGroup({ avatars, maxDisplay = 3, size = 'sm', className = '' }) {
    const displayAvatars = avatars.slice(0, maxDisplay);
    const remainingCount = Math.max(0, avatars.length - maxDisplay);

    const sizeClasses = {
        xs: 'w-4 h-4 text-xs -ml-1',
        sm: 'w-6 h-6 text-xs -ml-2',
        md: 'w-8 h-8 text-sm -ml-2',
        lg: 'w-10 h-10 text-base -ml-3'
    };

    return (
        <div className={`flex items-center ${className}`}>
            {displayAvatars.map((avatar) => (
                <div key={`${avatar.face}-${avatar.hair}-${avatar.color}`} className={sizeClasses[size] || sizeClasses.sm}>
                    <AvatarDisplay
                        avatar={avatar}
                        size={size}
                        className="ring-2 ring-white dark:ring-gray-800"
                    />
                </div>
            ))}
            {remainingCount > 0 && (
                <div
                    className={`${sizeClasses[size] || sizeClasses.sm} rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium ring-2 ring-white dark:ring-gray-800`}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
} 