import { Hexagon, ResponsiveHoneycomb } from "react-honeycomb";
import useStudentStore from "@/store/LastStudentsStore";
import { useEffect } from "react";

const Honey = () => {
    const { users, fetchUsers } = useStudentStore(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }));

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        fetchUsers(apiUrl, 5); // use a fixed number of hives or pass it as a prop
    }, [fetchUsers]); // remove numHives from the dependency array

    const renderHexagon = (item: any) => (
        <Hexagon>
            <img className='object-cover' src={item.profile_pic} alt={item.username}/>
        </Hexagon>
    );

    return (
        <section>
            <ResponsiveHoneycomb
                defaultWidth={1024}
                size={64}
                items={users} // use the fetched users instead of calling fetchUsers again
                renderItem={renderHexagon}
            />
        </section>
    );
}

export default Honey;
