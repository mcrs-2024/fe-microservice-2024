import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import enFlag from 'src/assets/images/flags/us.jpg';
import vietnameseFlag from 'src/assets/images/flags/vietnam.jpg';

import translationEn from './locales/en.json';
import translationVi from './locales/vi.json';

//translations

export interface LanguageType {
  key: string;
  name: string;
  flag: string;
}
// get the languages
export const languages: LanguageType[] = [
  {
    key: 'EN',
    name: 'English',
    flag: enFlag,
  },
  {
    key: 'VI',
    name: 'Vietnamese',
    flag: vietnameseFlag,
  },
];
const resources = {
  EN: {
    translation: translationEn,
  },
  VI: {
    translation: translationVi,
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'EN', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
