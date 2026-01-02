import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext, I18nLang, I18nService } from 'nestjs-i18n';
import { LocaleFormatService } from './common/utils/locale-format.service';
import { I18N_KEYS } from './common/constants/i18n-keys';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly localeFormat: LocaleFormatService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/greet')
  greet(@I18n() i18n: I18nService) {
    return i18n.translate(I18N_KEYS.GREETING);
  }

  @Get('/price')
  price(@I18n() i18n: I18nService, @I18nLang() locale: string) {
    const amount = 1000;

    const formattedCurrency = this.localeFormat.formatCurrency(amount, locale);

    return i18n.translate(I18N_KEYS.FORMATTED_CURRENCY, {
      args: { currency: formattedCurrency },
    });
  }

  @Get('/user-message')
  userMessage(@I18n() i18n: I18nService, @I18nLang() locale: string) {
    const user={name:'Shivam'};

    return i18n.translate(I18N_KEYS.USER_WELCOME,{
      args:{name:user.name}
    })
  }
}
// Request → Resolver picks locale → Controller receives locale →
// LocaleFormatService formats based on locale →
// i18n injects formatted text into message → JSON message returned
