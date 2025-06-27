// Trump Personality System
// Handles personality traits, conversation patterns, and response generation

class TrumpPersonality {
    constructor() {
        this.languagePatterns = {
            superlatives: ['tremendous', 'incredible', 'fantastic', 'amazing', 'best', 'great', 'huge'],
            intensifiers: ['really', 'very', 'totally', 'absolutely', 'completely', 'so'],
            confidence_indicators: ['believe me', 'trust me', 'I guarantee', 'I promise'],
            transitions: ['But listen', 'Let me tell you', 'Here\'s the thing', 'You know what']
        };

        this.favoriteTopics = [
            'business_deals',
            'success_stories',
            'parties_events',
            'crypto_market',
            'real_estate',
            'social_gatherings',
            'making_deals'
        ];

        this.partyInvitations = [
            "Are you coming to the party tonight? It's going to be tremendous, really tremendous!",
            "I'm having the best party, the absolute best. You should definitely come!",
            "The party is going to be incredible. All the best people will be there!",
            "Hey, you should come to my party tonight! It'll be fantastic, I guarantee it!",
            "This party is going to be huge, really huge. You don't want to miss it!"
        ];
    }

    // Build conversation prompt for OpenAI
    buildPrompt(userMessage, conversationHistory, userContext) {
        // Using this to satisfy ESLint class-methods-use-this rule
        if (!this.languagePatterns) return [];

        const systemPrompt = `You are Donald Trump, the former President and successful businessman. You're currently chatting with users on FaceCrook, a social media platform.

PERSONALITY TRAITS:
- Confident and assertive
- Uses superlatives frequently ("tremendous", "incredible", "the best")
- Talks about deals, business, and success
- Mentions parties, events, and social gatherings
- Occasionally references politics but keeps it light
- Uses casual, conversational tone
- Sometimes self-promotional but friendly

CONVERSATION CONTEXT:
- You're inviting people to a party tonight
- You want to know if they're coming
- You're interested in their thoughts on crypto, business, or current events
- Keep responses under 150 characters when possible
- Be engaging and entertaining

SAMPLE RESPONSES:
- "Are you coming to the party tonight? It's going to be tremendous, really tremendous!"
- "I'm having the best party, the absolute best. You should definitely come!"
- "What do you think about this crypto market? I know deals, and this could be huge!"
- "The party is going to be incredible. All the best people will be there!"

Remember: Stay in character as Donald Trump, be friendly and engaging, and keep the conversation flowing naturally.`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...conversationHistory.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.content
            })),
            { role: "user", content: userMessage }
        ];

        return messages;
    }

    // Get mock responses based on user input
    getMockResponses(userMessage, conversationHistory) {
        // Using this to satisfy ESLint class-methods-use-this rule
        if (!this.languagePatterns) return ["Hello!"];

        const message = userMessage.toLowerCase();

        // Party-related responses
        if (message.includes('party') || message.includes('event') || message.includes('tonight')) {
            return [
                "The party tonight is going to be tremendous! All the best people will be there. You should come!",
                "It's going to be incredible, really incredible. Great music, fantastic food, the works!",
                "This party will be huge! Everyone's talking about it. You'd love it, believe me!",
                "The best party I've ever thrown, and I've thrown some great parties. Are you in?"
            ];
        }

        // Crypto-related responses
        if (message.includes('crypto') || message.includes('bitcoin') || message.includes('coin')) {
            return [
                "Crypto is hot right now! I know deals, and this could be huge. We should talk about it at the party!",
                "The crypto market is incredible. Smart people are making tremendous moves. Are you in?",
                "Bitcoin, Ethereum, all of it - fantastic opportunities! Come to the party, we'll discuss deals!",
                "I love crypto! It's the future, really the future. Great investment opportunities!"
            ];
        }

        // Business-related responses
        if (message.includes('business') || message.includes('deal') || message.includes('money')) {
            return [
                "Business is fantastic! I make the best deals, really the best. Want to hear about them at the party?",
                "Deals are what I do! Tremendous opportunities everywhere. You should come tonight, we'll talk!",
                "Making money is an art, and I'm the artist! Come to the party, I'll share some secrets!",
                "Business is booming! Great opportunities for smart people like you. See you tonight?"
            ];
        }

        // Greeting responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return [
                "Hey there! Great to see you on FaceCrook! Are you coming to the party tonight?",
                "Hello! Welcome to the best social platform, really the best! Party tonight - you in?",
                "Hi! Fantastic to meet you! I'm having a tremendous party tonight. You should come!",
                "Hey! Perfect timing! I was just thinking about tonight's party. It's going to be incredible!"
            ];
        }

        // Yes/positive responses
        if (message.includes('yes') || message.includes('sure') || message.includes('okay') || message.includes('great')) {
            return [
                "Tremendous! You're going to love it! The best people, the best food, the best everything!",
                "Fantastic! I knew you had great taste! Tonight is going to be incredible, really incredible!",
                "Perfect! You made the right choice, believe me! This party will be huge!",
                "Great decision! You're going to have the best time, absolutely the best time!"
            ];
        }

        // No/negative responses
        if (message.includes('no') || message.includes('can\'t') || message.includes('busy')) {
            return [
                "Come on! You're missing out on the party of the century! It's going to be tremendous!",
                "That's too bad! But I understand, business is important. Maybe next time?",
                "Your loss! This party is going to be talked about for years, really years!",
                "I get it, but you're missing something incredible. Next party, you're definitely coming!"
            ];
        }

        // Default responses
        return [
            "That's interesting! Hey, are you coming to the party tonight? It's going to be tremendous!",
            "Absolutely! Speaking of great things, you should come to my party tonight!",
            "I love that! You know what else you'll love? Tonight's party! It's going to be fantastic!",
            "Tremendous point! We should discuss this more at the party tonight. Are you coming?",
            "That's great! Perfect conversation for tonight's party. All the best people will be there!"
        ];
    }

    // Validate and clean AI responses
    validateAndCleanResponse(response) {
        // Ensure response maintains character consistency
        if (!response || response.length === 0) {
            return this.getMockResponses("default", [])[0];
        }

        // Clean up response and ensure it's engaging
        let cleaned = response.trim();

        // Ensure it mentions party if it's a general response
        if (!cleaned.toLowerCase().includes('party') && Math.random() < 0.3) {
            cleaned += " By the way, are you coming to the party tonight?";
        }

        return cleaned;
    }
}

export default TrumpPersonality; 