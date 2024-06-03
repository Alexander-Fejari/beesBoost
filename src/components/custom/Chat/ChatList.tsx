import React from 'react';

interface Conversation {
    userId: string;
    username: string;
    lastMessage: string;
}

interface ChatListProps {
    conversations: Conversation[];
    onSelectConversation: (userId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ conversations, onSelectConversation }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            {conversations.map((conversation) => (
                <div
                    key={conversation.userId}
                    className="mb-4 cursor-pointer"
                    onClick={() => onSelectConversation(conversation.userId)}
                >
                    <p className="font-semibold">{conversation.username}</p>
                    <p className="text-gray-600">{conversation.lastMessage}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
