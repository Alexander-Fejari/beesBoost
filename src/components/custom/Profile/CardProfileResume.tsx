import BentoElement from "@/components/custom/Common/BentoElement.tsx";
import UserDetails from "@/store/UserDetailsStore"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import CardProfileResumeEdit from "@/components/custom/Profile/customHook/useCardProfileResumeEdit.tsx";
import CTACardResume from "@/components/custom/Profile/features/CTACardResume";
import {useAuthStore} from "@/store/Store.tsx";

interface CardProfileResumeProps {
    userId: string | null;
    userDetails: UserDetails;
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;
}

const CardProfileResume = ({userId, userDetails,updateUserDetails,submitUserDetails}: CardProfileResumeProps) => {
    const currentUserId = useAuthStore((state) => state.id);
    return (
        <BentoElement size={'col-span-4'} className={'relative'}>
            <Card className={'bg-transparent border-none'}>
                <CardHeader className={"flex flex-row items-center space-y-0 gap-x-4"}>
                    <img className={'rounded-full w-16'} src={userDetails.profile_pic} alt={userDetails.username}/>
                    <section className="flex flex-col justify-center space-y-1">
                        <CardTitle className={'font-bold uppercase'}>{userDetails.firstname} {userDetails.lastname}</CardTitle>
                        <CardDescription>{userDetails.occupation}</CardDescription>
                    </section>
                </CardHeader>
                <CardContent className={'text-sm'}>
                    {userDetails.pick_up_line}
                </CardContent>
                <CardFooter className="flex justify-between items-stretch gap-x-4">
                    <CTACardResume/>
                </CardFooter>
            </Card>
            {userId === currentUserId && (
                <section className="absolute top-2 right-2">
                    <CardProfileResumeEdit
                        userId={userId!}
                        userDetails={userDetails}
                        updateUserDetails={updateUserDetails}
                        submitUserDetails={submitUserDetails}
                    />
                </section>
            )}
        </BentoElement>
    )
}

export default CardProfileResume
