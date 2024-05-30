import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchWithToken } from "@/store/Store";

interface JobSummary {
    avatarUrl: string;
    _id: string;
    title: string;
    descriptionShort: string;
    start_date: string;
    duration: number;
    field: string;
    location: string;
    poster_id: string;
}

export interface JobDetail extends JobSummary {
    avatarUrl: string;
    applyLink: string;
    messageLink: string;
    nice_to_have: string[];
    experiences: string[];
    benefits: string[];
    function: string;
}

interface JobState {
    jobSummaries: JobSummary[];
    jobDetails: { [key: string]: JobDetail | null };
    isLoading: { [key: string]: boolean };
    errorMessage: string | null;
    expandedJobId: string | null;
    fetchJobSummaries: (token: string) => Promise<void>;
    fetchJobDetail: (jobId: string, token: string) => Promise<void>;
    setExpandedJobId: (jobId: string | null) => void;
}

const useJobStore = create<JobState>()(devtools((set, get) => ({
    jobSummaries: [],
    jobDetails: {},
    isLoading: {},
    errorMessage: null,
    expandedJobId: null,
    fetchJobSummaries: async (token: string) => {
        const { jobSummaries } = get();
        if (jobSummaries.length > 0) return; // Vérifie si les données sont déjà présentes

        set({ isLoading: { summaries: true } });
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/post/getPosts`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            const jobSummaries = data.map((job: JobDetail) => ({
                _id: job._id,
                title: job.title,
                descriptionShort: job.descriptionShort,
                start_date: job.start_date,
                duration: job.duration,
                field: job.field,
                location: job.location,
                poster_id: job.poster_id,
            }));
            set({ jobSummaries, isLoading: { summaries: false } });
        } catch (error) {
            console.error('Error fetching job summaries:', error);
            set({ errorMessage: 'Failed to fetch job summaries', isLoading: { summaries: false } });
        }
    },
    fetchJobDetail: async (jobId: string, token: string) => {
        const { jobDetails } = get();
        if (jobDetails[jobId]) return; // Vérifie si les détails du job sont déjà présents

        set(state => ({ isLoading: { ...state.isLoading, [jobId]: true } }));
        try {
            const response = await fetchWithToken(`${import.meta.env.VITE_APP_API_URL}/post/getPostById/${jobId}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            const jobDetail: JobDetail = {
                _id: data._id,
                title: data.title,
                descriptionShort: data.body.description,
                start_date: data.start_date,
                duration: data.duration,
                field: data.field,
                location: data.location,
                avatarUrl: data.avatarUrl,
                applyLink: data.applyLink || 'https://example.com/apply',
                messageLink: data.messageLink || 'https://example.com/message',
                nice_to_have: data.body.nice_to_have,
                experiences: data.body.requirements,
                benefits: data.body.benefits,
                poster_id: data.poster_id,
                function: data.function
            };
            set(state => ({
                jobDetails: { ...state.jobDetails, [jobId]: jobDetail },
                isLoading: { ...state.isLoading, [jobId]: false }
            }));
        } catch (error) {
            set(state => ({
                errorMessage: `Failed to fetch job detail for job id: ${jobId}`,
                isLoading: { ...state.isLoading, [jobId]: false }
            }));
        }
    },
    setExpandedJobId: (jobId: string | null) => set({ expandedJobId: jobId }),
})));

export default useJobStore;
