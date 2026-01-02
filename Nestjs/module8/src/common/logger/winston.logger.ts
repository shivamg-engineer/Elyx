import * as winston from 'winston';

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    // Console (dev)
    new winston.transports.Console(),

    // File (acts as external service here)
    new winston.transports.File({
      filename: 'logs/app.log',
    }),
  ],
});
