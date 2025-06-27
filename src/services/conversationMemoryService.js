// Conversation Memory Service - Persistent Chat State Management
// Based on FACECROOK_DONALD_TRUMP_AI_CHATBOT_PRD.md specifications

class ConversationMemoryService {
    constructor() {
        this.storageKey = 'facecrook_trump_conversations';
        this.maxConversationHistory = 50; // Keep last 50 messages per user
        this.maxStorageUsers = 20; // Keep conversations for last 20 users
    }

    // Get conversation history for a specific user
    getConversation(userId) {
        try {
            const allConversations = this.getAllConversations();
            const userConversation = allConversations[userId];

            if (!userConversation) {
                return {
                    messages: [],
                    metadata: {
                        created: new Date().toISOString(),
                        lastInteraction: new Date().toISOString(),
                        totalMessages: 0,
                        partyInvitesSent: 0,
                        userResponses: 0
                    }
                };
            }

            // Update last access time
            userConversation.metadata.lastAccessed = new Date().toISOString();
            this.saveConversations({ ...allConversations, [userId]: userConversation });

            return userConversation;
        } catch (error) {
            console.error('Error loading conversation:', error);
            return { messages: [], metadata: {} };
        }
    }

    // Save a new message to conversation history
    saveMessage(userId, message) {
        try {
            const allConversations = this.getAllConversations();
            const userConversation = allConversations[userId] || {
                messages: [],
                metadata: {
                    created: new Date().toISOString(),
                    lastInteraction: new Date().toISOString(),
                    totalMessages: 0,
                    partyInvitesSent: 0,
                    userResponses: 0
                }
            };

            // Add message to history
            userConversation.messages.push({
                ...message,
                storedAt: new Date().toISOString()
            });

            // Update metadata
            userConversation.metadata.lastInteraction = new Date().toISOString();
            userConversation.metadata.totalMessages++;

            if (message.sender === 'user') {
                userConversation.metadata.userResponses++;
            } else if (message.messageType === 'party_invite') {
                userConversation.metadata.partyInvitesSent++;
            }

            // Keep only the most recent messages
            if (userConversation.messages.length > this.maxConversationHistory) {
                userConversation.messages = userConversation.messages.slice(-this.maxConversationHistory);
            }

            // Update conversation storage
            const updatedConversations = { ...allConversations, [userId]: userConversation };
            this.saveConversations(updatedConversations);

            return true;
        } catch (error) {
            console.error('Error saving message:', error);
            return false;
        }
    }

    // Get all conversations (with storage limit management)
    getAllConversations() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return {};

            const conversations = JSON.parse(stored);

            // Clean up old conversations if we have too many users
            const userIds = Object.keys(conversations);
            if (userIds.length > this.maxStorageUsers) {
                // Sort by last interaction time and keep only the most recent users
                const sortedUsers = userIds.sort((a, b) => {
                    const aTime = new Date(conversations[a].metadata.lastInteraction || 0);
                    const bTime = new Date(conversations[b].metadata.lastInteraction || 0);
                    return bTime - aTime;
                });

                const usersToKeep = sortedUsers.slice(0, this.maxStorageUsers);
                const cleanedConversations = {};
                usersToKeep.forEach(userId => {
                    cleanedConversations[userId] = conversations[userId];
                });

                this.saveConversations(cleanedConversations);
                return cleanedConversations;
            }

