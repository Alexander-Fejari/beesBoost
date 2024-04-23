import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';


const Header = () => {
    const { t } = useTranslation();

    return (
        <header>
            <ul>
                <li>
                    {t('navbar.home')}
                </li>
                <li>
                    {t('navbar.services')}
                </li>
            </ul>
            <LanguageSwitcher/>
        </header>
    );
};

export default Header;
