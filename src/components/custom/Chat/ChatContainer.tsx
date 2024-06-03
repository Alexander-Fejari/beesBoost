import React, { useState } from 'react';
import BentoElement from '@/components/custom/Common/BentoElement.tsx';
import ChatList from './ChatList';
import ChatApp from './ChatApp';

const ChatContainer: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messages, setMessages] = useState([
        { sender: 'me', text: 'Hello User One', userId: '2' },
        { sender: 'me', text: 'How are you, User Two?', userId: '2' },
        { sender: 'bot', text: 'Fayen a fou', userId: '1' },
        { sender: 'bot', text: 'J espere ça roule a fou', userId: '1' },
        { sender: 'me', text: 'Cimer frere, ça va ou quoi ?', userId: '2' },
        { sender: 'bot', text: 'T sais bien on est là', userId: '1' },
    ]);

    const conversations = [
        { userId: '1', username: 'User One', lastMessage: 'Hello there!' },
        { userId: '2', username: 'User Two', lastMessage: 'How are you?' },
    ];

    const handleSelectConversation = (userId: string) => {
        setSelectedUserId(userId);
    };

    const handleSendMessage = (text: string) => {
        if (selectedUserId) {
            const newMessage = { sender: 'me', text, userId: selectedUserId };
            setMessages(prevMessages => [...prevMessages, newMessage]);
        }
    };

    return (
        <div className="flex h-full">
            <BentoElement size={'col-span-2'} className={'relative h-full overflow-y-scroll w-1/2'}>
                <ChatList conversations={conversations} onSelectConversation={handleSelectConversation} />
            </BentoElement>
            <BentoElement size={'col-span-2'} className={'relative h-full overflow-y-scroll w-1/2'}>
                {selectedUserId && (
                    <ChatApp selectedUserId={selectedUserId} messages={messages} onSendMessage={handleSendMessage} />
                )}
            </BentoElement>
        </div>
    );
};

export default ChatContainer;
