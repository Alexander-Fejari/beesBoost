import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
    sender: string;
    text: string;
    userId: string;
}

interface ChatAppProps {
    selectedUserId: string | null;
    messages: Message[];
    onSendMessage: (text: string) => void;
}

const ChatApp: React.FC<ChatAppProps> = ({ selectedUserId, messages, onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            onSendMessage(input);
            setInput('');
        }
    };

    const filteredMessages = messages.filter(
        message => message.userId === selectedUserId || (message.sender === 'me' && message.userId === selectedUserId)
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <div className="border w-full p-4 h-96 overflow-y-scroll mb-4">
                {filteredMessages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    className="border p-2 flex-grow mr-2"
                />
                <button onClick={handleSendMessage} className="bg-primary text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatApp;
