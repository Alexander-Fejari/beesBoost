import React, {useEffect} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Badge} from '@/components/ui/badge';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {BsThreeDotsVertical} from "react-icons/bs";
import {TfiClose} from "react-icons/tfi";
import {Skeleton} from '@/components/ui/skeleton';
import {useAuthStore} from '@/store/Store';
import useJobStore from '@/store/JobStore';
import {useTranslation} from 'react-i18next';

const JobList: React.FC = () => {
    const {t} = useTranslation('dashboardJobs');
    const {token} = useAuthStore(); // Get token from auth store
    const {
        jobSummaries,
        fetchJobSummaries,
        fetchJobDetail,
        jobDetails,
        isLoading,
        expandedJobId,
        setExpandedJobId
    } = useJobStore();
    console.log('Job prop:', jobSummaries);

    useEffect(() => {
        if (token) {
            fetchJobSummaries(token);
        }
    }, [token, fetchJobSummaries]);

    if (isLoading.summaries) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({length: 3}).map((_, index) => (
                    <Skeleton key={index} className="w-full h-48"/>
                ))}
            </div>
        );
    }

    const handleExpand = async (jobId: string) => {
        try {
            if (!jobDetails[jobId]) {
                await fetchJobDetail(jobId, token);
            }
            setExpandedJobId(expandedJobId === jobId ? null : jobId);
        } catch (error) {
            console.error(`Error fetching job detail for job id: ${jobId}`, error);
        }
    };

    return (
        <div className={`grid ${expandedJobId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}`}>
            {jobSummaries.map(job => {
                const jobDetail = jobDetails[job.id];
                const isExpanded = expandedJobId === job.id;

                if (expandedJobId && !isExpanded) return null;

                return (
                    <Card key={job.id}
                          className={`transition-all ${isExpanded ? 'w-full h-full overflow-auto' : 'h-auto'}`}>
                        <CardHeader className="relative flex">
                            <Avatar>
                                <AvatarImage src={jobDetail?.avatarUrl || ''} alt={job.title}/>
                                <AvatarFallback>{job.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 flex-1">
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.descriptionShort}</CardDescription>
                            </div>
                            {isExpanded ? (
                                <TfiClose onClick={() => handleExpand(job.id)}
                                          className="absolute top-2 right-2 cursor-pointer"/>
                            ) : (
                                <BsThreeDotsVertical onClick={() => handleExpand(job.id)}
                                                     className="absolute top-2 right-2 cursor-pointer"/>
                            )}
                        </CardHeader>
                        <CardContent className={`flex-grow ${isExpanded ? 'p-4' : ''}`}>
                            <div className="flex flex-wrap space-x-2 mb-4">
                                <Badge variant="outline">{new Date(job.startDate).toLocaleDateString()}</Badge>
                                <Badge variant="outline">{job.duration} {t('jobBlock.month')}</Badge>
                                <Badge variant="outline">{job.field}</Badge>
                                <Badge variant="outline">{job.location}</Badge>
                            </div>
                            <div className="flex space-x-4 mb-4">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="primary">{t('jobBlock.apply')}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <a href={jobDetail?.applyLink}>{t('jobBlock.apply')}</a>
                                    </PopoverContent>
                                </Popover>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">{t('jobBlock.message')}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <a href={jobDetail?.messageLink}>{t('jobBlock.message')}</a>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {isExpanded && jobDetail && (
                                <Tabs defaultValue="description" className="mt-8">
                                    <TabsList className="flex justify-center">
                                        <TabsTrigger value="description">{t('jobBlock.skills')}</TabsTrigger>
                                        <TabsTrigger value="experiences">{t('jobBlock.experiences')}</TabsTrigger>
                                        <TabsTrigger value="benefits">{t('jobBlock.benefits')}</TabsTrigger>
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
