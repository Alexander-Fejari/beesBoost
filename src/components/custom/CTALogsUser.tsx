import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useTranslation} from "react-i18next";

interface CTALogsUserProps {
    islog?: boolean

}

const CTALogsUser = ({islog}: CTALogsUserProps) => {
    const {t} = useTranslation()

    return (
        <>
            {islog === false && (
                <section>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={'lg'} variant={'outline'}>
                                {t('ctaUser.ctaSignin')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {t('ctaUser.ctaSignin')}
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
            {islog === true && (
                <section>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </section>
            )}
        </>
    )
}


export default CTALogsUser