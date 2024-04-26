import {useTranslation} from 'react-i18next';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import {ModeToggle} from "@/components/mode-toggle";
import CTALogsUser from "@/components/custom/CTALogsUser.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";



const Header = () => {
    const {t} = useTranslation();

    return (
        <header>
            <p>{t('home.message', {ns: 'home'})}</p>
            <ul>
                <li>
                    {t('navbar.home')}
                </li>
                <li>
                    {t('navbar.services')}
                </li>
            </ul>
            <LanguageSwitcher/>
            <ModeToggle/>
            <CTALogsUser islog={true}/>
            <Avatar alveole={true} />
        </header>
    );
};

export default Header;
