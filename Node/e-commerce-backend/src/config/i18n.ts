import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import { fileURLToPath } from "url";

const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

i18next
.use(Backend)
.use(middleware.LanguageDetector)
.init({
     preload: (process.env.I18N_PRELOAD_LANGS || 'en').split(','),
     fallbackLng: process.env.I18N_FALLBACK_LANG || 'en',

     backend:{
        loadPath: path.join(__dirname,'..','locales','{{lng}}','translation.json'),

     },
   // Language detection order
     detection:{
       order:['header','querystring','cookie'],
       lookupHeader:'accept-language',
       lookupQuerystring:'lng',
       caches:false
     },
  // Disable HTML escaping since this is an API
    interpolation: {
      escapeValue: false,
    },

})

export const i18n= i18next;
export const i18nMiddleware= middleware.handle(i18next);
export default i18n;