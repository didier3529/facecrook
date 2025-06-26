// User feed service with normal people content
export class FeedService {
    constructor() {
        this.posts = [];
        this.initializePosts();
    }

    // User data with real names
    static getUserData() {
        return {
            'donald-trump': {
                id: 'donald-trump',
                realName: 'Donald Trump',
                isVerified: true,
                avatar: '/celebrities/donald-trump.png'
            },
            'melania-trump': {
                id: 'melania-trump',
                realName: 'Melania Trump',
                isVerified: true,
                avatar: '/celebrities/melania-trump.png'
            },
            'elon-musk': {
                id: 'elon-musk',
                realName: 'Elon Musk',
                isVerified: true,
                avatar: '/celebrities/elon-musk.png'
            },
            'javier-milei': {
                id: 'javier-milei',
                realName: 'Javier Milei',
                isVerified: true,
                avatar: '/celebrities/javier-milei.png'
            },
            'sam-bankman-fried': {
                id: 'sam-bankman-fried',
                realName: 'Sam Bankman-Fried',
                isVerified: true,
                avatar: '/celebrities/sam-bankman-fried.png'
            },
            'do-kwon': {
                id: 'do-kwon',
                realName: 'Do Kwon',
                isVerified: true,
                avatar: '/celebrities/do-kwon.png'
            },
            'changpeng-zhao': {
                id: 'changpeng-zhao',
                realName: 'Changpeng Zhao',
                isVerified: true,
                avatar: '/celebrities/changpeng-zhao.png'
            },
            'faustin-archange-touadera': {
                id: 'faustin-archange-touadera',
                realName: 'Faustin-Archange Touadera',
                isVerified: true,
                avatar: '/celebrities/faustin-archange-touadera.png'
            }
        };
    }

