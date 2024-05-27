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
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;
}

export const useUserDetailsStore = create<UserDetailsState>((set, get) => ({
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
    updateUserDetails: (details: Partial<UserDetails>) => set((state) => ({
        userDetails: state.userDetails ? {...state.userDetails, ...details} : null,
    })),
    submitUserDetails: async (userId: string, details: Partial<UserDetails>) => {
        set({isLoading: true, error: null});
        try {
            const response = await fetchWithToken(`${import.meta.env.VITE_APP_API_URL}/user/updateInfos/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });
            if (!response.ok) {
                throw new Error('Failed to update user details');
            }
            // Refetch user details after successful update
            await get().fetchUserDetails(userId);
        } catch (error) {
            set({isLoading: false, error: error instanceof Error ? error : new Error('Failed to update user details')});
        }
    },
}));
