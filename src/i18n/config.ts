import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next) // Utilisez initReactI18next ici
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'fr',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        ns: ['common'],
        defaultNS: 'common',
    });

export default i18n;
