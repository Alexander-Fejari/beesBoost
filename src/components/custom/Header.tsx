import {useTranslation} from 'react-i18next'
import useLocalizeDocumentAttributes from "@/i18n/useLocalizeDocumentAttributes";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
const Header = () => {
    useLocalizeDocumentAttributes();
    const {t} = useTranslation();
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
    )
}
export default Header
