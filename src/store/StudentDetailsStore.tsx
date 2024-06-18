import {fetchWithToken} from "@/store/Store";
import {create} from "zustand";

export interface Formation {
    degree: string;
    field: string;
    school: string;
    graduation_year: number;
    _id: string;
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    _id: string;
}

export interface Skill {
    name: string;
    level: string;
    _id: string;
}

export interface Certification {
    name: string;
    provider: string;
    date: string;
    _id: string;
}

export interface Language {
    name: string;
    level: string;
    _id: string;
}

export interface GameInfo {
    level: number;
    nb_jobs_done: number;
    nb_jobs_atm: number;
    title: string;
    _id: string;
}

export interface StudentDetails {
    school: string;
    formation: Formation[];
    experience: Experience[];
    skills: Skill[];
    certification: Certification[];
    languages: Language[];
    game_info: GameInfo[];
}

interface StudentDetailsState {
    studentDetails: StudentDetails | null;
    isLoading: boolean;
    error: Error | null;
    fetchStudentDetails: (userId: string) => void;
    updateExperience: (experienceId: string, updatedExperience: Partial<Experience>) => void;
    submitStudentDetails: (userId: string, details: Partial<StudentDetails>) => Promise<void>;
}

export const useStudentDetailsStore = create<StudentDetailsState>((set) => ({
    studentDetails: null,
    isLoading: false,
    error: null,
    fetchStudentDetails: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetchWithToken(`${import.meta.env.VITE_APP_API_URL}/student/getDetails/${userId}`, {
                method: 'GET',
            });
            const data: StudentDetails = await response.json();
            set({ studentDetails: data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error instanceof Error ? error : new Error('Failed to fetch student details') });
        }
    },
    updateExperience: (experienceId: string, updatedExperience: Partial<Experience>) => {
        set((state) => ({
            studentDetails: state.studentDetails ? {
                ...state.studentDetails,
                experience: state.studentDetails.experience.map(exp => exp._id === experienceId ? { ...exp, ...updatedExperience } : exp)
            } : null,
        }));
    },
    submitStudentDetails: async (userId: string, updatedDetails: Partial<StudentDetails>) => {
        try {
            const response = await fetchWithToken(`${import.meta.env.VITE_APP_API_URL}/student/submitDetails/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to submit student details');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            set({isLoading: false, error: error instanceof Error ? error : new Error('Failed to update user details')});
            throw error; // Propagez l'erreur pour qu'elle soit gérée par l'appelant si nécessaire
        }
    },
}));
