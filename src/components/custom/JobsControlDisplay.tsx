import React, { useEffect } from 'react';
import useJobStore from '@/store/JobStore'; // Adjust the import path
import { useAuthStore } from '@/store/Store'; // Adjust the import path
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const JobControlList: React.FC = () => {
  const { id, token } = useAuthStore();
  const { jobSummaries, fetchJobSummaries, isLoading, setExpandedJobId } = useJobStore(state => ({
    jobSummaries: state.jobSummaries,
    fetchJobSummaries: state.fetchJobSummaries,
    isLoading: state.isLoading.summaries,
    setExpandedJobId: state.setExpandedJobId,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchJobSummaries(token);
    }
  }, [token, fetchJobSummaries]);

  const filteredJobSummaries = jobSummaries.filter(job => job.poster_id === id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (jobId: string) => {
    setExpandedJobId(jobId);
    navigate(`/edit/${jobId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company Name</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Duration (months)</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredJobSummaries.map((offer) => (
          <TableRow key={offer.id}>
            <TableCell>{offer.title}</TableCell>
            <TableCell>{offer.field}</TableCell>
            <TableCell>{new Date(offer.startDate).toLocaleDateString()}</TableCell>
            <TableCell>{offer.duration}</TableCell>
            <TableCell>{offer.title}</TableCell>
            <TableCell>{offer.descriptionShort}</TableCell>
            <TableCell>
              <Button onClick={() => handleEditClick(offer.id)}>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobControlList;
