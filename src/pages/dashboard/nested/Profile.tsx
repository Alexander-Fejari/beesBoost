import {useCallback, useEffect} from "react";
import {useAuthStore} from "@/store/Store";
import {useUserDetailsStore} from "@/store/UserDetailsStore";
import Layout from "@/components/Layout";
import CardProfileResume from "@/components/custom/Profile/CardProfileResume";

const Profile = () => {
    const userId = useAuthStore((state) => state.id);
    const token = useAuthStore((state) => state.accessToken);
    const {
        userDetails,
        isLoading,
        error,
        fetchUserDetails,
        updateUserDetails,
        submitUserDetails
    } = useUserDetailsStore(state => ({
        userDetails: state.userDetails,
        isLoading: state.isLoading,
        error: state.error,
        fetchUserDetails: state.fetchUserDetails,
        updateUserDetails: state.updateUserDetails,
        submitUserDetails: state.submitUserDetails,
    }));

    const fetchData = useCallback(async () => {
        if (userId && token) {
            fetchUserDetails(userId);
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
                <CardProfileResume
                    userId={userId}
                    userDetails={userDetails}
                    updateUserDetails={updateUserDetails}
                    submitUserDetails={submitUserDetails}
                />
            </Layout>
        );
    }

    return <div>No user details found</div>;
};

export default Profile;
