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
        lng: 'fr',
        ns: ['common', 'home'],
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
