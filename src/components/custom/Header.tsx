import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import i18n from '../../i18n/config.ts';


const Header = () => {
    const { t } = useTranslation('common');

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
