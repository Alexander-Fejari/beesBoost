import {useTranslation} from 'react-i18next';
import {NavLink} from "react-router-dom";
import HiveSvg from "@/components/custom/HiveSVG.tsx";


interface NavProps {
    fontSize?: 'xs' | 'sm'
    puces?: boolean
}

const Nav = ({puces, fontSize}: NavProps) => {
    const {t} = useTranslation();
    let fontSizes;
    switch (fontSize) {
        case 'xs' :
            fontSizes = 'text-xs'
            break
        case 'sm':
            fontSizes = 'text-sm'

    }

    return (
        <nav className={'w-full h-1/2'}>
            <ul className={'h-full flex flex-col justify-end items-center gap-y-8 lg:flex-row lg:items-center lg:justify-center lg:gap-x-8'}>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150 group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-4 h-4'}
                            />
                        )
                    }
                    <NavLink className={`${fontSizes}`} to={'https://beesboost.com/fr/page-daccueil/'} target="_blank" rel="noopener noreferrer">
                        {t('navbar.beesBoost')}
                    </NavLink>
                </li>
                <li className={'flex items-center gap-x-1.5 group'}>
                    {puces === true &&
                        (
                            <HiveSvg className={'transition ease-in-out delay-150 group-hover:fill-primary'}
                                     fillColor={'fill-transparent'}
                                     strokeWidth={15}
                                     strokeColor={'stroke-primary'}
                                     size={'w-4 h-4'}/>
                        )
                    }
                    <NavLink className={`${fontSizes}`} to={'/'}>
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
                                     size={'w-4 h-4'}/>
                        )
                    }
                    <NavLink className={`${fontSizes}`} to={'/faq'}>
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
                                     size={'w-4 h-4'}/>
                        )
                    }
                    <NavLink className={`${fontSizes}`} to={'/contact'}>
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
                                size={'w-4 h-4'}/>
                        )
                    }
                    <NavLink className={`${fontSizes}`} to={'/blog'}>
                        {t('navbar.blog')}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav
