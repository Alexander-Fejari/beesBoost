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
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/context/AuthStore";


interface DecodedToken {
    username?: string;
    role?: string;
    exp?: number;
    [key: string]: any;
}

    const CTALogsUser = () => {
        const { t } = useTranslation();
        const { isAuthenticated, setToken, token } = useAuthStore();
        const [username, setUsername] = useState<string | null>(null);
    
        useEffect(() => {
            if (token) {
                try {
                    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
                    if (decoded.exp && decoded.exp * 1000 > new Date().getTime()) {
                        setUsername(decoded.username ?? null);
                    } else {
                        console.log('Token expired');
                        setToken(null);
                    }
                } catch (error) {
                    console.error("Failed to decode JWT", error);
                    setToken(null);
                }
            }
        }, [token, setToken]);

    return (
        <>
            {!isAuthenticated && (
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
            {isAuthenticated && (
                <section className='flex items-center gap-x-4'>
                    <LogOut />
                    <h3>{t('ctaUser.ctaGreetingUser')} {username}</h3>
                </section>
            )}
        </>
    );
};

export default CTALogsUser;
