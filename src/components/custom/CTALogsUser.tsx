import { useState, useEffect } from "react";
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
import SignIn from "@/components/custom/SignIn.tsx";
import LogIn from "@/components/custom/LogIn.tsx";
import LogOut from "@/components/custom/logOut.tsx";


interface CTALogsUserProps {
    isLog?: boolean; 
}

const CTALogsUser = ({ isLog: initialIsLog }: CTALogsUserProps) => {
    const { t } = useTranslation();
    const [isLog, setIsLog] = useState<boolean>(!!initialIsLog);
    const username = localStorage.getItem('username')

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLog(!!token);  
    }, []); 

    return (
        <>
            {!isLog && (
                <section className='flex justify-center items-center gap-x-4'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={'lg'} variant={'black'}>
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
                            <Button size={'lg'} variant={'primary'}>
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
            {isLog && (
                <section className='flex items-center gap-x-4'>
                    <LogOut />
                    <h3>{t('ctaUser.ctaGreetingUser')} {username}</h3>
                </section>
            )}
        </>
    );
};

export default CTALogsUser;