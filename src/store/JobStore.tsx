import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface JobSummary {
  id: string;
  title: string;
  descriptionShort: string;
  startDate: string;
  duration: string;
  field: string;
  location: string;
  poster_id: string; // Include poster_id in the job summary
}

interface JobDetail extends JobSummary {
  avatarUrl: string;
  applyLink: string;
  messageLink: string;
  nice_to_have: string[];
  experiences: string[];
  benefits: string[];
}

interface JobState {
  jobSummaries: JobSummary[];
  jobDetails: { [key: string]: JobDetail | null };
  isLoading: { [key: string]: boolean };
  errorMessage: string | null;
  expandedJobId: string | null; 
  fetchJobSummaries: () => Promise<void>;
  fetchJobDetail: (jobId: string) => Promise<void>;
  setExpandedJobId: (jobId: string | null) => void; 
}

const useJobStore = create<JobState>()(devtools((set) => ({
  jobSummaries: [],
  jobDetails: {},
  isLoading: {},
  errorMessage: null,
  expandedJobId: null,
  fetchJobSummaries: async () => {
    set({ isLoading: { summaries: true } });
    try {
      const response = await fetch('https://cinemania.space/post/getPosts'); 
      const data = await response.json();
      const jobSummaries = data.map((job: any) => ({
        id: job._id,
        title: job.title,
        descriptionShort: job.body.description,
        startDate: job.start_date,
        duration: job.duration,
        field: job.field,
        location: job.location,
        poster_id: job.poster_id, // Include poster_id in the job summary
      }));
      set({ jobSummaries, isLoading: { summaries: false } });
    } catch (error) {
      set({ errorMessage: 'Failed to fetch job summaries', isLoading: { summaries: false } });
    }
  },
  fetchJobDetail: async (jobId: string) => {
    set(state => ({ isLoading: { ...state.isLoading, [jobId]: true } }));
    try {
      const response = await fetch(`https://cinemania.space/post/getPostById/${jobId}`); 
      const data = await response.json();
      const jobDetail = {
        id: data._id,
        title: data.title,
        descriptionShort: data.body.description,
        startDate: data.start_date,
        duration: data.duration,
        field: data.field,
        location: data.location,
        avatarUrl: data.avatarUrl,
        applyLink: data.applyLink || 'http://example.com/apply',
        messageLink: data.messageLink || 'http://example.com/message',
        nice_to_have: data.body.nice_to_have,
        experiences: data.body.requirements, 
        benefits: data.body.benefits,
        poster_id: data.poster_id, // Ensure poster_id is included in job detail
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
