import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"
import StudentHive from "./StudentHive";

interface WelcomeProps {
    className?: string;
}

const Welcome = ({ className }: WelcomeProps) => {
    const { t } = useTranslation()


    return (
        <section className="w-full h-full flex flex-col md:flex-row overflow-hidden">
            <div className="flex flex-col my-auto sm:gap-2 md:gap-0 md:w-1/2">
                <div className="text-4xl text-center">Votre prochain <span className="font-bold">site internet</span></div>
                <div className="text-center font-thin"> {t('WelcomePage.SubTitle')}</div>
                <div className="flex justify-center sm:gap-2 md:gap-20 pt-6">
                    <Button size={'lg'} variant={'primary'}>
                        {t('WelcomePage.StudentButton')}
                    </Button>
                    <Button size={'lg'} variant={'black'}>
                        {t('WelcomePage.EmployerButton')}
                    </Button>
                </div>
            </div>
            <div className="flex md:w-1/2">
                <StudentHive />
            </div>
        </section>

    )
}

export default Welcome