            return conversations;
        } catch (error) {
            console.error('Error loading conversations:', error);
            return {};
        }
    }

    // Save conversations to localStorage
    saveConversations(conversations) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(conversations));
            return true;
        } catch (error) {
            console.error('Error saving conversations to storage:', error);

            // If quota exceeded, try cleaning up old data
            if (error.name === 'QuotaExceededError') {
                this.cleanupOldData();
                try {
                    localStorage.setItem(this.storageKey, JSON.stringify(conversations));
                    return true;
                } catch (retryError) {
                    console.error('Error saving after cleanup:', retryError);
                    return false;
                }
            }
            return false;
        }
    }

    // Clean up old conversation data
    cleanupOldData() {
        try {
            const conversations = this.getAllConversations();
            const userIds = Object.keys(conversations);

            // Remove conversations older than 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const activeConversations = {};
            userIds.forEach(userId => {
                const conversation = conversations[userId];
                const lastInteraction = new Date(conversation.metadata.lastInteraction);

                if (lastInteraction > thirtyDaysAgo) {
                    // Keep recent conversations but trim message history
                    activeConversations[userId] = {
                        ...conversation,
                        messages: conversation.messages.slice(-20) // Keep only last 20 messages
                    };
                }
            });

            this.saveConversations(activeConversations);
            console.log('Cleaned up old conversation data');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    // Get conversation statistics
    getConversationStats(userId) {
        const conversation = this.getConversation(userId);
        const messages = conversation.messages || [];

        const userMessages = messages.filter(msg => msg.sender === 'user');
        const trumpMessages = messages.filter(msg => msg.sender === 'trump');
        const partyInvites = messages.filter(msg => msg.messageType === 'party_invite');

        return {
            totalMessages: messages.length,
            userMessages: userMessages.length,
            trumpMessages: trumpMessages.length,
            partyInvites: partyInvites.length,
            conversationStarted: conversation.metadata.created,
            lastInteraction: conversation.metadata.lastInteraction,
            avgResponseTime: this.calculateAverageResponseTime(messages),
            topTopics: this.getTopTopics(messages)
        };
    }

    // Calculate average response time between messages
    calculateAverageResponseTime(messages) {
        const responseTimes = [];

        for (let i = 1; i < messages.length; i++) {
            const prevMessage = messages[i - 1];
            const currentMessage = messages[i];

            if (prevMessage.sender === 'user' && currentMessage.sender === 'trump') {
                const prevTime = new Date(prevMessage.timestamp);
                const currentTime = new Date(currentMessage.timestamp);
                const responseTime = currentTime - prevTime;

                if (responseTime > 0 && responseTime < 300000) { // Less than 5 minutes
                    responseTimes.push(responseTime);
                }
            }
        }

        if (responseTimes.length === 0) return 0;

        const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
        return Math.round(average / 1000); // Return in seconds
    }

    // Analyze conversation topics
    getTopTopics(messages) {
        const topics = {
            'party': 0,
            'business': 0,
            'crypto': 0,
            'deals': 0,
            'success': 0,
            'people': 0
        };

        messages.forEach(message => {
            const content = message.content.toLowerCase();

            if (content.includes('party') || content.includes('event') || content.includes('tonight')) {
                topics.party++;
            }
            if (content.includes('business') || content.includes('deal') || content.includes('money')) {
                topics.business++;
            }
            if (content.includes('crypto') || content.includes('bitcoin') || content.includes('coin')) {
                topics.crypto++;
            }
            if (content.includes('deal') || content.includes('negotiate') || content.includes('contract')) {
                topics.deals++;
            }
            if (content.includes('success') || content.includes('win') || content.includes('great')) {
                topics.success++;
            }
            if (content.includes('people') || content.includes('friend') || content.includes('everyone')) {
                topics.people++;
            }
        });

        // Return top 3 topics
        return Object.entries(topics)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([topic, count]) => ({ topic, count }));
    }

    // Clear conversation history for a user
    clearConversation(userId) {
        try {
            const allConversations = this.getAllConversations();
            delete allConversations[userId];
            this.saveConversations(allConversations);
            return true;
        } catch (error) {
            console.error('Error clearing conversation:', error);
            return false;
        }
    }

    // Clear all conversation data
    clearAllConversations() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing all conversations:', error);
            return false;
        }
    }

    // Export conversation data (for backup/analysis)
    exportConversationData(userId = null) {
        try {
            const allConversations = this.getAllConversations();

            if (userId) {
                return {
                    user: userId,
                    conversation: allConversations[userId] || null,
                    exported: new Date().toISOString()
                };
            }

            return {
                allConversations,
                totalUsers: Object.keys(allConversations).length,
                exported: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error exporting conversation data:', error);
            return null;
        }
    }

    // Import conversation data (for restore)
    importConversationData(data) {
        try {
            if (data.allConversations) {
                // Importing all conversations
                this.saveConversations(data.allConversations);
                return true;
            } else if (data.user && data.conversation) {
                // Importing single user conversation
                const allConversations = this.getAllConversations();
                allConversations[data.user] = data.conversation;
                this.saveConversations(allConversations);
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error importing conversation data:', error);
            return false;
        }
    }
}

export default ConversationMemoryService; 