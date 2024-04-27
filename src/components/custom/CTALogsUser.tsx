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

interface CTALogsUserProps {
    isLog?: boolean

}

const CTALogsUser = ({isLog}: CTALogsUserProps) => {
    const {t} = useTranslation()
    return (
        <>
            {isLog === false && (
                <section className='flex items-center gap-x-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={'lg'} variant={'outline'}>
                                {t('ctaUser.ctaSignIn')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {t('ctaUser.ctaSignIn')}
                                </DialogTitle>
                                <DialogDescription>
                                    form inscription
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
                                <DialogTitle>
                                    {t('ctaUser.ctaLogIn')}
                                </DialogTitle>
                                <DialogDescription>
                                    form connection
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
