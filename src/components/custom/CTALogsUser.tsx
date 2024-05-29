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
import { useAuthStore } from "@/store/Store";


interface DecodedToken {
    username?: string;
    role?: string;
    exp?: number;
    [key: string]: any;
}

    const CTALogsUser = () => {
        const { t } = useTranslation();
        const { isAuthenticated, setTokens, accessToken, refreshToken } = useAuthStore();
        const [username, setUsername] = useState<string | null>(null);
    
        useEffect(() => {
            if (accessToken) {
                try {
                    const decoded: DecodedToken = jwtDecode<DecodedToken>(accessToken);
                    if (decoded.exp && decoded.exp * 1000 > new Date().getTime()) {
                        setUsername(decoded.username ?? null);
                    } else {
                        setTokens(null, refreshToken);
                    }
                } catch (error) {
                    console.error("Failed to decode JWT", error);
                    setTokens(null, refreshToken);
                }
            }
        }, [accessToken, setTokens, refreshToken]);

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
