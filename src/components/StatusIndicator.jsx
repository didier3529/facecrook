import React from 'react';

export function StatusIndicator() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">App Running ✅</span>
            </div>
        </div>
    );
} 