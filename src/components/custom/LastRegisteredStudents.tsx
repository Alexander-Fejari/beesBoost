import {useState, useEffect } from "react";
import HiveSVG from "@/components/custom/HiveSVG.tsx";

interface LastRegisteredStudentsProps {
    numHives: number;
}

const LastRegisteredStudents = ({numHives}:LastRegisteredStudentsProps) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchLastUsers = async () => {
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
    }, [numHives]);

    const hives = users.map(user, index) => (
        <section key={user.id}>
            <HiveSVG size={''} strokeColor={} strokeWidth={} fillColor={}
        </section>
    )

    return (
        <h3>
            last students
        </h3>
    )
}

export default LastRegisteredStudents