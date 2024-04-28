import {useTranslation} from 'react-i18next';
import {NavLink} from "react-router-dom";

interface NavProps {
    className?: string

}

const Nav = ({className}: NavProps) => {
    const {t} = useTranslation();
    return (
        <nav className={`${className} w-full h-full`}>
            <ul className={'h-full flex flex-col justify-center items-center gap-y-8 md:flex-row md:items-center md:gap-x-16'}>
                <li>
                    <NavLink to={'https://beesboost.com/fr/page-daccueil/'} target="_blank" rel="noopener noreferrer">
                        {t('navbar.beesBoost')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/'}>
                        {t('navbar.home')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/faq'}>
                        {t('navbar.FAQ')}
                    </NavLink>
            </li>
            <li>
                <NavLink to={'/contact'}>
                    {t('navbar.contact')}
                </NavLink>

            </li>
            <li>
                <NavLink to={'/blog'}>
                    {t('navbar.blog')}
                </NavLink>
            </li>
        </ul>
</nav>
)
}
export default Nav
