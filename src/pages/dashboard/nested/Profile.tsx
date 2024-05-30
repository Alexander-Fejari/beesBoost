import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/store/Store";
import { useUserDetailsStore } from "@/store/UserDetailsStore";
import { useStudentDetailsStore } from "@/store/StudentDetailsStore";
import Layout from "@/components/Layout";
import CardProfileResume from "@/components/custom/Profile/CardProfileResume";
import CardProfileAbout from "@/components/custom/Profile/CardProfileAbout.tsx";
import CardProfileExperiences from "@/components/custom/Profile/CardProfileExperiences";

const Profile = () => {
    const userId = useAuthStore((state) => state.id);
    const token = useAuthStore((state) => state.accessToken);
    const {
        userDetails,
        isLoading: userLoading,
        error: userError,
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

    const {
        studentDetails,
        isLoading: studentLoading,
        error: studentError,
        fetchStudentDetails
    } = useStudentDetailsStore(state => ({
        studentDetails: state.studentDetails,
        isLoading: state.isLoading,
        error: state.error,
        fetchStudentDetails: state.fetchStudentDetails,
    }));

    const fetchData = useCallback(async () => {
        if (userId && token) {
            fetchUserDetails(userId);
            fetchStudentDetails(userId); // Appel de fetchStudentDetails pour récupérer les détails de l'étudiant
        }
    }, [userId, token, fetchUserDetails, fetchStudentDetails]);

    useEffect(() => {
        fetchData().catch((error) => {
            console.error('Failed to fetch user details:', error.message);
        });
    }, [fetchData]);

    if (userLoading || studentLoading) {
        return <div>Loading...</div>;
    }

    if (userError || studentError) {
        return <div>Error: {userError?.message || studentError?.message}</div>;
    }

    if (userDetails && studentDetails) {
        return (
            <Layout>
                <CardProfileResume
                    userId={userId}
                    userDetails={userDetails}
                    updateUserDetails={updateUserDetails}
                    submitUserDetails={submitUserDetails}
                />
                <CardProfileAbout
                    userId={userId}
                    userDetails={userDetails}
                    updateUserDetails={updateUserDetails}
                    submitUserDetails={submitUserDetails}
                />
                <CardProfileExperiences
                    userId={userId}
                    studentDetails={studentDetails} // Passage des détails de l'étudiant au composant CardProfileExperiences
                />
            </Layout>
        );
    }

    return <div>No user details found</div>;
};

export default Profile;
