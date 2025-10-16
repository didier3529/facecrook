// FaceCrook satirical feed service - Educational parody content only
// All personas are fictional and created for scam awareness education
import storageService from './storageService';

export class FeedService {
    constructor() {
        this.posts = [];
        this.initializePosts();
        this.syncWithStorage();
    }

    // Sync posts with localStorage
    syncWithStorage() {
        const storedPosts = storageService.getAllPosts();
        if (storedPosts.length === 0) {
            // First time - save initial posts to storage
            storageService.savePosts(this.posts);
        } else {
            // Load posts from storage
            this.posts = storedPosts;
        }
    }

    // Scammer personas for satirical content - educational parody only
    static getScammerPersonas() {
        return {
            'rajesh-roi-jindal': {
                id: 'rajesh-roi-jindal',
                realName: 'Rajesh Jindal',
                displayName: 'RajeshROI_Official',
                characterType: 'Investment Scammer',
                about: 'Serial entrepreneur. Inbox open for "fastest returns in Asia".',
                location: 'A bit dodgy',
                defaultFeeling: 'Human',
                joinDate: '2023-01-15',
                followerCount: '47.2K',
                bio: '💰 INVESTMENT GURU 💰 Turned ₹7K into ₹7L in 7 days! SEATS FILLING FAST! DM for EXCLUSIVE access to my SECRET FORMULA! 🚀⚡',
                isVerified: true,
                avatar: '/scammers/artworks-26z0Wl71BsoVlDcg-ojDyeg-t500x500.jpg',
                scamCategory: 'investment',
                professionalIdentity: 'Serial Entrepreneur'
            },
            'priya-crypto-queen-patel': {
                id: 'priya-crypto-queen-patel',
                realName: 'Priya Patel',
                displayName: 'CryptoQueenPriya',
                characterType: 'Crypto Scammer',
                about: 'Blockchain believer. DM for moon-shot deals 💎🚀',
                location: 'To the moon',
                defaultFeeling: 'Bullish',
                joinDate: '2021-03-10',
                followerCount: '89.7K',
                bio: '🚀 CRYPTO MILLIONAIRE 🚀 Created PRYACOIN - 10000% GUARANTEED returns! Early investors ONLY! Diamond hands 💎 Not financial advice 😉',
                isVerified: true,
                avatar: '/scammers/OIP.jpeg',
                scamCategory: 'cryptocurrency',
                professionalIdentity: 'Blockchain Expert'
            },
            'mahesh-gift-card-kumar': {
                id: 'mahesh-gift-card-kumar',
                realName: 'Mahesh Kumar',
                displayName: 'TechSupport_Mahesh',
                characterType: 'Tech Support Scammer',
                about: 'Customer-support expert since Windows XP.',
                location: 'Remote desktop',
                defaultFeeling: 'Helpful',
                joinDate: '2019-08-22',
                followerCount: '23.4K',
                bio: '🛡️ COMPUTER SECURITY EXPERT 🛡️ Microsoft® Certified Partner! Your PC is at RISK! Pay support fee with gift cards for INSTANT protection!',
                isVerified: true,
                avatar: '/scammers/0bdfea035a028e2202b6508b48e3300b.jpg',
                scamCategory: 'tech-support',
                professionalIdentity: 'Microsoft® Partner'
            },
            'alex-investment-guru': {
                id: 'alex-investment-guru',
                realName: 'Alex Smith',
                displayName: 'InvestmentGuru_Alex',
                characterType: 'Investment Scammer',
                about: 'Financial advisor helping people invest wisely.',
                location: 'Wall Street, New York',
                defaultFeeling: 'Confident',
                joinDate: '2020-11-30',
                followerCount: '156.8K',
                bio: '💰 INVESTMENT EXPERT 💰 Helping people make millions! Join my exclusive trading group. Limited spots available!',
                isVerified: true,
                avatar: '/scammers/OIP (1).jpeg',
                scamCategory: 'investment',
                professionalIdentity: 'Financial Advisor'
            },
            'deepak-refund-guru-nair': {
                id: 'deepak-refund-guru-nair',
                realName: 'Deepak Nair',
                displayName: 'RefundGuru_Deepak',
                characterType: 'Refund Scammer',
                about: 'I sense viruses on your PC. Let me "help" remotely.',
                location: 'Amazon Customer Service',
                defaultFeeling: 'Concerned for you',
                joinDate: '2022-05-14',
                followerCount: '67.3K',
                bio: '📦 REFUND SPECIALIST 📦 Amazon order shipped TWICE? Click for INSTANT refund! Requires screen-share for security. Act FAST before charge goes through!',
                isVerified: true,
                avatar: '/scammers/08ed8c46-6940-4f69-9b34-8d4c02f236bc-1711101712700-thumbnailS.jpeg',
                scamCategory: 'refund-fraud',
                professionalIdentity: 'Amazon Customer Service'
            },
            'seema-scholarship-rao': {
                id: 'seema-scholarship-rao',
                realName: 'Seema Rao',
                displayName: 'ScholarshipSeema',
                characterType: 'Education Scammer',
                about: 'Education consultant, every student "wins".',
                location: 'Harvard Admissions Office',
                defaultFeeling: 'Proud of students',
                joinDate: '2021-09-07',
                followerCount: '34.9K',
                bio: '🎓 EDUCATION CONSULTANT 🎓 Harvard admission GUARANTEED! 100% success rate! Comment "STUDY" and I will personally ensure your acceptance! Limited seats!',
                isVerified: true,
                avatar: '/scammers/Screenshot 2025-07-30 101313.png',
                scamCategory: 'education-fraud',
                professionalIdentity: 'Education Consultant'
            }
        };
    }

