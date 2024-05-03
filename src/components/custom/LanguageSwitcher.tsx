import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

import flagFR from '@/assets/fr.ico';
import flagEN from '@/assets/en.ico';
import flagNL from '@/assets/nl.ico';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>(localStorage.getItem('language') || 'fr');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = lng;
        setCurrentLanguage(lng);
        localStorage.setItem('language', lng); // Sauvegarde la langue sélectionnée dans le localStorage
    };

    useEffect(() => {
        // Met à jour la langue actuelle au chargement du composant
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'default'} size={'icon'} className={'uppercase'}>
                        {currentLanguage === 'fr' && <img className={'h-6 w-auto'} src={flagFR} alt="FR" />}
                        {currentLanguage === 'en' && <img className={'h-6 w-auto'} src={flagEN} alt="EN" />}
                        {currentLanguage === 'nl' && <img className={'h-6 w-auto'} src={flagNL} alt="NL" />}

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'w-max'} align={'center'}>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('fr')}>
                        <img
                            className={'h-6 w-auto'}
                            src={flagFR}
                            alt="FR"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('en')}>
                        <img
                            className={'h-6 w-auto'}
                            src={flagEN}
                            alt="EN"
                        />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => changeLanguage('nl')}>
                        <img
                            className={'h-6 w-auto'}
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
