import {useEffect} from 'react';
import HiveSVG from "@/components/custom/HiveSVG.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import useStudentStore from "@/store/LastStudentsStore.tsx";

interface LastRegisteredStudentsProps {
    numHives: number;
}

const LastRegisteredStudents = ({numHives}: LastRegisteredStudentsProps) => {
    const {users, fetchUsers} = useStudentStore(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }));

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        fetchUsers(apiUrl, numHives);
    }, [numHives, fetchUsers]);

    return (
        <AspectRatio ratio={1}>
            <section className={'flex justify-evenly items-center flex-wrap'}>
                {users.map((user) => (
                    <section key={user.id}>
                        <HiveSVG
                            size={'w-24 h-24'}
                            strokeColor={'stroke-primary'}
                            strokeWidth={8}
                            fillColor={'fill-transparent'}
                        >
                            <img className={'w-full h-full'} src={user.profile_pic} alt={user.username}/>
                        </HiveSVG>
                    </section>
                ))}
            </section>
        </AspectRatio>

    )
}

export default LastRegisteredStudents