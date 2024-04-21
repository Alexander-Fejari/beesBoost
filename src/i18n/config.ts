import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

const supportedLngs = {
    en: 'English',
    fr: 'Français',
    nl: 'Nederlands',
};

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'fr', // Set the default language
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'subdomain', 'path', 'sessionStorage', 'navigator'],
            caches: ['cookie'],
        },
        fallbackLng: 'fr',
        supportedLngs,
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
