import { MoreHorizontal, Search } from "lucide-react";
import React from 'react';
import { useAvatar } from '../../contexts/AvatarContext';
import { CelebrityAvatarDisplay } from '../CelebrityAvatarDisplay';

// Normal People Contacts - Regular users of the platform
const normalPeopleContacts = [
    {
        id: 'donald-trump',
        realName: 'Donald Trump',
        status: 'Making deals happen',
        isOnline: true
    },
    {
        id: 'melania-trump',
        realName: 'Melania Trump',
        status: 'Creating beautiful things',
        isOnline: true
    },
    {
        id: 'elon-musk',
        realName: 'Elon Musk',
        status: 'Building the future',
        isOnline: true
    },
    {
        id: 'sam-bankman-fried',
        realName: 'Sam Bankman-Fried',
        status: 'Analyzing markets',
        isOnline: false
    },
    {
        id: 'do-kwon',
        realName: 'Do Kwon',
        status: 'Coding solutions',
        isOnline: false
    },
    {
        id: 'justin-sun',
        realName: 'Justin Sun',
        status: 'Growing communities',
        isOnline: true
    },
    {
        id: 'vitalik-buterin',
        realName: 'Vitalik Buterin',
        status: 'Solving problems',
        isOnline: true
    },
    {
        id: 'faustin-archange-touadera',
        realName: 'Faustin-Archange Touadéra',
        status: 'Serving the community',
        isOnline: true
    },
    {
        id: 'javier-milei',
        realName: 'Javier Milei',
        status: 'Teaching & learning',
        isOnline: true
    },
    {
        id: 'changpeng-zhao',
        realName: 'Changpeng Zhao',
        status: 'Building platforms',
        isOnline: true
    }
];

const groupChats = [
    { id: "1", name: "Tech Enthusiasts", members: 12 },
    { id: "2", name: "Business Network", members: 8 },
    { id: "3", name: "Creative Minds", members: 24 },
];

export function RightPanel() {
    const { generateRandomAvatar } = useAvatar();

    return (
        <aside className="w-80 bg-[#1a1a1a] h-screen sticky top-14 overflow-y-auto border-l border-[#3a3a3a]">
            <div className="p-4">
                {/* Sponsored */}
                <div className="mb-6">
                    <h3 className="text-gray-400 font-medium text-sm mb-3">Sponsored</h3>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                            <span className="text-[#1877f2] font-bold text-sm">📱</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">Connect with Friends</p>
                            <p className="text-xs text-gray-400">socialmedia.facecrook</p>
                        </div>
                    </div>
                </div>

                {/* People You May Know */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-400 font-medium text-sm">People You May Know</h3>
                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-1 rounded-full hover:bg-[#2a2a2a] transition-colors">
                                <Search className="h-4 w-4 text-gray-400" />
                            </button>
                            <button type="button" className="p-1 rounded-full hover:bg-[#2a2a2a] transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {normalPeopleContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors group"
                                title={`${contact.realName} - ${contact.status}`}
                            >
                                <div className="relative">
                                    <CelebrityAvatarDisplay
                                        celebrityId={contact.id}
                                        size="sm"
                                        className="w-8 h-8"
                                    />
                                    {contact.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-white truncate">{contact.realName}</span>
                                        {contact.isOnline && (
                                            <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Group Conversations */}
                <div className="mt-6">
                    <h3 className="text-gray-400 font-medium text-sm mb-3">Group Conversations</h3>
                    <div className="space-y-1">
                        {groupChats.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                                    <span className="text-[#1877f2] font-bold text-xs">#</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{group.name}</p>
                                    <p className="text-xs text-gray-400">{group.members} members</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}