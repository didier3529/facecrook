// Trump AI Chat Widget - Main Component
// Floating messenger widget for Donald Trump AI conversations
// Based on FACECROOK_DONALD_TRUMP_AI_CHATBOT_PRD.md specifications

import React, { useEffect, useRef, useState } from 'react';
import { CelebrityAvatarDisplay } from './CelebrityAvatarDisplay';
import './TrumpAIChatWidget.css';

// Simple diagnostic version to isolate the issue
const TrumpAIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [serviceStatus, setServiceStatus] = useState('initializing');
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [debugInfo, setDebugInfo] = useState([]);
    const [trumpService, setTrumpService] = useState(null);
    const [memoryService, setMemoryService] = useState(null);
    const messagesEndRef = useRef(null);

    // Debug logging function
    const addDebugLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setDebugInfo(prev => [...prev, { timestamp, message, type }]);
        console.log(`[TrumpChat:${type}] ${message}`);
    };

    // Initialize services with extensive error handling
    useEffect(() => {
        const initializeServices = async () => {
            try {
                addDebugLog('Starting service initialization...', 'info');

                // Test 1: Check if service files are loadable
                addDebugLog('Testing service imports...', 'info');

                try {
                    const TrumpAIService = (await import('../services/trumpAIService.js')).default;
                    addDebugLog('TrumpAIService imported successfully', 'success');

                    const ConversationMemoryService = (await import('../services/conversationMemoryService.js')).default;
                    addDebugLog('ConversationMemoryService imported successfully', 'success');

                    // Test 2: Try to instantiate services
                    addDebugLog('Creating TrumpAIService instance...', 'info');
                    const trumpServiceInstance = new TrumpAIService();
                    setTrumpService(trumpServiceInstance);
                    addDebugLog('TrumpAIService created successfully', 'success');

                    addDebugLog('Creating ConversationMemoryService instance...', 'info');
                    const memoryServiceInstance = new ConversationMemoryService();
                    setMemoryService(memoryServiceInstance);
                    addDebugLog('ConversationMemoryService created successfully', 'success');

                    // Test 3: Try basic service methods
                    addDebugLog('Testing service methods...', 'info');

                    // Test Trump service
                    const testResponse = await trumpServiceInstance.generateResponse('hello');
                    addDebugLog(`Trump service test response: ${testResponse.content.substring(0, 50)}...`, 'success');

                    // Test memory service
                    const testConversation = memoryServiceInstance.getConversation('test-user');
                    addDebugLog(`Memory service test: ${testConversation.messages.length} messages`, 'success');

                    // If we get here, everything works!
                    setServiceStatus('ready');
                    addDebugLog('All services initialized successfully!', 'success');

                    // Send initial greeting
                    sendInitialGreeting(trumpServiceInstance, memoryServiceInstance);

                } catch (serviceError) {
                    addDebugLog(`Service creation error: ${serviceError.message}`, 'error');
                    throw serviceError;
                }

            } catch (error) {
                addDebugLog(`Initialization failed: ${error.message}`, 'error');
                addDebugLog(`Error stack: ${error.stack}`, 'error');
                setServiceStatus('error');
            }
        };

        initializeServices();
    }, []);

    // Send initial greeting message
    const sendInitialGreeting = async (trumpServiceInstance, memoryServiceInstance) => {
        try {
            addDebugLog('Sending initial greeting...', 'info');

            const greeting = await trumpServiceInstance.generateResponse(
                'initial_greeting',
                [],
                { isFirstVisit: true }
            );

            const greetingMessage = {
                id: Date.now(),
                content: greeting.content,
                sender: 'trump',
                timestamp: new Date(),
                messageType: 'greeting'
            };

            setMessages([greetingMessage]);
            memoryServiceInstance.saveMessage('current-user', greetingMessage);

            addDebugLog('Initial greeting sent successfully', 'success');
        } catch (error) {
            addDebugLog(`Greeting error: ${error.message}`, 'error');
        }
    };

    // Handle sending messages
    const handleSendMessage = async () => {
        if (!inputValue.trim() || !trumpService || !memoryService) return;

        try {
            addDebugLog(`Sending message: ${inputValue}`, 'info');

            // Add user message
            const userMessage = {
                id: Date.now(),
                content: inputValue.trim(),
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, userMessage]);
            memoryService.saveMessage('current-user', userMessage);
            setInputValue('');
            setIsTyping(true);

            // Get conversation history
            const conversation = memoryService.getConversation('current-user');

            // Generate Trump response
            const response = await trumpService.generateResponse(
                userMessage.content,
                conversation.messages
            );

            const trumpMessage = {
                id: Date.now() + 1,
                content: response.content,
                sender: 'trump',
                timestamp: new Date(),
                messageType: response.is_mock ? 'mock' : 'ai'
            };

            setMessages(prev => [...prev, trumpMessage]);
            memoryService.saveMessage('current-user', trumpMessage);
            setIsTyping(false);

            addDebugLog('Message exchange completed', 'success');

        } catch (error) {
            addDebugLog(`Message error: ${error.message}`, 'error');
            setIsTyping(false);
        }
    };

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Render status indicator
    const renderStatusIndicator = () => {
        switch (serviceStatus) {
            case 'initializing':
                return (
                    <div className="trump-widget-loading">
                        <div className="spinner"></div>
                        <span>Loading...</span>
                    </div>
                );
            case 'error':
                return (
                    <div className="trump-widget-error">
                        <div className="error-icon">⚠️</div>
                        <div className="error-text">
                            <div>Service Error</div>
                            <small>Check console for details</small>
                        </div>
                    </div>
                );
            case 'ready':
                return (
                    <div className="trump-widget-ready">
                        <CelebrityAvatarDisplay
                            celebrityId="donald-trump"
                            size="xl"
                        />
                        <div className="status-indicator"></div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Debug panel (only shown when there are errors)
    const renderDebugPanel = () => {
        if (serviceStatus !== 'error' || debugInfo.length === 0) return null;

        return (
            <div className="debug-panel">
                <h4>Debug Information:</h4>
                <div className="debug-logs">
                    {debugInfo.slice(-10).map((log, index) => (
                        <div key={index} className={`debug-log debug-${log.type}`}>
                            <span className="debug-time">{log.timestamp}</span>
                            <span className="debug-message">{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={`trump-chat-widget ${isOpen ? 'open' : 'closed'}`}>
            {/* Widget Button */}
            <div
                className="trump-widget-button"
                onClick={() => setIsOpen(!isOpen)}
                title="Chat with Donald Trump"
            >
                {renderStatusIndicator()}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="trump-chat-window">
                    <div className="trump-chat-header">
                        <div className="trump-chat-title">
                            <CelebrityAvatarDisplay
                                celebrityId="donald-trump"
                                size="sm"
                            />
                            <span>Donald Trump</span>
                            <div className="status-badge">{serviceStatus}</div>
                        </div>
                        <button
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="trump-chat-messages">
                        {serviceStatus === 'error' && renderDebugPanel()}

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender === 'user' ? 'user-message' : 'trump-message'}`}
                            >
                                <div className="message-content">
                                    {message.content}
                                </div>
                                <div className="message-time">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message trump-message typing">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {serviceStatus === 'ready' && (
                        <div className="trump-chat-input">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="send-button"
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TrumpAIChatWidget; 