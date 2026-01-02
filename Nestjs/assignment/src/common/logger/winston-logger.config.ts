import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";

export const winstonLoggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        nestWinstonModuleUtilities.format.nestLike("EcommerceAPI", {
          prettyPrint: true,
        })
      ),
    }),
  ],
};
