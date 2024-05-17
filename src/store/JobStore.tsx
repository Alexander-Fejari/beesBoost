import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface JobSummary {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: string;
  field: string;
}

interface JobDetail extends JobSummary {
  avatarUrl: string;
  applyLink: string;
  messageLink: string;
}

interface JobState {
    jobSummaries: JobSummary[];
    jobDetails: { [key: string]: JobDetail | null };
    isLoading: { [key: string]: boolean };
    errorMessage: string | null;
    expandedJobId: string | null; // Nouveau champ pour suivre le job déployé
    fetchJobSummaries: () => Promise<void>;
    fetchJobDetail: (jobId: string) => Promise<void>;
    setExpandedJobId: (jobId: string | null) => void; // Nouvelle action pour définir le job déployé
  }
const dummySummaries: JobSummary[] = [
  { id: '1', title: 'Software Engineer', description: 'Develop full-stack web applications.', startDate: '2023-01-01', duration: 'Permanent', field: 'Technology' },
  { id: '2', title: 'Product Manager', description: 'Lead the product vision.', startDate: '2023-02-15', duration: '12 months', field: 'Product Management' },
  { id: '3', title: 'Graphic Designer', description: 'Create compelling digital graphics.', startDate: '2023-03-01', duration: '6 months', field: 'Design' },
];

const dummyDetails: Record<string, JobDetail> = {
  '1': {
    id: '1',
    title: 'Software Engineer',
    description: 'Develop full-stack web applications that reach millions of users.',
    startDate: '2023-01-01',
    duration: 'Permanent',
    field: 'Technology',
    avatarUrl: 'http://github.com/shadcn.png',
    applyLink: 'http://example.com/apply',
    messageLink: 'http://example.com/message',
  },
  '2': {
    id: '2',
    title: 'Product Manager',
    description: 'Lead the product vision and strategy for our flagship product.',
    startDate: '2023-02-15',
    duration: '12 months',
    field: 'Product Management',
    avatarUrl: 'http://github.com/shadcn.png',
    applyLink: 'http://example.com/apply',
    messageLink: 'http://example.com/message',
  },
  '3': {
    id: '3',
    title: 'Graphic Designer',
    description: 'Create compelling digital graphics and marketing materials.',
    startDate: '2023-03-01',
    duration: '6 months',
    field: 'Design',
    avatarUrl: 'http://github.com/shadcn.png',
    applyLink: 'http://example.com/apply',
    messageLink: 'http://example.com/message',
  },
};

const useJobStore = create<JobState>()(devtools((set, get) => ({
    jobSummaries: dummySummaries,
    jobDetails: {},
    isLoading: {},
    errorMessage: null,
    expandedJobId: null,
    fetchJobSummaries: async () => {
      set({ isLoading: { summaries: true } });
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        set({ jobSummaries: get().jobSummaries, isLoading: { summaries: false } });
      } catch (error) {
        set({ errorMessage: 'Failed to fetch job summaries', isLoading: { summaries: false } });
      }
    },
    fetchJobDetail: async (jobId: string) => {
      set(state => ({ isLoading: { ...state.isLoading, [jobId]: true } }));
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        set(state => ({
          jobDetails: { ...state.jobDetails, [jobId]: dummyDetails[jobId] },
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
