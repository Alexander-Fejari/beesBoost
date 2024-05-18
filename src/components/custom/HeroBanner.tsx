import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button"
import AnimatedTitle from "@/components/custom/AnimatedTitle";
import LastRegisteredStudents from "@/components/custom/LastRegisteredStudents.tsx";
import Honey from "@/components/custom/FuckBees";

const HeroBanner = () => {
    const {t} = useTranslation('dashboard')
    return (
        <section className="h-full flex flex-col gap-y-8">
            <section className="w-full flex flex-col">
                <h1 className={'text-2xl font-normal'}>
                    {t('dashboard.title')}
                </h1>
                <AnimatedTitle />
            </section>
            <section className="flex justify-center items-center gap-x-8">
                <Button size={'sm'} variant={'default'} className={'md:text-lg'}  asChild>
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
                <h3 className={'font-normal'}>{t('dashboard.pickUpLine')}</h3>
            </section>
            <LastRegisteredStudents numHives={5}/>
            <Honey />
        </section>
    )
}

export default HeroBanner
