// src/ChatApp.tsx
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
    sender: string;
    text: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {

        console.log('Connected to the WebSocket server');

        // Messages fictifs
        const initialMessages: Message[] = [
            { sender: 'bot', text: 'Fayen a fou' },
            { sender: 'bot', text: 'J espere ça roule a fou' },
            { sender: 'me', text: 'Cimer frere, ça va ou quoi ?' },
        ];
        setMessages(initialMessages);


        const interval = setInterval(() => {
            const newMessage: Message = { sender: 'bot', text: 'T sais bien on est là ' };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }, 5000); 

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            const newMessage: Message = { sender: 'me', text: input };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
        }
    };

    return (
        <div className="w-100 mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <div className="border w-100 p-4 h-96 overflow-y-scroll mb-4">
                {messages.map((message, index) => (
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
