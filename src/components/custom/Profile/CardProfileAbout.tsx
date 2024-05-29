import BentoElement from "@/components/custom/BentoElement.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CardProfileEdit from "@/components/custom/Profile/customHook/useCardProfileAboutEdit.tsx";
import UserDetails from "@/store/UserDetailsStore.tsx";
import {useAuthStore} from "@/store/Store.tsx";
import {useTranslation} from "react-i18next";

interface CardProfileAboutProps {
    userId: string | null;
    userDetails: UserDetails;
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;
}

const CardProfileAbout = ({userId, userDetails, updateUserDetails, submitUserDetails}: CardProfileAboutProps) => {
    const currentUserId = useAuthStore((state) => state.id);
    const {t} = useTranslation('dashboardProfile')

    return (
        <BentoElement size={'col-span-4'} className={'relative'}>
            <Card className={'bg-transparent border-none'}>
                <CardHeader className={"flex flex-row items-center space-y-0 gap-x-4"}>
                        <CardTitle className={'font-bold uppercase'}>{t('about.title')}</CardTitle>
                </CardHeader>
                <CardContent className={'text-sm'}>
                    {userDetails.description}
                </CardContent>
            </Card>
            {userId === currentUserId && (
                <section className="absolute top-2 right-2">
                    <CardProfileEdit
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
export default CardProfileAbout
