import BentoElement from "@/components/custom/BentoElement";
import UserDetails from "@/store/UserDetailsStore"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import CardProfileEdit from "@/components/custom/Profile/CardProfileEdit";
import CTACardResume from "@/components/custom/Profile/CTACardResume";

interface CardProfileResumeProps {
    userDetails: UserDetails;
}

const CardProfileResume = ({userDetails}: CardProfileResumeProps) => {
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
            <section className="absolute top-2 right-2">
                <CardProfileEdit/>
            </section>
        </BentoElement>
    )
}

export default CardProfileResume
