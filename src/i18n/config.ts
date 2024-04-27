import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import commonFR from "../locales/fr/commonFR.json";
import commonEN from "../locales/en/commonEN.json";
import commonNL from "../locales/nl/commonNL.json";
import homeFR from "../locales/fr/homeFR.json";
import homeEN from "../locales/en/homeEN.json";
import homeNL from "../locales/nl/homeNL.json";

const resources = {
    fr: {
        common: commonFR,
        home: homeFR
    },
    en: {
        common: commonEN,
        home: homeEN
    },
    nl: {
        common: commonNL,
        home: homeNL
    }
};

// Fonction pour sauvegarder la langue sélectionnée dans les cookies
const saveLanguageToLocalStorage = (lng:string) => {
    localStorage.setItem('language', lng);
};

const defaultLanguage = localStorage.getItem('language') || 'fr'; // Récupère la langue depuis les cookies ou utilise le français par défaut

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        resources,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'subdomain', 'path', 'sessionStorage', 'navigator'],
            caches: ['cookie'],
        },
        fallbackLng: 'fr',
        lng: defaultLanguage, // Utilise la langue par défaut
        ns: ['common', 'home'],
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

// Écoute les changements de langue et les sauvegarde dans les cookies
i18n.on('languageChanged', (lng) => {
    saveLanguageToLocalStorage(lng);
});

export default i18n;
