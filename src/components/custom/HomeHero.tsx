import {useTranslation} from "react-i18next";
import AnimatedTitle from "@/components/custom/AnimatedTitle";
import {Button} from "@/components/ui/button";
import {NavLink} from "react-router-dom";
import LastRegisteredStudents from "@/components/custom/LastRegisteredStudents";

const HomeHero = () => {
    const {t} = useTranslation('dashboard')
    return (
        <section className="h-full flex flex-col gap-y-8 md:flex-row md:items-center md:justify-center">
            <section className="flex flex-col items-center gap-y-8">
                <section className="w-full flex flex-col justify-center">
                    <h1 className={'text-2xl font-normal md:text-3xl'}>
                        {t('dashboard.title')}
                    </h1>
                    <AnimatedTitle />
                </section>
                <section className="w-full flex justify-center items-center gap-x-8 md:justify-start md:mb-4">
                    <Button size={'sm'} variant={'default'} className={'md:text-base'}  asChild>
                        <NavLink to={'/'}>
                            {t('dashboard.studentButton')}
                        </NavLink>
                    </Button>
                    <Button size={'sm'} variant={'black'} className={'md:text-base'} asChild>
                        <NavLink to={'/'}>
                            {t('dashboard.employerButton')}
                        </NavLink>
                    </Button>
                </section>
                <section>
                    <h3 className={'font-normal md:text-xl'}>{t('dashboard.pickUpLine')}</h3>
                </section>
            </section>
            <LastRegisteredStudents numHives={5}/>
        </section>
    )
}

export default HomeHero
