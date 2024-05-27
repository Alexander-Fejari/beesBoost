import {create} from 'zustand';
import {fetchWithToken} from "@/store/Store";

export default interface UserDetails {
    firstname: string;
    lastname: string;
    username: string
    occupation: string
    profile_pic: string
    pick_up_line: string
}

interface UserDetailsState {
    userDetails: UserDetails | null;
    isLoading: boolean;
    error: Error | null;
    fetchUserDetails: (userId: string) => void;
}

export const useUserDetailsStore = create<UserDetailsState>((set) => ({
    userDetails: null,
    isLoading: false,
    error: null,
    fetchUserDetails: async (userId: string) => {
        set({isLoading: true, error: null});
        try {
            const response = await fetchWithToken(`${import.meta.env.VITE_APP_API_URL}/user/getUser/${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data)
            set({userDetails: data, isLoading: false});
        } catch (error) {
            set({isLoading: false, error: error instanceof Error ? error : new Error('Failed to fetch user details')});
        }
    },
}));
