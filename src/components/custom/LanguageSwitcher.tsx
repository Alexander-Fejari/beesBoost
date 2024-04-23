import React from 'react';
import { useTranslation } from 'react-i18next';
import {Button} from "@/components/ui/button.tsx";

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.lang = lng;
    };

    return (
        <div>
            <Button onClick={() => changeLanguage('fr')}>FR</Button>
            <Button onClick={() => changeLanguage('en')}>EN</Button>
            <Button onClick={() => changeLanguage('nl')}>NL</Button>
        </div>
    );
};

export default LanguageSelector;
