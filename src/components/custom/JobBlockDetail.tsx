import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'; // Assurez-vous d'avoir un composant Tabs
import { BsThreeDotsVertical } from "react-icons/bs";
import useJobStore from '@/store/JobStore';

interface Job {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: string;
  field: string;
  avatarUrl: string;
  applyLink: string;
  messageLink: string;
  extraField1?: string;
  extraField2?: string;
  extraField3?: string;
}

const JobBlockDetail: React.FC<{ job: Job }> = ({ job }) => {
  const { expandedJobId, setExpandedJobId } = useJobStore();
  const isExpanded = expandedJobId === job.id;

  const toggleExpand = () => {
    setExpandedJobId(isExpanded ? null : job.id);
  };

  return (
    <Card className={`transition-all ${isExpanded ? 'w-full h-full z-50 bg-white p-8 overflow-auto' : ''}`}>
      <CardHeader className="relative">
        <Avatar>
          <AvatarImage src={job.avatarUrl} alt={job.title} />
          <AvatarFallback>{job.title.charAt(0)}</AvatarFallback> 
        </Avatar>
        <div className="ml-4">
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.description}</CardDescription>
        </div>
        <Button onClick={toggleExpand} className="absolute top-0 right-0 m-2">
          <BsThreeDotsVertical />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap space-x-2">
          <Badge variant="outline">{job.startDate}</Badge>
          <Badge variant="outline">{job.duration}</Badge>
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
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{job.extraField1}</p>
            </TabsContent>
            <TabsContent value="experiences">
              <p>{job.extraField2}</p>
            </TabsContent>
            <TabsContent value="benefits">
              <p>{job.extraField3}</p>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default JobBlockDetail;
