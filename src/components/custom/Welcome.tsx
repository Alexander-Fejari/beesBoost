import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button"
import StudentHive from "./StudentHive";

interface WelcomeProps {
    className?: string;
}

const Welcome = ({ className }: WelcomeProps) => {
    const { t } = useTranslation()


    return (
        <section className="w-full h-full flex overflow-hidden">
            <div className="flex flex-col my-auto sm:gap-2 md:gap-0">
                <div className="text-4xl text-center">Votre prochain <span className="font-bold">site internet</span></div>
                <div className="text-start"> {t('WelcomePage.SubTitle')}</div>
                <div className="md:inline-flex sm:gap-2 md:gap-20 pt-6">
                    <Button size={'lg'} variant={'primary'}>
                        {t('WelcomePage.StudentButton')}
                    </Button>
                    <Button size={'lg'} variant={'black'}>
                        {t('WelcomePage.EmployerButton')}
                    </Button>
                </div>
            </div>
            <div>
                <StudentHive />
            </div>
        </section>

    )
}

export default Welcome
