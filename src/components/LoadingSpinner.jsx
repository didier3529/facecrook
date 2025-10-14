import React from 'react';

export function LoadingSpinner({ message = 'Loading...', size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="text-center">
                <div className={`animate-spin rounded-full border-b-2 border-green-600 mx-auto mb-4 ${sizeClasses[size] || sizeClasses.md}`} />
                <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>
        </div>
    );
}

export function FullPageLoading({ message = 'Loading...' }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <LoadingSpinner message={message} size="lg" />
        </div>
    );
} 