    // Initialize with satirical scammer posts - educational parody content
    initializePosts() {
        const scammers = FeedService.getScammerPersonas();

        // Simplified, natural-looking posts
        this.posts = [
            {
                id: 'post-1',
                displayName: "Rajesh Jindal",
                avatar: scammers['rajesh-roi-jindal'].avatar,
                isVerified: true,
                content: "Quick question - anyone know about that new investment thing going around?",
                timestamp: '1h',
                likes: 3,
                comments: 2,
                shares: 1,
                commentData: [
                    { author: "Sarah", content: "Be careful with those", timestamp: "45m", avatar: "/profile-pics/download (1).jpeg", likes: 2 },
                    { author: "Mike", content: "Sounds sketchy", timestamp: "38m", avatar: "/profile-pics/Amir.jpeg", likes: 1 }
                ],
                professionalIdentity: "Investment Advisor"
            },
            {
                id: 'post-2',
                displayName: "Priya Patel",
                avatar: scammers['priya-crypto-queen-patel'].avatar,
                isVerified: true,
                content: "Just made a new crypto coin. DM if interested.",
                timestamp: '2h',
                likes: 7,
                comments: 1,
                shares: 0,
                commentData: [
                    { author: "Alex", content: "What's it called?", timestamp: "1h", avatar: "/profile-pics/download (3).jpeg", likes: 0 }
                ],
                professionalIdentity: "Blockchain Expert"
            },
            {
                id: 'post-3',
                displayName: "Mahesh Kumar",
                avatar: scammers['mahesh-gift-card-kumar'].avatar,
                isVerified: true,
                content: "Microsoft called me today. Said my computer has viruses. They want gift cards to fix it.",
                timestamp: '3h',
                likes: 5,
                comments: 2,
                shares: 0,
                commentData: [
                    { author: "John", content: "That's definitely a scam", timestamp: "2h", avatar: "/profile-pics/download (5).jpeg", likes: 8 },
                    { author: "Lisa", content: "Don't do it", timestamp: "1h 45m", avatar: "/profile-pics/download (75).jpg", likes: 3 }
                ],
                professionalIdentity: "Tech Support"
            },
            {
                id: 'post-4',
                displayName: "Alex Smith",
                avatar: scammers['alex-investment-guru'].avatar,
                isVerified: true,
                content: "Found this investment opportunity. Only sharing with close friends first.",
                timestamp: '4h',
                likes: 4,
                comments: 1,
                shares: 1,
                commentData: [
                    { author: "Emma", content: "Tell me more", timestamp: "3h", avatar: "/profile-pics/download (77).jpg", likes: 1 }
                ],
                professionalIdentity: "Financial Advisor"
            },
            {
                id: 'post-5',
                displayName: "Deepak Nair",
                avatar: scammers['deepak-refund-guru-nair'].avatar,
                isVerified: true,
                content: "Amazon says I got double charged. Need to verify my account details.",
                timestamp: '5h',
                likes: 2,
                comments: 1,
                shares: 0,
                commentData: [
                    { author: "Maria", content: "Contact Amazon directly", timestamp: "3h 20m", avatar: "/profile-pics/download (4).jpeg", likes: 5 }
                ],
                professionalIdentity: "Customer Service"
            },
            {
                id: 'post-6',
                displayName: "Seema Rao",
                avatar: scammers['seema-scholarship-rao'].avatar,
                isVerified: true,
                content: "Helping students get into top universities. DM for details.",
                timestamp: '6h',
                likes: 6,
                comments: 2,
                shares: 0,
                commentData: [
                    { author: "Parent", content: "How does it work?", timestamp: "4h 15m", avatar: "/profile-pics/download (75).jpg", likes: 2 },
                    { author: "Student", content: "Sounds good", timestamp: "4h 30m", avatar: "/profile-pics/Hk.jpeg", likes: 0 }
                ],
                professionalIdentity: "Education Consultant"
            }
        ];
    }

