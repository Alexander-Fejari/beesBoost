import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';

interface Message {
    sender: string;
    text: string;
    userId: string;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    if (!message || !message.sender || !message.text || !message.userId) {
        return null; // Ne rien rendre si les données du message sont incorrectes
    }

    return (
        <Card className="mb-2">
            <CardContent className={`flex items-center ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <Avatar className="mr-2">
                    <AvatarImage src={`https://api.adorable.io/avatars/40/${message.userId}.png`} alt={message.sender} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className={`px-4 py-2 rounded-lg inline-block ${message.sender === 'me' ? 'bg-primary text-white' : 'bg-gray-300 text-black'}`}>
                        {message.text}
                    </p>
                    <div className="flex justify-between">
                        <small className="block">{message.sender}</small>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ChatMessage;
