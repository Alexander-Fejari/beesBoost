
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useLanguageStore } from '@/store/LanguageStore';
import flagFR from '@/assets/fr.ico';
import flagEN from '@/assets/en.ico';
import flagNL from '@/assets/nl.ico';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const { language, setLanguage } = useLanguageStore();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguage(lng); 
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} size={'icon'}>
                        <img className={'h-6 w-auto'} src={language === 'fr' ? flagFR : language === 'en' ? flagEN : flagNL} alt={language.toUpperCase()} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={'w-max'} align={'center'}>
                    <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                        <img className={'h-6 w-auto'} src={flagFR} alt="FR" />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('en')}>
                        <img className={'h-6 w-auto'} src={flagEN} alt="EN" />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('nl')}>
                        <img className={'h-6 w-auto'} src={flagNL} alt="NL" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageSwitcher;
