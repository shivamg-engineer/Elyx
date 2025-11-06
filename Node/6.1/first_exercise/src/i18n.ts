import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  This is your own function to initialize i18next
export async function initI18next() {
  await i18next
    .use(Backend) //→ loads translation JSON files from the filesystem.
    .use(middleware.LanguageDetector) //→ detects language from query, header, cookie, etc.
    .init({
      fallbackLng: 'en', //→ if language not found, fallback to English.
      preload: ['en', 'fr'], // languages to preload
      backend: {
        loadPath: path.join(__dirname, 'locales/{{lng}}/translation.json')//→ dynamically loads translation.json for each language.
      },
      detection: {
        order: ['querystring', 'header'], //→ first check ?lng=fr, then HTTP headers.
        lookupQuerystring: 'lng',
      }
    });

  return i18next;
}