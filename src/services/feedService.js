// FaceCrook satirical feed service - Educational parody content only
// All personas are fictional and created for scam awareness education
export class FeedService {
    constructor() {
        this.posts = [];
        this.initializePosts();
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
            'anil-prince-varma': {
                id: 'anil-prince-varma',
                realName: 'Anil "Prince" Varma',
                displayName: 'Prince_Anil_Official',
                characterType: 'Prince Scammer',
                about: 'Long-lost royalty. Searching for a trustworthy friend.',
                location: 'Royal Palace (temporarily displaced)',
                defaultFeeling: 'Grateful',
                joinDate: '2020-11-30',
                followerCount: '156.8K',
                bio: '👑 DISPLACED PRINCE 👑 £43M inheritance FROZEN by corrupt officials! Need ONE trustworthy friend to help transfer funds. Will share 50% as gratitude!',
                isVerified: true,
                avatar: '/scammers/OIP (1).jpeg',
                scamCategory: 'advance-fee',
                professionalIdentity: 'Displaced Royalty'
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
                about: 'Education consultant—every student "wins".',
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
                content: "Hard work? Over-rated. I turned ₹7,000 into ₹7 lakh in 7 days—ask me how before SEATS FILL ⚡⚡ ONLY 3 SPOTS LEFT! DM NOW for my SECRET FORMULA!",
                timestamp: '1h',
                likes: 4247,
                comments: 189,
                shares: 756,
                hashtags: ['GetRichQuick', 'SecretFormula', 'FastMoney', 'NoWorkRequired'],
                reactions: {
                    fire: 156,
                    heart: 89,
                    poop: 1247
                },
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
                likes: 2834,
                comments: 456,
                shares: 892,
                hashtags: ['PRYACOIN', 'CryptoMoon', 'GuaranteedReturns', 'DiamondHands'],
                reactions: {
                    fire: 234,
                    heart: 167,
                    poop: 892
                },
                professionalIdentity: scammers['priya-crypto-queen-patel'].professionalIdentity
            },

            // Mahesh "Gift-Card" Kumar - Tech Support Scammer
            {
                id: 'mahesh-giftcard-1',
                celebrityId: 'mahesh-gift-card-kumar',
                displayName: scammers['mahesh-gift-card-kumar'].realName,
                avatar: scammers['mahesh-gift-card-kumar'].avatar,
                isVerified: true,
                content: "Limited-time Microsoft® partnership—pay tech-support fee in any gift card! Your computer security depends on it! 🛡️ URGENT: Hackers detected on your network!",
                timestamp: '3h',
                likes: 1567,
                comments: 234,
                shares: 445,
                hashtags: ['MicrosoftPartner', 'UrgentSecurity', 'GiftCardPayment', 'ComputerProtection'],
                reactions: {
                    fire: 89,
                    heart: 56,
                    poop: 567
                },
                professionalIdentity: scammers['mahesh-gift-card-kumar'].professionalIdentity
            },

            // Anil "Prince" Varma - Prince Scammer
            {
                id: 'anil-prince-1',
                celebrityId: 'anil-prince-varma',
                displayName: scammers['anil-prince-varma'].realName,
                avatar: scammers['anil-prince-varma'].avatar,
                isVerified: true,
                content: "My £43M inheritance is frozen. Need ONE real friend to help transfer funds. Will share 50% as gratitude 👑 Only need £5000 transfer fee to unlock millions!",
                timestamp: '4h',
                likes: 3421,
                comments: 789,
                shares: 1234,
                hashtags: ['RoyalInheritance', 'Trustworthy Friend', 'SharedWealth', 'BlessedPartnership'],
                reactions: {
                    fire: 345,
                    heart: 567,
                    poop: 2134
                },
                professionalIdentity: scammers['anil-prince-varma'].professionalIdentity
            },

            // Deepak "Refund Guru" Nair - Refund Scammer
            {
                id: 'deepak-refund-1',
                celebrityId: 'deepak-refund-guru-nair',
                displayName: scammers['deepak-refund-guru-nair'].realName,
                avatar: scammers['deepak-refund-guru-nair'].avatar,
                isVerified: true,
                content: "Your Amazon order shipped twice—click for refund (requires screen-share). Act fast before charge goes through! 📦 URGENT: Double billing detected!",
                timestamp: '5h',
                likes: 2156,
                comments: 345,
                shares: 678,
                hashtags: ['AmazonRefund', 'DoubleCharge', 'UrgentAction', 'ScreenShare'],
                reactions: {
                    fire: 123,
                    heart: 89,
                    poop: 789
                },
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
                likes: 5678,
                comments: 1234,
                shares: 2345,
                hashtags: ['HarvardAdmission', 'GuaranteedAcceptance', 'EducationSuccess', 'LimitedSeats'],
                reactions: {
                    fire: 678,
                    heart: 456,
                    poop: 3456
                },
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
            'anil-prince-varma': [
                "Royal family lawyer confirmed my inheritance! £100M waiting! Need trustworthy partner! 👑💰",
                "Government officials demanding ₹10K bribe to release my funds! Please help! 😢💔",
                "My father was King of Nigeria! I choose YOU to share wealth! God bless! 🙏✨",
                "Bank manager says transfer fee required! Will double your investment guaranteed! 📈💎"
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
                    heart: Math.floor(Math.random() * 150) + 30, // Moderate hearts
                    poop: Math.floor(Math.random() * 1000) + 500 // High poop reactions (people see through scam)
                },
                professionalIdentity: scammer.professionalIdentity,
                hashtags: this.generateScamHashtags(scammer.scamCategory)
            };

            newPosts.push(newPost);
        }

        this.posts.push(...newPosts);
        return newPosts;
    }

    // Generate appropriate hashtags for scam categories
    generateScamHashtags(scamCategory) {
        const hashtagTemplates = {
            'investment': ['GetRichQuick', 'FastMoney', 'SecretFormula', 'InvestmentGuru', 'MillionaireMindset'],
            'cryptocurrency': ['CryptoMoon', 'GuaranteedReturns', 'DiamondHands', 'ToTheMoon', 'CryptoSecrets'],
            'tech-support': ['ComputerSecurity', 'VirusAlert', 'UrgentAction', 'MicrosoftPartner', 'PCProtection'],
            'advance-fee': ['RoyalInheritance', 'TrustworthyFriend', 'SharedWealth', 'BlessedPartnership', 'GodsWill'],
            'refund-fraud': ['RefundAlert', 'BillingError', 'UrgentRefund', 'AccountSecurity', 'FraudPrevention'],
            'education-fraud': ['HarvardBound', 'GuaranteedAdmission', 'EducationSuccess', 'ScholarshipAlert', 'DreamCollege']
        };

        const categoryTags = hashtagTemplates[scamCategory] || ['Opportunity', 'LimitedTime', 'Exclusive'];
        const selectedTags = [];
        const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 hashtags

        for (let i = 0; i < numTags; i++) {
            const randomTag = categoryTags[Math.floor(Math.random() * categoryTags.length)];
            if (!selectedTags.includes(randomTag)) {
                selectedTags.push(randomTag);
            }
        }

        return selectedTags;
    }
}

// Export singleton instance
export const feedService = new FeedService(); 