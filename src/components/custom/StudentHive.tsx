import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NavLink } from "react-router-dom";

interface StudentProps {
    className?: string;
    numHives?: number;  
}

interface User {
    id: string; 
    profile_pic: string;
    username: string; 
}

const StudentHive = ({ className, numHives = 5 }: StudentProps) => {
    const [users, setUsers] = useState<User[]>([]); 
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/student/getLastRegisteredStudents`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const students = data.map((student: any) => ({
                    id: student._id,
                    profile_pic: student.profile_pic,
                    username: student.username
                }));
                setUsers(students.slice(0, numHives));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchUsers();
    }, [numHives]);

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
                        className="object-cover w-full h-full "
                    />
                    {hoverIndex === index && (
                        <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-55 text-white rounded-lg">
                             <NavLink
                                key={user.id}
                                to={`/user/${user.id}`}
                                >
                            {user.username}</NavLink>
                        </div>
                    )}
                </div>
            </AspectRatio>
        </div>
    ));

    return (
        <section className={`w-full ${className}`}>
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
}

export default StudentHive;
