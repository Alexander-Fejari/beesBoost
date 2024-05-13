import { useEffect, useState } from "react";

interface StudentProps {
    className?: string;
    numHives?: number;  
}

interface User {
    id: string; 
    profile_pic: string;
    username: string; 
}

const StudentHive = ({ className, numHives = 3 }: StudentProps) => {
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
        <div key={user.id} 
            className="hexagon w-40"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
        >
            <img src={user.profile_pic} alt={`User ${index}`} className="relative" />
            {hoverIndex === index && (
                <div className="absolute w-40 text-center bg-black text-white opacity-75">
                    {user.username}
                </div>
            )}
        </div>
    ));

    return (
        <section className={`w-full ${className}`}>  
            <div className="flex flex-col">
                <div className="flex justify-center gap-2">
                    {hives}
                </div>
            </div>
        </section>
    );
}

export default StudentHive;
