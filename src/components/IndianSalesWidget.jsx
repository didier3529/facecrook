// Indian Sales Widget - Replacement for Trump AI Chat
// Floating widget featuring an Indian character who wants to sell something

import React, { useEffect, useRef, useState } from 'react';
import './IndianSalesWidget.css';

const IndianSalesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentSalesperson, setCurrentSalesperson] = useState('Priya');
    const messagesEndRef = useRef(null);

    const salespeople = [
        { name: 'Priya', avatar: '/profile-pics/Amir.jpeg' },
        { name: 'Rajesh', avatar: '/profile-pics/download (1).jpeg' },
        { name: 'Amit', avatar: '/profile-pics/download (2).jpeg' },
        { name: 'Sneha', avatar: '/profile-pics/download (3).jpeg' },
        { name: 'Vikram', avatar: '/profile-pics/download (4).jpeg' }
    ];

    // Initialize conversation when widget opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const initialMessage = {
                id: Date.now(),
                content: "Hello! I have amazing opportunity for you! 💰",
                sender: 'salesperson',
                timestamp: new Date(),
                salesperson: currentSalesperson
            };
            setMessages([initialMessage]);
        }
    }, [isOpen, messages.length, currentSalesperson]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Simulate salesperson responses
    const generateSalesResponse = (userMessage) => {
        const responses = [
            "Great! Let me tell you about our special offer! 🌟",
            "Perfect! You won't regret this investment! 💎",
            "Excellent choice! I have just the thing for you! ✨",
            "Amazing! This is limited time offer only! ⏰",
            "Fantastic! You're making the right decision! 🚀",
            "Wonderful! Let me share exclusive details! 🔥",
            "Brilliant! This will change your life! 💫",
            "Perfect timing! Special discount just for you! 🎯"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    // Handle sending messages
    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            content: inputValue.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate salesperson typing and response
        setTimeout(() => {
            const salesResponse = {
                id: Date.now() + 1,
                content: generateSalesResponse(userMessage.content),
                sender: 'salesperson',
                timestamp: new Date(),
                salesperson: currentSalesperson
            };
            setMessages(prev => [...prev, salesResponse]);
            setIsTyping(false);
        }, 1500);
    };

    // Handle key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleWidgetToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleWidgetKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleWidgetToggle();
        }
    };

    const currentSalespersonData = salespeople.find(s => s.name === currentSalesperson) || salespeople[0];

    return (
        <div className={`indian-sales-widget ${isOpen ? 'open' : 'closed'}`}>
            {/* Widget Button */}
            <div
                className="sales-widget-button"
                onClick={handleWidgetToggle}
                onKeyPress={handleWidgetKeyPress}
                role="button"
                tabIndex={0}
                title={`Chat with ${currentSalesperson} - Sales Specialist`}
            >
                <div className="sales-avatar">
                    <img
                        src={currentSalespersonData.avatar}
                        alt={currentSalesperson}
                        className="avatar-image"
                        onError={(e) => {
                            e.target.src = '/profile-pics/download (1).jpeg';
                        }}
                    />
                    <div className="status-indicator online" />
                </div>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="sales-chat-window">
                    <div className="sales-chat-header">
                        <div className="sales-chat-title">
                            <img
                                src={currentSalespersonData.avatar}
                                alt={currentSalesperson}
                                className="header-avatar"
                                onError={(e) => {
                                    e.target.src = '/profile-pics/download (1).jpeg';
                                }}
                            />
                            <div>
                                <span className="sales-name">{currentSalesperson}</span>
                                <div className="sales-status">Sales Specialist</div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="sales-chat-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender === 'user' ? 'user-message' : 'sales-message'}`}
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
                            <div className="message sales-message">
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="sales-chat-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="sales-input"
                            disabled={isTyping}
                        />
                        <button 
                            className="sales-send-button"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndianSalesWidget;
