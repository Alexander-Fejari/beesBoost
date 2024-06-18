import { StudentDetails } from "@/store/StudentDetailsStore";
import { useAuthStore } from "@/store/Store";
import BentoElement from "@/components/custom/BentoElement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UseCardProfileExperienceEdit from "@/components/custom/Profile/customHook/useCardProfileExperienceEdit";
import FormatDate from "@/components/useHook/FormateDate";
import { useTranslation } from "react-i18next";

interface CardProfileExperiencesProps {
    userId: string | null;
    studentDetails: StudentDetails;
}

const CardProfileExperiences = ({ userId, studentDetails }: CardProfileExperiencesProps) => {
    const currentUserId = useAuthStore((state) => state.id);
    const { t } = useTranslation('dashboardProfile');

    if (!studentDetails.experience || studentDetails.experience.length === 0) {
        return <p>No experience available</p>;
    }

    const experiences = studentDetails.experience;

    const formattedStartDates = experiences.map((experience) => FormatDate(experience.start_date));
    const formattedEndDates = experiences.map((experience) => FormatDate(experience.end_date));

    return (
        <BentoElement size={'col-span-4'} className={''}>
            <h2 className={'p-4 text-xl'}>{t('experience.title')}</h2>
            {experiences.map((experience, index) => {
                return (
                    <Card key={index} className={'bg-transparent border-none mb-4 relative'}>
                        <CardHeader className={"flex flex-row items-center space-y-0 gap-x-4"}>
                            <section className="flex flex-col justify-center space-y-2">
                                <CardTitle className={'font-bold uppercase text-lg'}>{experience.title}</CardTitle>
                                <CardDescription>
                                    {experience.company} - {experience.location}
                                    <br/>{formattedStartDates[index]} - {formattedEndDates[index]}
                                </CardDescription>
                            </section>
                        </CardHeader>
                        <CardContent className={'text-sm'}>
                            {experience.description}
                        </CardContent>
                        {userId === currentUserId && (
                            <section className="absolute top-2 right-2">
                                <UseCardProfileExperienceEdit
                                    userId={userId!}
                                    studentDetails={studentDetails}
                                    experienceIndex={index}
                                />
                            </section>
                        )}
                    </Card>
                );
            })}
        </BentoElement>
    );
};

export default CardProfileExperiences;
