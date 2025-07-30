import { MoreHorizontal, Search } from "lucide-react";
import React from 'react';
import { useAvatar } from '../../contexts/AvatarContext';

// Scammer personas for "People You May Know" - satirical contacts
const scammerContacts = [
    {
        id: 'rajesh-roi-jindal',
        realName: 'Rajesh "ROI" Jindal',
        status: 'Making MILLIONS! Ask me how!',
        isOnline: true,
        avatar: '/scammers/artworks-26z0Wl71BsoVlDcg-ojDyeg-t500x500.jpg'
    },
    {
        id: 'priya-crypto-queen-patel',
        realName: 'Priya "Crypto-Queen" Patel',
        status: 'PRYACOIN to the moon! 🚀',
        isOnline: true,
        avatar: '/scammers/OIP.jpeg'
    },
    {
        id: 'mahesh-gift-card-kumar',
        realName: 'Mahesh "Gift-Card" Kumar',
        status: 'Your PC needs urgent help!',
        isOnline: true,
        avatar: '/scammers/0bdfea035a028e2202b6508b48e3300b.jpg'
    },
    {
        id: 'anil-prince-varma',
        realName: 'Anil "Prince" Varma',
        status: 'Seeking trustworthy friend',
        isOnline: false,
        avatar: '/scammers/OIP (1).jpeg'
    },
    {
        id: 'deepak-refund-guru-nair',
        realName: 'Deepak "Refund Guru" Nair',
        status: 'Double billing detected!',
        isOnline: true,
        avatar: '/scammers/08ed8c46-6940-4f69-9b34-8d4c02f236bc-1711101712700-thumbnailS.jpeg'
    },
    {
        id: 'seema-scholarship-rao',
        realName: 'Seema "Scholarship" Rao',
        status: 'Harvard admissions open!',
        isOnline: true,
        avatar: '/scammers/Screenshot 2025-07-30 101313.png'
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
        <aside className="w-80 bg-white h-screen sticky top-14 overflow-y-auto border-l border-gray-200">
            <div className="p-4">
                {/* Sponsored */}
                <div className="mb-6">
                    <h3 className="text-gray-600 font-medium text-sm mb-3">Sponsored</h3>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-[#1877f2] font-bold text-sm">📱</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Connect with Friends</p>
                            <p className="text-xs text-gray-500">socialmedia.facecrook</p>
                        </div>
                    </div>
                </div>

                {/* People You May Know */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-600 font-medium text-sm">People You May Know</h3>
                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <Search className="h-4 w-4 text-gray-600" />
                            </button>
                            <button type="button" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {scammerContacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                                title={`${contact.realName} - ${contact.status}`}
                            >
                                <div className="relative">
                                    <img
                                        src={contact.avatar}
                                        alt={contact.realName}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    {contact.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 truncate">{contact.realName}</span>
                                            <span className="text-xs text-gray-500 truncate">{contact.status}</span>
                                        </div>
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
                    <h3 className="text-gray-600 font-medium text-sm mb-3">Group Conversations</h3>
                    <div className="space-y-1">
                        {groupChats.map((group) => (
                            <div
                                key={group.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-[#1877f2] font-bold text-xs">#</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{group.name}</p>
                                    <p className="text-xs text-gray-500">{group.members} members</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}