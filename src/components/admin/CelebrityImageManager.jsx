import { AlertCircle, Check, User } from 'lucide-react';
import React from 'react';
import { CelebrityAvatarDisplay } from '../CelebrityAvatarDisplay';

export function CelebrityImageManager() {
    const celebrities = [
        { id: 'trump', name: 'Donald Trump', fileName: 'donald-trump.png', status: 'uploaded' },
        { id: 'melania', name: 'Melania Trump', fileName: 'melania-trump.png', status: 'uploaded' },
        { id: 'elon', name: 'Elon Musk', fileName: 'elon-musk.png', status: 'uploaded' },
        { id: 'sbf', name: 'Sam Bankman-Fried', fileName: 'sam-bankman-fried.png', status: 'uploaded' },
        { id: 'dokwon', name: 'Do Kwon', fileName: 'do-kwon.png', status: 'uploaded' },
        { id: 'bukele', name: 'Nayib Bukele', fileName: 'nayib-bukele.png', status: 'missing' },
        { id: 'justin', name: 'Justin Sun', fileName: 'justin-sun.png', status: 'missing' },
        { id: 'vitalik', name: 'Vitalik Buterin', fileName: 'vitalik-buterin.png', status: 'missing' },
        { id: 'touadera', name: 'Faustin-Archange Touadéra', fileName: 'faustin-archange-touadera.png', status: 'uploaded' },
        { id: 'milei', name: 'Javier Milei', fileName: 'javier-milei.png', status: 'uploaded' },
        { id: 'heart', name: 'Richard Heart', fileName: 'richard-heart.png', status: 'missing' },
        { id: 'cz', name: 'Changpeng Zhao', fileName: 'changpeng-zhao.png', status: 'uploaded' }
    ];

    const uploadedCount = celebrities.filter(c => c.status === 'uploaded').length;
    const missingCount = celebrities.filter(c => c.status === 'missing').length;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-[#0a0a0a] min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">🎭 Celebrity Profile Pictures Manager</h1>
                <div className="flex items-center gap-6 text-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#42c767] rounded-full" />
                        <span className="text-[#42c767]">{uploadedCount} Uploaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                        <span className="text-yellow-400">{missingCount} Missing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-600 rounded-full" />
                        <span className="text-gray-400">12 Total</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {celebrities.map((celebrity) => (
                    <div
                        key={celebrity.id}
                        className={`bg-[#1a1a1a] rounded-xl p-6 border transition-colors ${celebrity.status === 'uploaded'
                            ? 'border-[#42c767]'
                            : 'border-yellow-500/50'
                            }`}
                    >
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white mb-1">{celebrity.name}</h3>
                            <p className="text-sm text-gray-400 font-mono">{celebrity.fileName}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="aspect-square w-full bg-[#2a2a2a] rounded-xl overflow-hidden border-2 border-dashed border-gray-600 flex items-center justify-center">
                                {celebrity.status === 'uploaded' ? (
                                    <CelebrityAvatarDisplay
                                        celebrityId={celebrity.id}
                                        size="2xl"
                                        className="w-full h-full"
                                        showBorder={false}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <User className="w-16 h-16 text-gray-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No image uploaded</p>
                                    </div>
                                )}
                            </div>

                            <div className={`p-4 rounded-xl border ${celebrity.status === 'uploaded'
                                ? 'bg-green-900/20 border-green-500/30'
                                : 'bg-yellow-900/20 border-yellow-500/30'
                                }`}>
                                {celebrity.status === 'uploaded' ? (
                                    <div className="flex items-center gap-3">
                                        <Check className="w-6 h-6 text-[#42c767]" />
                                        <div>
                                            <p className="text-sm font-semibold text-[#42c767]">Image Uploaded</p>
                                            <p className="text-xs text-green-200">Real photo will display in app</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                                        <div>
                                            <p className="text-sm font-semibold text-yellow-400">Image Missing</p>
                                            <p className="text-xs text-yellow-200">Using emoji fallback avatar</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                    <h4 className="font-bold text-blue-300 mb-3 flex items-center">
                        📋 Upload Instructions
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-2">
                        <li>• Upload images to <code className="text-blue-100 bg-blue-900/30 px-1 rounded">public/celebrities/</code></li>
                        <li>• Use exact filenames shown above</li>
                        <li>• PNG or JPG format supported</li>
                        <li>• Square aspect ratio preferred</li>
                        <li>• Professional headshots work best</li>
                    </ul>
                </div>

                <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl">
                    <h4 className="font-bold text-green-300 mb-3 flex items-center">
                        ✅ Current Status
                    </h4>
                    <div className="space-y-2 text-sm">
                        <p className="text-green-200">
                            <strong>{uploadedCount}/12</strong> celebrity images uploaded
                        </p>
                        <p className="text-green-200">
                            Images are automatically displayed in the app
                        </p>
                        <p className="text-green-200">
                            Missing images show personalized emoji fallbacks
                        </p>
                        {missingCount > 0 && (
                            <p className="text-yellow-200">
                                <strong>{missingCount}</strong> images still needed for complete experience
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {missingCount > 0 && (
                <div className="mt-8 p-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                    <h4 className="font-bold text-yellow-300 mb-3">🔍 Missing Celebrity Images:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {celebrities
                            .filter(c => c.status === 'missing')
                            .map(celebrity => (
                                <div key={celebrity.id} className="text-center p-2 bg-yellow-900/30 rounded">
                                    <p className="text-sm font-medium text-yellow-200">{celebrity.name}</p>
                                    <p className="text-xs text-yellow-400">{celebrity.fileName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
} 