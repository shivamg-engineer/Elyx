import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import path from 'path';
import { LocaleFormatService } from './common/utils/locale-format.service';
import { LocaleMiddleware } from './common/middleware/locale.middleware';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',

      loaderOptions: {
        path: path.join(__dirname, '..', 'i18n'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'locale']), // Highest priority
        new HeaderResolver(['x-lang']),
        new AcceptLanguageResolver(),
        new CookieResolver(['lang']), // Cookies fallback
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LocaleFormatService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocaleMiddleware).forRoutes('*');
  }
}
