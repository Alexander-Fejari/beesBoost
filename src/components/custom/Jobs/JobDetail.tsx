import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import useJobStore from '@/store/JobStore.tsx';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/Store.tsx';

const JobDetail: React.FC = () => {
    const { t } = useTranslation('dashboardJobs');
    const { accessToken } = useAuthStore(); // Get token from auth store
    const { jobDetails, fetchJobDetail, isLoading } = useJobStore();
    const { jobId } = useParams<{ jobId: string }>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (accessToken && jobId) {
                    await fetchJobDetail(jobId, accessToken);
                }
            } catch (error) {
                console.error(`Error fetching job detail for job id: ${jobId}`, error);
            }
        };

        fetchData();
    }, [accessToken, fetchJobDetail, jobId]);

    if (isLoading.details) {
        return <Skeleton className="w-full h-48" />;
    }

    const jobDetail = jobDetails[jobId];

    if (!jobDetail) {
        return <p>{t('jobBlock.noJobDetail')}</p>;
    }

    return (
        <Card className="w-full h-full overflow-auto">
            <CardHeader className="flex">
                <div className="ml-4 flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src={jobDetail.avatarUrl} alt={jobDetail.title} />
                        <AvatarFallback>{jobDetail.title ? jobDetail.title.charAt(0) : '&'}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{jobDetail.title}</CardTitle>
                </div>
                <CardDescription>{jobDetail.descriptionShort}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-wrap space-x-2 mb-4">
                    <Badge variant="outline">{new Date(jobDetail.start_date).toLocaleDateString('fr-FR')}</Badge>
                    <Badge variant="outline">{jobDetail.duration} {t('jobBlock.month')}</Badge>
                    <Badge variant="outline">{jobDetail.field}</Badge>
                    <Badge variant="outline">{jobDetail.location}</Badge>
                </div>
                <div className="flex space-x-4 mb-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="primary">{t('jobBlock.apply')}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <a href={jobDetail.applyLink}>{t('jobBlock.apply')}</a>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">{t('jobBlock.message')}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <a href={jobDetail.messageLink}>{t('jobBlock.message')}</a>
                        </PopoverContent>
                    </Popover>
                </div>
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
            </CardContent>
        </Card>
    );
};

export default JobDetail;
