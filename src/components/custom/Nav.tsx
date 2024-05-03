import {useTranslation} from 'react-i18next';
import {NavLink} from "react-router-dom";
import HiveSvg from "@/components/custom/HiveSVG.tsx";


interface NavProps {
    puces?: boolean
    className?: string
}

const Nav = ({puces, className}: NavProps) => {
    const {t} = useTranslation();
    return (
        <nav className={`${className} w-full h-1/2`}>
            <ul className={'h-full flex flex-col justify-end items-center gap-y-8  lg:flex-row lg:items-center lg:justify-center lg:gap-x-8'}>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150 group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-5 h-5'}
                            />
                        )
                    }
                    <NavLink to={'https://beesboost.com/fr/page-daccueil/'} target="_blank" rel="noopener noreferrer">
                        {t('navbar.beesBoost')}
                    </NavLink>
                </li>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150  group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-5 h-5'}/>
                        )
                    }
                    <NavLink to={'/'}>
                        {t('navbar.home')}
                    </NavLink>
                </li>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150  group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-5 h-5'}/>
                        )
                    }
                    <NavLink to={'/faq'}>
                        {t('navbar.FAQ')}
                    </NavLink>
                </li>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150  group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-5 h-5'}/>
                        )
                    }
                    <NavLink to={'/contact'}>
                        {t('navbar.contact')}
                    </NavLink>

                </li>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg
                                className={'transition ease-in-out delay-150 group-hover:fill-primary'}
                                fillColor={'fill-transparent'}
                                strokeWidth={15}
                                strokeColor={'stroke-primary'}
                                size={'w-5 h-5'}/>
                        )
                    }
                    <NavLink to={'/blog'}>
                        {t('navbar.blog')}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav
