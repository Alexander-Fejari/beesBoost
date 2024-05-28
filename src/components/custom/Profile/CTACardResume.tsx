import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {SlUserFollow} from "react-icons/sl";
import {MdOutlineMessage} from "react-icons/md";

const CTACardResume = () => {
    const {t} = useTranslation('dashboardProfile')

    return (
        <>
            <Button>
                <SlUserFollow className="mr-2 h-4 w-4" /> {t('resume.connect')}
            </Button>
            <Button variant="outline">
                <MdOutlineMessage className="mr-2 h-4 w-4" /> {t('resume.message')}
            </Button>
        </>
    )
}

export default CTACardResume
