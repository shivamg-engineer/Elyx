import { format } from 'path';
import * as winston from 'winston';
import {Loggly} from 'winston-loggly-bulk';

const isProd = process.env.NODE_ENV === 'production';

export const winstonConfig = {
  level: isProd ? 'info' : 'debug', // ⭐ KEY CHANGE

  // transports: [
  //   new winston.transports.Console({
  //     format: winston.format.combine(
  //       winston.format.colorize(),
  //       winston.format.timestamp(),
  //       winston.format.printf(
  //         ({ level, message, timestamp, context }) =>
  //           `${timestamp} [${context || 'App'}] ${level}: ${message}`,
  //       ),
  //     ),
  //   }),

  //   new winston.transports.File({
  //     filename: 'logs/app.log',
  //     level: 'info',
  //     format: winston.format.combine(
  //       winston.format.timestamp(),
  //       winston.format.json(),
  //     ),
  //   }),
  // ],

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({stack:true}),
    winston.format.json(),
  ),

  transports:[

    // 🔴 Error logs
    new winston.transports.File({
      filename:'logs/error.log',
      level:'error',
    }),

    // 🟡 Combined logs
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),

     // 🌐 Loggly (ONLY in production)
     ...(isProd ? [
          new Loggly({
            token: process.env.LOGGLY_TOKEN!,
            subdomain: process.env.LOGGLY_SUBDOMAIN!,
            tags: ['nestjs', 'production'],
            json: true,
          }),
        ] :[]),

    // 🖥 Console only in development
    ...(isProd ? [] :[
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
    ]),
  ],
};
