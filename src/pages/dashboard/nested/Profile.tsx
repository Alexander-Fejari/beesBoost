import {useCallback, useEffect} from "react";
import {useAuthStore} from "@/store/Store";
import {useUserDetailsStore} from "@/store/UserDetailsStore";
import Layout from "@/components/Layout";
import BentoElement from "@/components/custom/BentoElement";

const Profile = () => {
    const userId = useAuthStore((state) => state.id);
    const token = useAuthStore((state) => state.accessToken);
    const {userDetails, isLoading, error, fetchUserDetails} = useUserDetailsStore(state => ({
        userDetails: state.userDetails,
        isLoading: state.isLoading,
        error: state.error,
        fetchUserDetails: state.fetchUserDetails,
    }));

    const fetchData = useCallback(async () => {
        if (userId && token) {
            await fetchUserDetails(userId, token);
        }
    }, [userId, token, fetchUserDetails]);

    useEffect(() => {
        fetchData().catch((err) => {
            console.error('Failed to fetch user details:', err.message);
        });
    }, [fetchData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    if (userDetails) {
        return (
            <Layout>
                <BentoElement size={'col-span-4'}>
                    <h1>
                        hello {userDetails.username}
                    </h1>
                </BentoElement>
            </Layout>
        );
    }

    return <div>No user details found</div>;
};

export default Profile;
