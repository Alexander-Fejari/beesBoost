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
            <ul className={`h-full flex justify-end items-center ${puces ? 'flex-row justify-center gap-x-2 gap-y-4 flex-wrap' : 'flex-col  gap-y-8'} lg:flex-row lg:items-center lg:justify-center lg:gap-x-8`}>
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
                    <NavLink className={`transition ease-in-out delay-150 ${fontSizes} ${puces ? 'md:group-hover:text-background-foreground':'md:group-hover:text-primary' }`} to={'https://beesboost.com/fr/page-daccueil/'} target="_blank" rel="noopener noreferrer">
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
                    <NavLink className={`transition ease-in-out delay-150 ${fontSizes} ${puces ? 'md:group-hover:text-background-foreground':'md:group-hover:text-primary' }`} to={'/'}>
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
                    <NavLink className={`transition ease-in-out delay-150 ${fontSizes} ${puces ? 'md:group-hover:text-background-foreground':'md:group-hover:text-primary' }`} to={'/faq'}>
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
                    <NavLink className={`transition ease-in-out delay-150 ${fontSizes} ${puces ? 'md:group-hover:text-background-foreground':'md:group-hover:text-primary' }`} to={'/contact'}>
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
                    <NavLink className={`transition ease-in-out delay-150 ${fontSizes} ${puces ? 'md:group-hover:text-background-foreground':'md:group-hover:text-primary' }`} to={'/blog'}>
                        {t('navbar.blog')}
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav
