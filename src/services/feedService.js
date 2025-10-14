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
                realName: 'Rajesh "ROI" Jindal',
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
                realName: 'Priya "Crypto-Queen" Patel',
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
                realName: 'Mahesh "Gift-Card" Kumar',
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
                realName: 'Alex "Investment Guru" Smith',
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
                realName: 'Deepak "Refund Guru" Nair',
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
                realName: 'Seema "Scholarship" Rao',
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

        // Satirical scammer posts - educational parody content
        this.posts = [
            // Rajesh "ROI" Jindal - Investment Scammer
            {
                id: 'rajesh-roi-1',
                celebrityId: 'rajesh-roi-jindal',
                displayName: scammers['rajesh-roi-jindal'].realName,
                avatar: scammers['rajesh-roi-jindal'].avatar,
                isVerified: true,
                content: "Hard work? Over-rated. I turned ₹7,000 into ₹7 lakh in 7 days, ask me how before SEATS FILL ⚡⚡ ONLY 3 SPOTS LEFT! DM NOW for my SECRET FORMULA!",
                timestamp: '1h',
                likes: 18,
                comments: 8,
                shares: 12,
                reactions: {
                    fire: 12,
                    heart: 6
                },
                commentData: [
                    { author: "Sarah", content: "This seems legitimate. I've been looking for investment opportunities.", timestamp: "45m", avatar: "/profile-pics/download (1).jpeg", likes: 7 },
                    { author: "Mike", content: "Bro, my grandma's cookie recipe has better ROI 📈🍪", timestamp: "38m", avatar: "/profile-pics/Amir.jpeg", likes: 5 },
                    { author: "Priya", content: "I need to see more documentation before I consider this.", timestamp: "25m", avatar: "/profile-pics/download (2).jpeg", likes: 9 }
                ],
                professionalIdentity: scammers['rajesh-roi-jindal'].professionalIdentity
            },

            // Priya "Crypto-Queen" Patel - Crypto Scammer  
            {
                id: 'priya-crypto-1',
                celebrityId: 'priya-crypto-queen-patel',
                displayName: scammers['priya-crypto-queen-patel'].realName,
                avatar: scammers['priya-crypto-queen-patel'].avatar,
                isVerified: true,
                content: "Just minted a new coin: PRYACOIN 🚀 Early investors get 10000% returns GUARANTEED! DM for whitelist access 💎 Only serious investors - minimum ₹50K entry!",
                timestamp: '2h',
                likes: 22,
                comments: 15,
                shares: 7,
                reactions: {
                    fire: 18,
                    heart: 4
                },
                commentData: [
                    { author: "Alex", content: "What's the actual use case for this token? I'm genuinely curious.", timestamp: "1h", avatar: "/profile-pics/download (3).jpeg", likes: 6 },
                    { author: "Sam", content: "I'll trade you my Pokemon cards for this coin 🃏", timestamp: "52m", avatar: "/profile-pics/Hk.jpeg", likes: 4 },
                    { author: "Moon", content: "This is obviously a pump and dump scheme.", timestamp: "41m", avatar: "/profile-pics/download (4).jpeg", likes: 12 }
                ],
                professionalIdentity: scammers['priya-crypto-queen-patel'].professionalIdentity
            },

            // Mahesh "Gift-Card" Kumar - Tech Support Scammer
            {
                id: 'mahesh-giftcard-1',
                celebrityId: 'mahesh-gift-card-kumar',
                displayName: scammers['mahesh-gift-card-kumar'].realName,
                avatar: scammers['mahesh-gift-card-kumar'].avatar,
                isVerified: true,
                content: "Limited-time Microsoft® partnership, pay tech-support fee in any gift card! Your computer security depends on it! 🛡️ URGENT: Hackers detected on your network!",
                timestamp: '3h',
                likes: 14,
                comments: 11,
                shares: 9,
                reactions: {
                    fire: 8,
                    heart: 6
                },
                commentData: [
                    { author: "John", content: "Microsoft never contacts users this way. This is a scam.", timestamp: "2h", avatar: "/profile-pics/download (5).jpeg", likes: 11 },
                    { author: "Lisa", content: "I paid my last tech support with pizza 🍕 Much better deal!", timestamp: "1h 45m", avatar: "/profile-pics/download (75).jpg", likes: 15 },
                    { author: "David", content: "Please don't fall for this. Legitimate tech support doesn't ask for gift cards.", timestamp: "1h 20m", avatar: "/profile-pics/download (76).jpg", likes: 8 }
                ],
                professionalIdentity: scammers['mahesh-gift-card-kumar'].professionalIdentity
            },

            // Alex "Investment Guru" Smith - Investment Scammer
            {
                id: 'alex-investment-1',
                celebrityId: 'alex-investment-guru',
                displayName: scammers['alex-investment-guru'].realName,
                avatar: scammers['alex-investment-guru'].avatar,
                isVerified: true,
                content: "BREAKING: Government insider reveals investment loophole! Only sharing with 5 people! Join my private group for exclusive access 💰 Only $500 entry fee to unlock millions!",
                timestamp: '4h',
                likes: 25,
                comments: 19,
                shares: 14,
                reactions: {
                    fire: 15,
                    heart: 10
                },
                commentData: [
                    { author: "Emma", content: "This looks like a legitimate investment opportunity. How can I get started?", timestamp: "3h", avatar: "/profile-pics/download (77).jpg", likes: 18 },
                    { author: "Robert", content: "I'll invest my entire life savings... of $3.50 💸", timestamp: "2h 30m", avatar: "/profile-pics/download (78).jpg", likes: 2 },
                    { author: "Jennifer", content: "Be very careful with these types of investments. Do your research first.", timestamp: "2h 15m", avatar: "/profile-pics/Oh.jpeg", likes: 12 },
                    { author: "Mark", content: "Can I pay with exposure? I have 12 followers 📸", timestamp: "1h 50m", avatar: "/profile-pics/download (1).jpeg", likes: 5 }
                ],
                professionalIdentity: scammers['alex-investment-guru'].professionalIdentity
            },

            // Deepak "Refund Guru" Nair - Refund Scammer
            {
                id: 'deepak-refund-1',
                celebrityId: 'deepak-refund-guru-nair',
                displayName: scammers['deepak-refund-guru-nair'].realName,
                avatar: scammers['deepak-refund-guru-nair'].avatar,
                isVerified: true,
                content: "Your Amazon order shipped twice, click for refund (requires screen-share). Act fast before charge goes through! 📦 URGENT: Double billing detected!",
                timestamp: '5h',
                likes: 16,
                comments: 13,
                shares: 8,
                reactions: {
                    fire: 9,
                    heart: 7
                },
                commentData: [
                    { author: "Amazon", content: "Amazon never processes refunds through social media comments. This is a scam.", timestamp: "4h", avatar: "/profile-pics/download (2).jpeg", likes: 16 },
                    { author: "John", content: "I clicked the link... now my fridge is ordering groceries 🤖", timestamp: "3h 45m", avatar: "/profile-pics/download (3).jpeg", likes: 9 },
                    { author: "Maria", content: "This is clearly fraudulent. Please report this to Amazon customer service.", timestamp: "3h 20m", avatar: "/profile-pics/download (4).jpeg", likes: 13 }
                ],
                professionalIdentity: scammers['deepak-refund-guru-nair'].professionalIdentity
            },

            // Seema "Scholarship" Rao - Education Scammer
            {
                id: 'seema-scholarship-1',
                celebrityId: 'seema-scholarship-rao',
                displayName: scammers['seema-scholarship-rao'].realName,
                avatar: scammers['seema-scholarship-rao'].avatar,
                isVerified: true,
                content: "Every student deserves Harvard. Comment 'STUDY' and I'll personally ensure your admission. 100% success rate! 🎓 Limited seats available - only ₹25K processing fee!",
                timestamp: '6h',
                likes: 24,
                comments: 17,
                shares: 11,
                reactions: {
                    fire: 14,
                    heart: 10
                },
                commentData: [
                    { author: "Harvard", content: "Harvard does not offer scholarships through social media platforms. Please verify through official channels.", timestamp: "5h", avatar: "/profile-pics/download (5).jpeg", likes: 20 },
                    { author: "Student", content: "I studied for 20 minutes and got this scholarship 📚✨", timestamp: "4h 30m", avatar: "/profile-pics/Hk.jpeg", likes: 3 },
                    { author: "Parent", content: "This seems too good to be true. I'll need to verify this with the school directly.", timestamp: "4h 15m", avatar: "/profile-pics/download (75).jpg", likes: 7 },
                    { author: "Counselor", content: "Legitimate scholarships require proper application processes. Be very cautious.", timestamp: "3h 45m", avatar: "/profile-pics/download (76).jpg", likes: 15 }
                ],
                professionalIdentity: scammers['seema-scholarship-rao'].professionalIdentity
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

        // Satirical scammer content templates - educational parody
        const scamContentTemplates = {
            'rajesh-roi-jindal': [
                "My student made ₹50 lakh in 30 days! Ask me for EXCLUSIVE access before it's too late! ⚡💰",
                "BREAKING: Government insider reveals investment loophole! Only sharing with 5 people! 🔥📈",
                "Warren Buffett called ME for advice! Now I'm sharing my secrets with YOU! 📞💎",
                "₹1 lakh became ₹10 crore! Screenshots don't lie! DM for my PROVEN system! 📊🚀"
            ],
            'priya-crypto-queen-patel': [
                "PRYACOIN just got listed on secret exchange! 50000% gains incoming! 🚀💎",
                "Elon Musk secretly investing in my new token! Pre-sale access ONLY today! ⚡🌙",
                "Government banning crypto TOMORROW! Get in NOW before it's illegal! 🔥💰",
                "My AI trading bot made me ₹5 crore overnight! Limited spots available! 🤖📈"
            ],
            'mahesh-gift-card-kumar': [
                "ALERT: Your computer infected with 47 viruses! Pay ₹500 iTunes card for removal! 🚨💻",
                "Microsoft security department calling! Your Windows license expired TODAY! 🛡️⚡",
                "Hackers accessing your bank account RIGHT NOW! Only we can stop them! 🔒💳",
                "FBI detected illegal activity on your PC! Avoid arrest - pay fine immediately! 👮‍♂️💰"
            ],
            'alex-investment-guru': [
                "Financial advisor confirmed this opportunity! $100M waiting! Need trustworthy partner! 💰📈",
                "Government officials demanding $10K fee to access this investment! Please help! 😢💔",
                "My father was a Wall Street legend! I choose YOU to share this wealth! God bless! 🙏✨",
                "Bank manager says entry fee required! Will double your investment guaranteed! 📈💎"
            ],
            'deepak-refund-guru-nair': [
                "Amazon charged you TWICE! Refund pending but needs verification! Click link NOW! 📦💰",
                "Your credit card compromised! We stopped fraudulent purchase! Call immediately! 💳🚨",
                "IRS owes you ₹50,000 refund! Claim expires in 24 hours! Urgent action required! 💸⏰",
                "Netflix billing error detected! Get ₹5000 compensation! Verify account details! 📺💰"
            ],
            'seema-scholarship-rao': [
                "Harvard professor personally recommended YOU! Full scholarship waiting! Act fast! 🎓⚡",
                "Government education grant approved! ₹2 lakh for studies! Only processing fee required! 📚💰",
                "MIT wants to interview you TOMORROW! Confirm with ₹1000 registration fee! 🏫🚀",
                "Oxford University secret admission program! 100% guarantee! Limited to 3 students only! 🎯📖"
            ]
        };

        for (let i = 0; i < count; i += 1) {
            const randomScammerId = scammerIds[Math.floor(Math.random() * scammerIds.length)];
            const scammer = scammers[randomScammerId];
            const templates = scamContentTemplates[randomScammerId] || ["URGENT! Don't miss this AMAZING opportunity!"];
            const randomContent = templates[Math.floor(Math.random() * templates.length)];

            const newPost = {
                id: `scam-generated-${Date.now()}-${i}`,
                celebrityId: randomScammerId,
                displayName: scammer.realName,
                avatar: scammer.avatar,
                isVerified: true,
                content: randomContent,
                timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
                likes: Math.floor(Math.random() * 5000) + 1000, // Higher fake engagement
                comments: Math.floor(Math.random() * 800) + 100,
                shares: Math.floor(Math.random() * 1200) + 200,
                reactions: {
                    fire: Math.floor(Math.random() * 200) + 50,  // High fake fire reactions
                    heart: Math.floor(Math.random() * 150) + 30 // Moderate hearts
                },
                professionalIdentity: scammer.professionalIdentity,
                commentData: FeedService.generateRealisticComments(scammer.scamCategory)
            };

            newPosts.push(newPost);
        }

        this.posts.push(...newPosts);
        return newPosts;
    }

    // Generate realistic comments for scam categories
    static generateRealisticComments(scamCategory) {
        const commentTemplates = {
            'investment': [
                { author: 'Mike', content: 'I\'m interested in learning more about this opportunity. Can you provide more details?', timestamp: '2h', avatar: '/profile-pics/Amir.jpeg', likes: 9 },
                { author: 'Sarah', content: 'This seems suspicious... but so does my neighbor\'s cat 🐱', timestamp: '1h 30m', avatar: '/profile-pics/download (1).jpeg', likes: 13 },
                { author: 'Guru', content: 'No legitimate investment works this way... except my lemonade stand 🍋', timestamp: '1h', avatar: '/profile-pics/download (2).jpeg', likes: 21 }
            ],
            'cryptocurrency': [
                { author: 'Max', content: 'I\'ve been following this project. The technology looks promising.', timestamp: '1h 45m', avatar: '/profile-pics/download (3).jpeg', likes: 7 },
                { author: 'Bitcoin', content: 'Too risky for me... I only invest in friendship bracelets 🤝', timestamp: '1h 20m', avatar: '/profile-pics/Hk.jpeg', likes: 5 },
                { author: 'Trader', content: 'Need to see the whitepaper first... preferably written in crayon 🖍️', timestamp: '55m', avatar: '/profile-pics/download (4).jpeg', likes: 12 }
            ],
            'tech-support': [
                { author: 'Expert', content: 'This is a known tech support scam. Microsoft will never call you asking for gift cards.', timestamp: '2h 30m', avatar: '/profile-pics/download (5).jpeg', likes: 17 },
                { author: 'Repair', content: 'Microsoft called me... to ask if I wanted fries with my Windows 🍟', timestamp: '2h', avatar: '/profile-pics/download (75).jpg', likes: 20 },
                { author: 'Tech', content: 'Report this immediately... to the comedy show! 🎭', timestamp: '1h 45m', avatar: '/profile-pics/download (76).jpg', likes: 26 }
            ],
            'investment': [
                { author: 'Alert', content: 'Be very careful with these types of investments. Always verify legitimacy first.', timestamp: '3h', avatar: '/profile-pics/download (77).jpg', likes: 29 },
                { author: 'John', content: 'I invested my lunch money... now I\'m rich in sandwiches 🥪💰', timestamp: '2h 45m', avatar: '/profile-pics/download (78).jpg', likes: 1 },
                { author: 'Fraud', content: 'This is not legitimate... but neither is my credit score 🤷‍♂️', timestamp: '2h 15m', avatar: '/profile-pics/Oh.jpeg', likes: 24 }
            ],
            'refund-fraud': [
                { author: 'Amazon', content: 'Amazon never processes refunds through social media. Please contact customer service directly.', timestamp: '3h 20m', avatar: '/profile-pics/download (1).jpeg', likes: 30 },
                { author: 'Service', content: 'Don\'t share your screen... unless you want me to see your browser history 😏', timestamp: '2h 50m', avatar: '/profile-pics/download (2).jpeg', likes: 18 },
                { author: 'Security', content: 'This is a phishing attempt... and I\'m the fish 🐟', timestamp: '2h 30m', avatar: '/profile-pics/download (3).jpeg', likes: 22 }
            ],
            'education-fraud': [
                { author: 'Counselor', content: 'Legitimate scholarships require proper application processes through official channels.', timestamp: '4h', avatar: '/profile-pics/download (4).jpeg', likes: 32 },
                { author: 'Advisor', content: 'This is a scam... but I still want the diploma 🎓', timestamp: '3h 30m', avatar: '/profile-pics/download (5).jpeg', likes: 19 },
                { author: 'Expert', content: 'Report this to authorities... and my mom 📞👩', timestamp: '3h', avatar: '/profile-pics/Hk.jpeg', likes: 28 }
            ]
        };

        const categoryComments = commentTemplates[scamCategory] || [
            { author: 'User', content: 'This looks suspicious', timestamp: '2h', avatar: '/profile-pics/download (1).jpeg', likes: 10 },
            { author: 'Safety', content: 'Be careful with this', timestamp: '1h 30m', avatar: '/profile-pics/download (2).jpeg', likes: 8 }
        ];
        
        const numComments = Math.floor(Math.random() * 3) + 2; // 2-4 comments
        const selectedComments = [];
        
        for (let i = 0; i < numComments && i < categoryComments.length; i += 1) {
            selectedComments.push(categoryComments[i]);
        }

        return selectedComments;
    }
}

// Export singleton instance
export const feedService = new FeedService(); 