import i18next  from "i18next";
import Backend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url);//fetch file url src/file.ts
const __dirname= path.dirname(__filename); //fetch directory name src

export async function initI18next(){

    await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
       fallbackLng:'en',
       preload:['en','fr'],
       backend:{
        loadPath:path.join(__dirname,'locales/{{lng}}/translation.json')
       },
       detection:{
        order:['querystring','header'],
        lookupQuerystring:'lng'
       }
    });
    return i18next;
}
