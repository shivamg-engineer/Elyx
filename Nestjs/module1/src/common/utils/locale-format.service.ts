import { Injectable } from '@nestjs/common';

@Injectable()
export class LocaleFormatService {
  formatDate(date: Date, locale: string) {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  formatNumber(value: number, locale: string) {
    return new Intl.NumberFormat(locale).format(value);
  }

  formatCurrency(value: number, locale: string) {
     let currency = 'USD';

    if (locale.startsWith('es') || locale.startsWith('fr')) {
      currency = 'EUR';
    } else if (locale.startsWith('en')) {
      currency = 'USD';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  }
}