    // Get all posts (sorted by latest first)
    getPosts() {
        return [...this.posts].sort((a, b) => {
            // Simple timestamp sorting
            const timeMap = { '1h': 1, '2h': 2, '3h': 3, '4h': 4, '5h': 5, '6h': 6 };
            return (timeMap[a.timestamp] || 0) - (timeMap[b.timestamp] || 0);
        });
    }

    // Add a new post
    addPost(postData) {
        const newPost = {
            id: `post-${Date.now()}`,
            timestamp: 'now',
            likes: 0,
            comments: 0,
            shares: 0,
            reactions: {
                fire: 0,
                heart: 0,
                poop: 0
            },
            ...postData
        };

        this.posts.unshift(newPost);
        
        // Save to localStorage
        storageService.savePost(newPost);
        
        return newPost;
    }

    // Get scammer persona by ID
    static getScammer(scammerId) {
        return FeedService.getScammerPersonas()[scammerId];
    }

    // Generate more satirical scammer posts for infinite scroll
    generateMorePosts(count = 5) {
        const scammers = FeedService.getScammerPersonas();
        const scammerIds = Object.keys(scammers);
        const newPosts = [];

        // Natural, varied content templates
        const contentTemplates = {
            'rajesh-roi-jindal': [
                "Anyone tried that new trading app?",
                "Looking for investment advice",
                "Heard about some crypto thing",
                "Quick question about stocks"
            ],
            'priya-crypto-queen-patel': [
                "Made a new token today",
                "Crypto market looking good",
                "Anyone into blockchain?",
                "Working on something big"
            ],
            'mahesh-gift-card-kumar': [
                "Got a weird call about my computer",
                "Microsoft wants gift cards?",
                "Tech support asking for money",
                "Is this normal?"
            ],
            'alex-investment-guru': [
                "Found this investment thing",
                "Anyone know about this?",
                "Looking for partners",
                "Got a good opportunity"
            ],
            'deepak-refund-guru-nair': [
                "Amazon double charged me",
                "Need to verify account",
                "Got a refund email",
                "Anyone else get this?"
            ],
            'seema-scholarship-rao': [
                "Helping with college apps",
                "Got some scholarship info",
                "University admissions help",
                "Education consulting available"
            ]
        };

        for (let i = 0; i < count; i += 1) {
            const randomScammerId = scammerIds[Math.floor(Math.random() * scammerIds.length)];
            const scammer = scammers[randomScammerId];
            const templates = contentTemplates[randomScammerId] || ["Anyone know about this?"];
            const randomContent = templates[Math.floor(Math.random() * templates.length)];

            const newPost = {
                id: `generated-${Date.now()}-${i}`,
                displayName: scammer.realName,
                avatar: scammer.avatar,
                isVerified: true,
                content: randomContent,
                timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
                likes: Math.floor(Math.random() * 10) + 1,
                comments: Math.floor(Math.random() * 3) + 1,
                shares: Math.floor(Math.random() * 2),
                professionalIdentity: scammer.professionalIdentity,
                commentData: FeedService.generateSimpleComments()
            };

            newPosts.push(newPost);
        }

        this.posts.push(...newPosts);
        return newPosts;
    }

    // Generate simple, natural comments
    static generateSimpleComments() {
        const simpleComments = [
            { author: 'Mike', content: 'Interesting', timestamp: '2h', avatar: '/profile-pics/Amir.jpeg', likes: 1 },
            { author: 'Sarah', content: 'Sounds good', timestamp: '1h 30m', avatar: '/profile-pics/download (1).jpeg', likes: 0 },
            { author: 'Alex', content: 'Tell me more', timestamp: '1h', avatar: '/profile-pics/download (2).jpeg', likes: 2 },
            { author: 'John', content: 'Be careful', timestamp: '45m', avatar: '/profile-pics/download (3).jpeg', likes: 3 },
            { author: 'Lisa', content: 'Thanks for sharing', timestamp: '30m', avatar: '/profile-pics/download (4).jpeg', likes: 1 },
            { author: 'Emma', content: 'Not sure about this', timestamp: '15m', avatar: '/profile-pics/download (5).jpeg', likes: 0 }
        ];
        
        const numComments = Math.floor(Math.random() * 2) + 1; // 1-2 comments
        const selectedComments = [];
        
        for (let i = 0; i < numComments; i += 1) {
            const randomComment = simpleComments[Math.floor(Math.random() * simpleComments.length)];
            selectedComments.push({...randomComment, timestamp: `${Math.floor(Math.random() * 60) + 1}m`});
        }

        return selectedComments;
    }
}

// Export singleton instance
export const feedService = new FeedService(); 