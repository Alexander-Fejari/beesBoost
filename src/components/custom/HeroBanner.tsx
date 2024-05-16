import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button"
import AnimatedTitle from "@/components/custom/AnimatedTitle";
import LastRegisteredStudents from "@/components/custom/LastRegisteredStudents.tsx";

const HeroBanner = () => {
    const {t} = useTranslation('dashboard')
    return (
        <section className="h-full flex flex-col gap-y-4">
            <section className="flex flex-col">
                <h1 className={'text-2xl font-normal'}>
                    {t('dashboard.title')}
                </h1>
                <AnimatedTitle />
            </section>
            <section className="flex justify-center items-center gap-x-8">
                <Button size={'sm'} variant={'default'} asChild>
                    <NavLink to={'/'}>
                        {t('dashboard.studentButton')}
                    </NavLink>
                </Button>
                <Button size={'sm'} variant={'black'} asChild>
                    <NavLink to={'/'}>
                        {t('dashboard.employerButton')}
                    </NavLink>
                </Button>
            </section>
            <section>
                <h3 className={'font-normal'}>{t('dashboard.pickUpLine')}</h3>
            </section>
            <LastRegisteredStudents />
        </section>
    )
}

export default HeroBanner
