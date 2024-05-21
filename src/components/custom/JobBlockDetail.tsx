import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'; // Assurez-vous d'avoir un composant Tabs
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import useJobStore from '@/store/JobStore';

interface Job {
  id: string;
  title: string;
  descriptionShort: string;
  startDate: string;
  duration: string;
  field: string;
  avatarUrl: string;
  applyLink: string;
  messageLink: string;
  nice_to_have: string[];
  experiences: string[];
  benefits: string[];
}

const JobBlockDetail: React.FC<{ job: Job }> = ({ job }) => {
  const {expandedJobId, setExpandedJobId } = useJobStore();
  const isExpanded = expandedJobId === job.id;

  const toggleExpand = () => {
    setExpandedJobId(isExpanded ? null : job.id);
  };

  const startDate = new Date(job.startDate).toLocaleDateString();


  return (
    <Card className={`transition-all ${isExpanded ? 'w-full h-full z-50 p-2 overflow-auto' : ''}`}>
      <CardHeader className="relative">
        <Avatar>
          <AvatarImage src={job.avatarUrl} alt={job.title} />
          <AvatarFallback>{job.title.charAt(0)}</AvatarFallback> 
        </Avatar>
        <div className="ml-4">
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.descriptionShort}</CardDescription>
        </div>
          {isExpanded ? (
            <TfiClose onClick={toggleExpand} className="absolute top-0.2 right-0 m-2"/>
          ) : (
            <BsThreeDotsVertical onClick={toggleExpand} className="absolute top-0.2 right-0 m-2"/>
          )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap space-x-2">
          <Badge variant="outline">{startDate}</Badge>
          <Badge variant="outline">{job.duration} Mois</Badge>
          <Badge variant="outline">{job.field}</Badge>
        </div>
        <div className="flex space-x-4 mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="primary">Postuler</Button>
            </PopoverTrigger>
            <PopoverContent>
              <a href={job.applyLink}>Postuler maintenant</a>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Envoyer un message</Button>
            </PopoverTrigger>
            <PopoverContent>
              <a href={job.messageLink}>Envoyer un message</a>
            </PopoverContent>
          </Popover>
        </div>
        {isExpanded && (
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="flex justify-center">
              <TabsTrigger value="description">Compétences</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <ul>
                {Array.isArray(job.nice_to_have) ? (
                  job.nice_to_have.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                  <li>{job.nice_to_have}</li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="experiences" className="mt-4">
              <ul>
                {Array.isArray(job.experiences) ? (
                  job.experiences.map((exp, index) => <li key={index}>{exp}</li>)
                ) : (
                  <li>{job.experiences}</li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="benefits" className="mt-4">
              <ul>
                {Array.isArray(job.benefits) ? (
                  job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                ) : (
                  <li>{job.benefits}</li>
                )}
              </ul>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default JobBlockDetail;
