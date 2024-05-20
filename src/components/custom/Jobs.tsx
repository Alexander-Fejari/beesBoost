import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { Skeleton } from '@/components/ui/skeleton';
import useJobStore from '@/store/JobStore';

const JobList: React.FC = () => {
  const { jobSummaries, fetchJobSummaries, fetchJobDetail, jobDetails, isLoading, expandedJobId, setExpandedJobId } = useJobStore();
  console.log('Job prop:', jobSummaries);

  useEffect(() => {
    fetchJobSummaries().then(() => {});
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

  const handleExpand = (jobId: string) => {
    if (!jobDetails[jobId]) {
      fetchJobDetail(jobId).then(() => {});
    }
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
      <div className={`grid ${expandedJobId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`}>
        {jobSummaries.map(job => {
          const jobDetail = jobDetails[job.id];
          const isExpanded = expandedJobId === job.id;

          if (expandedJobId && !isExpanded) return null;

          return (
              <Card key={job.id} className={`transition-all ${isExpanded ? 'w-full h-full overflow-auto' : 'h-auto'}`}>
                <CardHeader className="relative flex">
                  <Avatar>
                    <AvatarImage src={jobDetail?.avatarUrl || ''} alt={job.title} />
                    <AvatarFallback>{job.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.descriptionShort}</CardDescription>
                  </div>
                  {isExpanded ? (
                      <TfiClose onClick={() => handleExpand(job.id)} className="absolute top-2 right-2 cursor-pointer" />
                  ) : (
                      <BsThreeDotsVertical onClick={() => handleExpand(job.id)} className="absolute top-2 right-2 cursor-pointer" />
                  )}
                </CardHeader>
                <CardContent className={`flex-grow ${isExpanded ? 'p-4' : ''}`}>
                  <div className="flex flex-wrap space-x-2 mb-4">
                    <Badge variant="outline">{new Date(job.startDate).toLocaleDateString()}</Badge>
                    <Badge variant="outline">{job.duration} Mois</Badge>
                    <Badge variant="outline">{job.field}</Badge>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="primary">Postuler</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <a href={jobDetail?.applyLink}>Postuler maintenant</a>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Envoyer un message</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <a href={jobDetail?.messageLink}>Envoyer un message</a>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {isExpanded && jobDetail && (
                      <Tabs defaultValue="description" className="mt-8">
                        <TabsList className="flex justify-center">
                          <TabsTrigger value="description">Compétences</TabsTrigger>
                          <TabsTrigger value="experiences">Experiences</TabsTrigger>
                          <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description" className="mt-4">
                          <ul>
                            {jobDetail.nice_to_have.map((item, index) => <li key={index}>{item}</li>)}
                          </ul>
                        </TabsContent>
                        <TabsContent value="experiences" className="mt-4">
                          <ul>
                            {jobDetail.experiences.map((exp, index) => <li key={index}>{exp}</li>)}
                          </ul>
                        </TabsContent>
                        <TabsContent value="benefits" className="mt-4">
                          <ul>
                            {jobDetail.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
                          </ul>
                        </TabsContent>
                      </Tabs>
                  )}
                </CardContent>
              </Card>
          );
        })}
      </div>
  );
};

export default JobList;