    // Initialize with user provided content examples
    initializePosts() {
        const users = FeedService.getUserData();

        this.posts = [
            // Donald Trump party post - user example
            {
                id: 'trump-party-1',
                celebrityId: 'donald-trump',
                displayName: users['donald-trump'].realName,
                isVerified: true,
                content: "What a night. Money flying, charts bleeding, but we were UP. Vibes unmatched. Felt like kings. Na-na-ni, na-na-na. 💵🔥",
                imageUrl: '/posts/Party Image.png',
                timestamp: '2h',
                likes: 1247,
                comments: 89,
                shares: 156,
                hashtags: ['GoodVibes', 'BusinessLife', 'UP'],
                reactions: {
                    fire: 6,
                    heart: 19,
                    poop: 12
                }
            },

            // Melania comment - user example
            {
                id: 'melania-comment-1',
                celebrityId: 'melania-trump',
                displayName: users['melania-trump'].realName,
                isVerified: true,
                content: "Last night was cute 💅 Champagne, suits, and no broke energy in sight. Super light on my soul. Na-na-naaaa 💖",
                timestamp: '1h',
                likes: 892,
                comments: 67,
                shares: 234,
                hashtags: ['GoodEnergy', 'DesignLife', 'Champagne'],
                reactions: {
                    fire: 5,
                    heart: 15,
                    poop: 3
                }
            },

            // Javier Milei + Elon selfie - user example
            {
                id: 'milei-musk-selfie-1',
                celebrityId: 'javier-milei',
                displayName: users['javier-milei'].realName,
                isVerified: true,
                content: "@elonmusk Just two free spirits, talking mad shit in the park. No handlers, no press. Only trees and truth 🌳",
                imageUrl: '/posts/Musk + Milei Selfie.png',
                timestamp: '3h',
                likes: 2156,
                comments: 341,
                shares: 445,
                hashtags: ['FreeSpirits', 'NoHandlers', 'TruthTalking'],
                mentions: ['@elonmusk'],
                reactions: {
                    fire: 6,
                    heart: 18,
                    poop: 20
                }
            },

            // Additional posts in similar style
            {
                id: 'elon-tech-1',
                celebrityId: 'elon-musk',
                displayName: users['elon-musk'].realName,
                isVerified: true,
                content: "Just launched another startup from my garage. Innovation never sleeps. Building tomorrow today. 🚀⚡",
                timestamp: '4h',
                likes: 3421,
                comments: 567,
                shares: 789,
                hashtags: ['Innovation', 'StartupLife', 'BuildingTheFuture'],
                reactions: {
                    fire: 12,
                    heart: 18,
                    poop: 5
                }
            },

            {
                id: 'sbf-finance-1',
                celebrityId: 'sam-bankman-fried',
                displayName: users['sam-bankman-fried'].realName,
                isVerified: true,
                content: "Analyzed market trends all weekend. Numbers don't lie, patterns emerge. Professional trading requires discipline. 📊💼",
                timestamp: '5h',
                likes: 567,
                comments: 123,
                shares: 234,
                hashtags: ['MarketAnalysis', 'ProfessionalTrading', 'FinanceLife'],
                reactions: {
                    fire: 8,
                    heart: 15,
                    poop: 22
                }
            },

            {
                id: 'cz-business-1',
                celebrityId: 'changpeng-zhao',
                displayName: users['changpeng-zhao'].realName,
                isVerified: true,
                content: "Building never stops. 24/7 grind, global expansion. Customer satisfaction is everything. 🏗️🌍",
                timestamp: '6h',
                likes: 1234,
                comments: 234,
                shares: 345,
                hashtags: ['Building', 'CustomerFirst', 'GlobalBusiness'],
                reactions: {
                    fire: 14,
                    heart: 22,
                    poop: 8
                }
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

    // Get user by ID
    getUser(userId) {
        return FeedService.getUserData()[userId];
    }

    // Generate more posts for infinite scroll
    generateMorePosts(count = 5) {
        const users = FeedService.getUserData();
        const userIds = Object.keys(users);
        const newPosts = [];

        // Content templates in professional style
        const contentTemplates = {
            'donald-trump': [
                "Business meeting went fantastic today. Great deals, tremendous opportunities ahead! 📈🤝",
                "Success requires dedication and smart decisions. Building something amazing! 🏢",
                "Leadership means taking responsibility and making tough choices. Let's win! 💪"
            ],
            'elon-musk': [
                "Innovation happens when brilliant minds collaborate. Working on something revolutionary. 🚀🔬",
                "Technology should serve humanity. Building solutions for tomorrow's challenges. 🌍⚡",
                "Dream big, work hard, execute flawlessly. Mars is just the beginning. 🪐💭"
            ],
            'melania-trump': [
                "Design is about creating beauty that serves a purpose. Every detail matters. 🎨✨",
                "Elegance comes from simplicity and thoughtful execution. Timeless creations. 👗💎",
                "Art should inspire and elevate the human spirit. Creating with passion. 🖼️❤️"
            ],
            'javier-milei': [
                "Economic freedom creates prosperity for all. Understanding market principles. 📚💡",
                "Education is the foundation of progress. Teaching the next generation. 🎓📖",
                "Liberty and responsibility go hand in hand. Building a better future. 🗽🌅"
            ]
        };

        for (let i = 0; i < count; i += 1) {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            const user = users[randomUserId];
            const templates = contentTemplates[randomUserId] || ["Professional insights and updates"];
            const randomContent = templates[Math.floor(Math.random() * templates.length)];

            const newPost = {
                id: `generated-${Date.now()}-${i}`,
                celebrityId: randomUserId,
                displayName: user.realName,
                isVerified: true,
                content: randomContent,
                timestamp: `${Math.floor(Math.random() * 12) + 1}h`,
                likes: Math.floor(Math.random() * 2000),
                comments: Math.floor(Math.random() * 300),
                shares: Math.floor(Math.random() * 500),
                reactions: {
                    fire: Math.floor(Math.random() * 15) + 5,  // 5-19
                    heart: Math.floor(Math.random() * 18) + 5, // 5-22
                    poop: Math.floor(Math.random() * 20)       // 0-19
                }
            };

            newPosts.push(newPost);
        }

        this.posts.push(...newPosts);
        return newPosts;
    }
}

// Export singleton instance
export const feedService = new FeedService(); 