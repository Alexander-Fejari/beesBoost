// src/ChatMessage.tsx
import React from 'react';

interface Message {
    sender: string;
    text: string;
}

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    if (!message || !message.sender || !message.text) {
        return null;
    }

    return (
        <div className={`mb-2 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${message.sender === 'me' ? 'bg-primary text-white' : 'bg-gray-300 text-black'}`}>
                {message.sender}: {message.text}
            </span>
        </div>
    );
};

export default ChatMessage;
