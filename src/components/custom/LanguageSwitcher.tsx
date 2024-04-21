import { useTranslation } from 'react-i18next';
import {Button} from "@/components/ui/button";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <Button onClick={() => changeLanguage('fr')}>Fr</Button>
            <Button onClick={() => changeLanguage('nl')}>Nl</Button>
            <Button onClick={() => changeLanguage('en')}>En</Button>
        </div>
    );
}

export default LanguageSwitcher;
