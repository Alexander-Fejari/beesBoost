import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import useStudentStore from '@/store/LastStudentsStore';

interface StudentProps {
    className?: string;
    numHives?: number;  
}

const StudentHive: React.FC<StudentProps> = ({ className, numHives = 5 }) => {
    const { users, fetchUsers } = useStudentStore(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }));

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        fetchUsers(apiUrl, numHives);
    }, [numHives, fetchUsers]);

    const hives = users.map((user, index) => (
        <div 
            key={user.id} 
            className="relative w-40"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
        >
            <AspectRatio ratio={1}>
                <div className="w-full h-full">
                    <img 
                        src={user.profile_pic} 
                        alt={user.username} 
                        className="object-cover w-full h-full"
                    />
                    {hoverIndex === index && (
                        <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-55 text-white rounded-lg">
                             <NavLink to={`/user/${user.id}`}>{user.username}</NavLink>
                        </div>
                    )}
                </div>
            </AspectRatio>
        </div>
    ));

    return (
        <section className={`w-full ${className || ''}`}>
            <div className="flex justify-center gap-2 flex-wrap">
                <div className="flex justify-center gap-2">
                    {hives.slice(0, 3)}
                </div>
                <div className="flex justify-center gap-2 mt-2">
                    {hives.slice(3)}
                </div>
            </div>
        </section>
    );
};

export default StudentHive;

