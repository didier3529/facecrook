// Trump AI Service - OpenAI Integration for Donald Trump Personality
// Based on FACECROOK_DONALD_TRUMP_AI_CHATBOT_PRD.md specifications

import TrumpPersonality from './trumpPersonality';

class TrumpAIService {
    constructor() {
        // Note: In production, this should be handled server-side
        this.apiKey = process.env.REACT_APP_OPENAI_KEY;
        this.personality = new TrumpPersonality();
        this.isEnabled = false; // Will be enabled when API key is configured
    }

    // Check if service is properly configured
    isConfigured() {
        return this.apiKey && this.apiKey.length > 0;
    }

    // Generate Trump-style response (currently using mock responses)
    async generateResponse(userMessage, conversationHistory = [], userContext = {}) {
        // For now, using mock responses until OpenAI API key is configured
        if (!this.isConfigured()) {
            return this.generateMockResponse(userMessage, conversationHistory, userContext);
        }

        try {
            const prompt = this.personality.buildPrompt(userMessage, conversationHistory, userContext);

            // OpenAI API call (will be implemented when API key is available)
            const response = await this.callOpenAI(prompt);
            return this.personality.validateAndCleanResponse(response);
        } catch (error) {
            console.error('Trump AI Service Error:', error);
            return this.generateMockResponse(userMessage, conversationHistory, userContext);
        }
    }

    // Mock response system for development and testing
    generateMockResponse(userMessage, conversationHistory, userContext) {
        const responses = this.personality.getMockResponses(userMessage, conversationHistory);
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return {
            content: randomResponse,
            timestamp: new Date(),
            tokens_used: Math.floor(Math.random() * 50) + 20, // Mock token usage
            response_time: Math.random() * 1000 + 500, // Mock response time
            is_mock: true
        };
    }

    // Future OpenAI API integration
    async callOpenAI(prompt) {
        if (!this.isConfigured()) {
            throw new Error('OpenAI API key not configured');
        }

        // This will be implemented when moving to production with server-side API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: prompt,
                temperature: 0.8,
                max_tokens: 150,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }
}

export default TrumpAIService; 