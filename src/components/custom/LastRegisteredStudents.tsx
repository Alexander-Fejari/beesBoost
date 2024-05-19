import { useEffect } from 'react';
import HiveSVG from "@/components/custom/HiveSVG.tsx";
import useStudentStore from "@/store/LastStudentsStore.tsx";

interface LastRegisteredStudentsProps {
    numHives: number;
}

const LastRegisteredStudents = ({ numHives }: LastRegisteredStudentsProps) => {
    const { users, fetchUsers } = useStudentStore(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }));

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        fetchUsers(apiUrl, numHives);
    }, [numHives, fetchUsers]);

    return (
        <section className={'flex justify-center items-center flex-wrap md:w-2/3 md:h-1/2'}>
            {users.map((user) => (
                <section
                    className="relative w-36 h-36 group"
                    key={user.id}>
                    <HiveSVG
                        size={'w-36 h-36'}
                        strokeColor={'stroke-primary'}
                        strokeWidth={8}
                        fillColor={'fill-transparent'}
                        showClipPath={true}
                    >
                        <image
                            xlinkHref={user.profile_pic}
                            width="100%"
                            height="100%"
                            x="0"
                            y="0"
                            className={'object-cover'}
                        />
                    </HiveSVG>
                    <section className="absolute inset-0 bg-white/90 bg-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <h3 className="text-primary text-center text-xs">{user.username}</h3>
                    </section>
                </section>
            ))}
        </section>
    );
}

export default LastRegisteredStudents;
