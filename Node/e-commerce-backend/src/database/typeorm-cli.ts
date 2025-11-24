import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecommerce_dev",
  // host: "localhost",
  // port: 3306,
  // username: "root",
  // password: "Welcome@123",
  // database: "ecommerce_dev",
  synchronize: false,
  logging: false,

//   entities: [ path.join(__dirname, "../database/models/**/*.{ts,js}") ],
// migrations: [ path.join(__dirname, "../database/migration/**/*.{ts,js}") ],
entities: [ path.join(__dirname, "../database/modules/**/models/*.{ts,js}") ],
migrations: [ path.join(__dirname, "../database/migration/**/*.{ts,js}") ],
});

  // npm run migration:generate -- -d src/database/typeorm-cli.ts src/migrations/InitialSchema
  // npm run migration:run -- -d src/database/typeorm-cli.ts

  //i added script in package.json for the above commands
  // "migration:generate": "npm run typeorm migration:generate -- -d src/database/typeorm-cli.ts",
  // "migration:run": "npm run typeorm migration:run -- -d src/database/typeorm-cli.ts",

  // use npm run migration:generate src/database/migration/initials to generate migration files