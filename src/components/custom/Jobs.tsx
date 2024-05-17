import React, { useEffect } from 'react';
import JobBlockDetail from './JobBlockDetail';
import useJobStore from '@/store/JobStore'; 

const JobList: React.FC = () => {
  const { jobSummaries, fetchJobSummaries, isLoading, expandedJobId } = useJobStore();

  useEffect(() => {
    fetchJobSummaries();
  }, [fetchJobSummaries]);

  if (isLoading.summaries) {
    return <div>Loading...</div>;
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
    return <div>Loading job details...</div>;
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
