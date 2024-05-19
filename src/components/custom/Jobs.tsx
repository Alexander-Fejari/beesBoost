import React, { useEffect } from 'react';
import JobBlockDetail from './JobBlockDetail';
import useJobStore from '@/store/JobStore'; 
import { Skeleton } from '@/components/ui/skeleton';

const JobList: React.FC = () => {
  const { jobSummaries, fetchJobSummaries, isLoading, expandedJobId } = useJobStore();

  useEffect(() => {
    fetchJobSummaries();
  }, [fetchJobSummaries]);

  if (isLoading.summaries) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${expandedJobId ? '' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`}>
      {jobSummaries.map(job => (
        <JobDetailWrapper key={job.id} jobId={job.id} />
      ))}
    </div>
  );
};

const JobDetailWrapper: React.FC<{ jobId: string }> = ({ jobId }) => {
  const { jobDetails, fetchJobDetail, isLoading, expandedJobId } = useJobStore();

  useEffect(() => {
    if (!jobDetails[jobId]) {
      fetchJobDetail(jobId);
    }
  }, [fetchJobDetail, jobId, jobDetails]);

  if (isLoading[jobId]) {
    return <Skeleton className="w-full h-64" />;
  }

  const jobDetail = jobDetails[jobId];

  return jobDetail ? (
    <div className={expandedJobId ? (expandedJobId === jobId ? 'col-span-full' : 'hidden') : ''}>
      <JobBlockDetail job={jobDetail} />
    </div>
  ) : (
    <div>No job details available</div>
  );
};

export default JobList;
