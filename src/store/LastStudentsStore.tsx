import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LastUserProps {
    id: string;
    profile_pic: string;
    username: string;
}

interface LastStudentStateProps {
    users: LastUserProps[];
    isLoading: boolean;
    errorMessage: string | null;
    fetchUsers: (apiUrl: string, numHives: number) => Promise<void>;
}

const useStudentStore = create<LastStudentStateProps>()(devtools((set) => ({
    users: [],
    isLoading: false,
    errorMessage: null,
    fetchUsers: async (apiUrl: string, numHives: number) => {
        set({ isLoading: true, errorMessage: null });
        try {
            const response = await fetch(`${apiUrl}/student/getLastRegisteredStudents`);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            set({
                users: data.slice(0, numHives).map((student: any) => ({
                    id: student._id,
                    profile_pic: student.profile_pic,
                    username: student.username
                })),
                isLoading: false
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            set({ errorMessage, isLoading: false });
        }
    }
})));

export default useStudentStore;
