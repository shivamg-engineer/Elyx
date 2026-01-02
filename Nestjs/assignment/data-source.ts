import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  connectorPackage: "mysql2",
  driver: require("mysql2"),
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Welcome@123",
  database: "nest_assignDB",
  synchronize: false,
  logging: false,
  entities: ["src/database/modules/**/*.entity{.ts,.js}"],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
