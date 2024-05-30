import { StudentDetails } from "@/store/StudentDetailsStore";
import { useAuthStore } from "@/store/Store";
import BentoElement from "@/components/custom/BentoElement";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UseCardProfileExperienceEdit from "@/components/custom/Profile/customHook/useCardProfileExperienceEdit";

interface CardProfileExperiencesProps {
  userId: string | null;
  studentDetails: StudentDetails;
}

const CardProfileExperiences = ({ userId, studentDetails }: CardProfileExperiencesProps) => {
  const currentUserId = useAuthStore((state) => state.id);

  if (!studentDetails.experience || studentDetails.experience.length === 0) {
    return <p>No experience available</p>;
  }

  const experience = studentDetails.experience[0];

  return (
      <BentoElement size={'col-span-4'} className={'relative'}>
        <Card className={'bg-transparent border-none'}>
          <CardHeader className={"flex flex-row items-center space-y-0 gap-x-4"}>
            <section className="flex flex-col justify-center space-y-1">
              <CardTitle className={'font-bold uppercase'}>{experience.title}</CardTitle>
              <CardDescription>{experience.description}</CardDescription>
            </section>
          </CardHeader>
          <CardContent className={'text-sm'}>
            {experience.company} - {experience.location}
          </CardContent>
          <CardFooter className="flex justify-between items-stretch gap-x-4">
            {experience.start_date} - {experience.end_date}
          </CardFooter>
        </Card>
        {userId === currentUserId && (
            <section className="absolute top-2 right-2">
              <UseCardProfileExperienceEdit
                  userId={userId!}
                  studentDetails={studentDetails}
              />
            </section>
        )}
      </BentoElement>
  );
};

export default CardProfileExperiences;
