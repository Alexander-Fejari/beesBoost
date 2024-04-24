import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from "@/components/ui/button.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

import flagFR from '@/assets/fr.ico';
import flagEN from '@/assets/en.ico';
import flagNL from '@/assets/nl.ico';

const LanguageSwitcher: React.FC = () => {
    const {i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = lng;
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} className={'uppercase'}>
                        {document.documentElement.lang === 'fr' && <img className={'h-[1.5rem] w-[1.5rem'} src={flagFR} alt="FR"/>}
                        {document.documentElement.lang === 'en' && <img className={'h-[1.5rem] w-[1.5rem'} src={flagEN} alt="EN"/>}
                        {document.documentElement.lang === 'nl' && <img className={'h-[1.5rem] w-[1.5rem'} src={flagNL} alt="NL"/>}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'w-max'} align={'center'}>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('fr')}>
                        <img
                            className={'h-[1.5rem] w-[1.5rem'}
                            src={flagFR}
                            alt="FR"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('en')}>
                        <img
                            className={'h-[1.5rem] w-[1.5rem'}
                            src={flagEN}
                            alt="EN"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('nl')}>
                        <img
                            className={'h-[1.5rem] w-[1.5rem'}
                            src={flagNL}
                            alt="NL"
                        />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSwitcher;
