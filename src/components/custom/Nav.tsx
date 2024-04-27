import {useTranslation} from 'react-i18next';
const Nav = () => {
    const {t} = useTranslation();
    return (
        <nav>
            <ul>
                <li>
                    {t('navbar.beesBoost')}
                </li>
                <li>
                    {t('navbar.home')}
                </li>
                <li>
                    {t('navbar.FAQ')}
                </li>
                <li>
                    {t('navbar.contact')}
                </li>
                <li>
                    {t('navbar.blog')}
                </li>
            </ul>
        </nav>
    )
}
export default Nav
