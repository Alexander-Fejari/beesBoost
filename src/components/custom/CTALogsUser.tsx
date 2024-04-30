import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {useTranslation} from "react-i18next";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SignIn from "@/components/custom/SignIn.tsx";
import LogIn from "@/components/custom/LogIn.tsx";

interface CTALogsUserProps {
    isLog?: boolean

}

const CTALogsUser = ({isLog}: CTALogsUserProps) => {
    const {t} = useTranslation()
    return (
        <>
            {isLog === false && (
                <section className='flex justify-center items-center gap-x-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={'lg'} variant={'outline'}>
                                {t('ctaUser.ctaSignIn')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className={'my-4 self-center'}>
                                    {t('ctaUser.ctaSignIn')}
                                </DialogTitle>
                                <DialogDescription asChild>
                                    <SignIn/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={'lg'} variant={'default'}>
                                {t('ctaUser.ctaLogIn')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className={'my-4 self-center'}>
                                    {t('ctaUser.ctaLogIn')}
                                </DialogTitle>
                                <DialogDescription asChild>
                                    <LogIn />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </section>
            )}
            {isLog === true && (
                <section className='flex items-center gap-x-4'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JL007</AvatarFallback>
                    </Avatar>
                    <h3>{t('ctaUser.ctaGreetingUser')} {'user.name'}</h3>
                </section>
            )}
        </>
    )
}


export default CTALogsUser
