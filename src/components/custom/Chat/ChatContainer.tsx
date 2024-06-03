// src/components/custom/Chat/ChatContainer.tsx
import React from 'react';
import BentoElement from '@/components/custom/Common/BentoElement.tsx';
import ChatApp from './ChatInterface';

const ChatContainer: React.FC = () => {
    return (
        <BentoElement size={'col-span-2'} className={'relative'}>
            <ChatApp />
        </BentoElement>
    );
};

export default ChatContainer;
