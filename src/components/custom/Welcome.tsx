import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button"
import StudentHive from "./StudentHive";

const Welcome = () => {
    const {t} = useTranslation('home')
    return (
        <section className="w-full h-full flex flex-col md:flex-row overflow-hidden">
            <div className="flex flex-col my-auto sm:gap-2 md:gap-0 md:w-1/2">
                <div className="text-4xl text-center">
                    <h1 className={'text-normal'}>
                            {t('home.title')}
                    </h1>
                </div>
                <div className="text-center font-thin">
                    <h2>
                        {t('home.subTitle')}
                    </h2>
                </div>
                <div className="flex justify-center sm:gap-2 md:gap-20 pt-6">
                    <Button size={'lg'} variant={'primary'}>
                        {t('home.studentButton')}
                    </Button>
                    <Button size={'lg'} variant={'black'}>
                        {t('home.employerButton')}
                    </Button>
                </div>
            </div>
            <div className="flex sm:w-content lg:w-1/2 mt-4 ">
                <StudentHive/>
            </div>
        </section>

    )
}

export default Welcome
